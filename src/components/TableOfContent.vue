<template>
  <div>
    <h2 class="text-h5 q-my-md" v-if="tableOfContent.length > 0">Table of content</h2>
    <div>
      <q-list class="tree" separator>
        <q-item v-for="(item, index) in tableOfContent" :key="index">
          <q-item-section class="text-capitalize" style="display:inline-block">
            <span class="root-list-item">
              <span class="table-content-icon text-grey-7" :data-content-id="'content'+item.id" onclick="toggleContent(this.getAttribute('data-content-id'), this);">►</span> 📁
              <span class="text-bold">
                <a
                  class="item text-capitalize"
                  :href="'#' + (item.id ? `${item.id}` : '')"
                >
                  - {{ item.label }}</a
                >
              </span>
            </span>
            <q-list separator :id="'content'+item.id" class="hide">
              <q-item v-for="(child, key) in item.children" :key="key">
                <q-item-section>
                  <span class="child-list-item">
                    <q-chip
                      :color="getColorByMethod(child.method)"
                      text-color="white"
                      size="10px"
                      >{{ child.method }}</q-chip
                      >
                    <a class="item primary" :href="`#${child.id}`">
                      {{ child.label }}
                    </a>
                  </span>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>
      </q-list>
      <div v-if="tableOfContent.length > 0">
        {{ setTableContentReady() }}
      </div>
    </div>
  </div>
</template>

<script>
import uniqid from 'uniqid'
import { toggleContent } from 'src/assets/js/tableOfContentUtil.js'

export default {
  name: 'tableOfContent',
  mounted () {
    /**
     * added function in window, no is a good practice but is for
     *  reusable code for final version of documentation.
     */
    window.toggleContent = toggleContent
  },
  data () {
    return {
      colors: [
        { method: 'POST', value: 'primary' },
        { method: 'GET', value: 'positive' },
        { method: 'PATCH', value: 'grey' },
        { method: 'DELETE', value: 'negative' },
        { method: 'PUT', value: 'indigo' }
      ]
    }
  },
  methods: {
    getColorByMethod (method) {
      const result = this.colors.find(
        color => color.method === method.toUpperCase()
      )
      return result.value
    },
    setTableContentReady () {
      /**
       * Hack for active the main content view, this wait for the coneten loading
       * and used the new properties
       */
      this.$store.commit('collection/SET_TABLE_CONTENT_READY', true)
    }
  },
  computed: {
    tableOfContent () {
      const result = []
      this.$store.getters['collection/getCollection'].item.forEach(
        (element, index) => {
          // Create a unique Id for use the anchors
          element.id = uniqid()

          const currentKey = element.name.toString().toLowerCase()
          result[index] = {
            id: element.id,
            label: currentKey,
            children: [],
            anchor: currentKey + 'anchor',
            icon: 'folder'
          }

          element.item.forEach(request => {
            // Create a unique Id for use the anchors in content table
            request.id = uniqid()

            result[index].children.push({
              id: request.id,
              originalKey: request.name.replace(/[^a-z0-9A-Z]/g, ''),
              label: request.name,
              method: request.request.method
            })
          })
        }
      )
      return result
    }
  }
}
</script>
<style lang="scss">
.tree a.item {
  text-decoration: none;
  color: $grey-14;
}
.tree a.item:hover {
  text-decoration: underline;
}
.table-content-icon:hover{
  cursor: pointer;
  background-color:rgba(117, 117, 117, 0.15);
}
.table-content-icon{
  font-size: 12px;
  padding: 2px;
  border-radius: 2px;
}
.show{
  display: block;
}
.hide{
  display: none;
}
</style>
