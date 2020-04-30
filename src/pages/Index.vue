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
          <q-card-section>
            <q-file
              standout
              @input="parseJsonFile()"
              v-model="uploadedFile"
              label="Upload JSON"
              accept=".json"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop />
              </template>
            </q-file>
          </q-card-section>
        </q-card>
        <q-card class="q-mt-md">
          <q-card-section>
            <table-of-content />
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-12 col-md-7">
        <q-card>
          <q-card-section>
            <display-settings />
          </q-card-section>
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
              <p class="text-h4 q-mt-md" :id="item.id">{{ item.name }}</p>
              <div class="request">
                <div
                  class="request "
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
                  <div class="header q-my-md">
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
    <q-page-sticky v-if="scrollInfo.position >= 200" position="bottom-right" :offset="[18, 80]">
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
      scrollInfo: {}
    }
  },
  methods: {
    parseJsonFile () {
      const fr = new FileReader()

      fr.onload = e => {
        const result = JSON.parse(e.target.result)
        this.$store.commit('collection/SET_COLLECTION', result)
      }
      fr.readAsText(this.uploadedFile)
    },
    onScroll (info) {
      this.scrollInfo = info
    }
  }
}
</script>
