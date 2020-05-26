<template>
  <q-page class="q-pa-md" id="page-container">
    <q-scroll-observer @scroll="onScroll" />
    <div class="row q-gutter-sm">
      <div class="col-sm-12 col-md-4">
        <q-card class="import-collection">
          <q-card-section>
            <p>
              Upload the postman collection file here in
              <span class="text-bold">.json</span> format. Remember that you
              must export the file from postman, right click on the collection
              -> export ->
              <span class="text-bold">Collection 2.1 (recomend)</span>
            </p>
          </q-card-section>
          <q-separator inset />
          <q-card-section class="q-mb-md">
            <q-file
              standout
              @input="parseJsonFile()"
              v-model="uploadedFile"
              label="Import JSON"
              accept=".json"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" />
              </template>
            </q-file>
            <div class="q-mt-md" v-if="$store.getters['collection/getIsTableContentReady']">
            <div class="q-my-md">
              <q-btn
              color="primary"
              label="Download in HTML"
              icon="code"
              @click="downloadHtml()"
            />
            </div>
            <div>
              <q-btn
              color="primary"
              label="Download in Markdown"
              icon="description"
              @click="downloadMarkdown()"
            />
            </div>
            </div>
          </q-card-section>
        </q-card>
        <q-card class="table-of-content">
          <q-card-section>
            <table-of-content />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-12 col-md-7">
        <q-card class="collection-content">
          <q-card-section>
            <collection-description
              :info="this.$store.getters['collection/getCollection'].info"
              v-if="this.$store.getters['collection/getCollection'].info"
            />
          </q-card-section>
          <q-separator />
          <q-card-section
            v-if="$store.getters['collection/getIsTableContentReady']"
          >
            <div
              v-for="(item, index) in this.$store.getters[
                'collection/getCollection'
              ].item"
              :key="index"
            >
              <q-separator v-if="index > 0" />
              <h2 class="text-h4 q-mt-md q-mb-xs" :id="item.id">{{ item.name }}</h2>
              <request-description v-if="item.description" :description="item.description"/>
              <div class="request">
                <div
                  class="request"
                  v-for="(request, requestKey) in item.item"
                  :key="requestKey"
                >
                  <div class="method q-my-md">
                    <request-method
                      :method="request.request.method"
                      :request-name="request.name"
                      :anchor="request.id"
                    />
                  </div>
                  <div class="header q-my-md" v-if="$store.getters['displaySettings/getDisplayRequestHeaders']">
                    <request-header :header="request.request.header" />
                  </div>
                  <div class="url q-my-md">
                    <request-url :url="request.request.url.raw" />
                  </div>
                  <div class="description q-my-md">
                    <request-description
                      :description="request.request.description"
                    />
                  </div>
                  <q-separator class="q-mt-md q-mb-md" />
                  <div class="description q-my-md">
                    <request-body :body="request.request.body" />
                  </div>
                  <q-separator />
                </div>
              </div>
              <q-separator color="secondary" class="q-mt-md q-mb-md" />
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
    <display-settings />
    <q-page-sticky
      v-if="scrollInfo.position >= 200"
      position="bottom-right"
      :offset="[18, 80]"
    >
      <q-btn to="#page-container" fab icon="arrow_drop_up" color="accent" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import collectionDescription from 'src/components/CollectionDescription'
import requestMethod from 'src/components/RequestMethod'
import requestHeader from 'src/components/RequestHeader'
import requestBody from 'src/components/RequestBody'
import requestDescription from 'src/components/RequestDescription'
import requestUrl from 'src/components/RequestUrl'
import displaySettings from 'src/components/DisplaySettings'
import tableOfContent from 'src/components/TableOfContent'
import TurndownService from 'turndown'
import { toggleContent } from 'src/assets/js/tableOfContentUtil.js'

export default {
  name: 'PageIndex',
  components: {
    requestMethod,
    requestHeader,
    requestBody,
    requestDescription,
    displaySettings,
    collectionDescription,
    requestUrl,
    tableOfContent
  },
  data () {
    return {
      uploadedFile: null,
      fileAsJson: {
        item: null
      },
      scrollInfo: {},
      methodsColors: [
        { method: 'POST', value: '#1976D2' },
        { method: 'GET', value: '#21BA45' },
        { method: 'PATCH', value: '#9e9e9e' },
        { method: 'DELETE', value: '#C10015' }
      ]
    }
  },
  methods: {
    parseJsonFile () {
      this.$q.loading.show()
      this.$store.commit('collection/SET_COLLECTION', this.$store.getters['collection/getCollectionModel'])
      setTimeout(() => {
        const fr = new FileReader()
        fr.onload = e => {
          const result = JSON.parse(e.target.result)
          this.$store.commit('collection/SET_COLLECTION', result)
          this.validatedCollection()
          this.$q.loading.hide()
        }

        fr.readAsText(this.uploadedFile)
      }, 500)
    },
    validatedCollection () {
      if (!this.$store.getters['collection/isValid']) {
        this.$q.notify({ message: 'Invalid Collection', position: 'top', color: 'negative' })
        this.$store.commit('collection/SET_COLLECTION', this.$store.getters['collection/getCollectionModel'])
      }
    },
    onScroll (info) {
      this.scrollInfo = info
    },
    downloadMarkdown () {
      const turndownService = new TurndownService()

      /**
      * format a table of content list
      */
      turndownService.addRule('rootList', {
        filter: (node, options) => node.classList.contains('root-list-item'),

        replacement: (content, node, options) => `- ${content.replace(/\n/g, '')} <br/>`
      })
      /**
      * format a table of content list
      */
      turndownService.addRule('childList', {
        filter: (node, options) => node.classList.contains('child-list-item'),

        replacement: (content, node, options) => `\t - ${content.replace(/\n/g, '')} <br/>`.replace('[', ' [')
      })

      /**
      * Convert the method chips to in line element and
      * added a bold text
      */
      turndownService.addRule('chipsMethods', {
        filter: (node, options) => node.classList.contains('request-method'),

        replacement: (content, node, options) =>
            `<strong style="color:${this.getMethodColor(content)}">` + content.replace(/\n/g, '') + '</strong> - '
      })

      /**
       * Keep the html tag headers for use anchors
       */
      turndownService.addRule('keepHeadersTags', {
        filter: (node, options) => {
          return (
            node.nodeName === 'H2'
          )
        },

        replacement: (content, node, options) => node.outerHTML
      })

      /**
      * Keep HTML tag for request methods for use anchors
      */
      turndownService.addRule('keepRequestMethodTags', {

        filter: (node, options) => {
          return (
            node.classList.contains('request-name')
          )
        },

        replacement: (content, node, options) => node.outerHTML
      })

      const { tableOfContent, collectionContent } = this.getContentCollection()
      const content = this.constructHtmlStrucuteForDownload('', '', tableOfContent, collectionContent)
      const fileName = 'README.md'

      var markdown = turndownService.turndown(content)
      this.downloadFile(fileName, markdown)
    },
    getMethodColor (method) {
      method = method.replace(/\n/g, '').trim()
      const result = this.methodsColors.find(color => color.method === method.toUpperCase())
      return result.value
    },
    downloadHtml () {
      const { tableOfContent, collectionContent, css } = this.getContentCollection()
      const fileName = `${this.$store.getters['collection/getCollection'].info.name}.html`
      const javascript = toggleContent
      const content = this.constructHtmlStrucuteForDownload(css, javascript, tableOfContent, collectionContent)

      this.downloadFile(fileName, content)
    },
    getContentCollection () {
      /**
       * Return HTML as string
       **/
      const tableOfContent = document.querySelector('.table-of-content')
        .outerHTML
      const collectionContent = document.querySelector('.collection-content')
        .outerHTML
      const css = this.extractCss()

      return { tableOfContent, collectionContent, css }
    },
    downloadFile (fileName, content) {
      /**
       * Make a string downloable, the file extension come in with the fileName param
       */

      // creating an invisible element
      const element = document.createElement('a')
      element.setAttribute(
        'href',
        'data:text/plain;charset=utf-8, ' + encodeURIComponent(content)
      )
      element.setAttribute('download', fileName)
      // the above code is equivalent to
      // <a href="path of file" download="file name">

      document.body.appendChild(element)
      element.click()
      document.body.removeChild(element)
    },
    constructHtmlStrucuteForDownload (css, javascript, tableOfContent, collectionContent) {
      /**
       * Create a logic HTML structure as string for make a downloable file
       */
      const bodyClasses = document.querySelector('body').classList
      const html = `
      <html>
        <head>
          <meta charset="UTF-8">
          <style>${css}</style>
        </head>
        <body class="${bodyClasses.toString()}">
          <main class="q-page q-pa-md q-page-container">
            <div class="row">
              <div class="col-sm-12 col-md-3 q-mr-xs q-mt-xs">
                ${tableOfContent}
              </div>
              <div class="col-sm-12 col-md-8 q-mt-xs">
                ${collectionContent}
              </div>
            </div>
          </main>
          <script>${javascript}\u003c/script>
        </body>
      </html>
      `
      return html
    },
    extractCss () {
      const css = []
      for (let i = 0; i < document.styleSheets.length; i++) {
        const sheet = document.styleSheets[i]
        const rules = 'cssRules' in sheet ? sheet.cssRules : sheet.rules
        if (rules) {
          css.push(
            '\n/* Stylesheet : ' + (sheet.href || '[inline styles]') + ' */'
          )
          for (let j = 0; j < rules.length; j++) {
            const rule = rules[j]
            if ('cssText' in rule) css.push(rule.cssText)
            else {
              css.push(
                rule.selectorText + ' {\n' + rule.style.cssText + '\n}\n'
              )
            }
          }
        }
      }
      return css.join('\n') + '\n'
    }
  }
}
</script>
