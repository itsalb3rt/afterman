<template>
  <div>
    <p class="text-h5">Table of content</p>
    <div>
      <q-list class="tree" separator>
        <q-item v-for="(item, index) in tableOfContent" :key="index">
          <q-item-section class="text-capitalize" style="display:inline-block">
            <q-icon :name="item.icon" /><span class="text-bold">
              {{ item.label }}</span
            >
            <q-list separator>
              <q-item
                v-for="(child, key) in item.children"
                :key="key"
              >
                <q-chip
                  :color="getColorByMethod(child.method)"
                  text-color="white"
                  size="10px"
                  >{{ child.method }}</q-chip
                >
                <q-item-section>
                  <a class="item primary" :href="`#${child.anchor}`">
                    {{ child.label }}
                  </a>
                </q-item-section>
              </q-item>
            </q-list>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>

<script>
import uniqid from 'uniqid'

export default {
  name: 'tableOfContent',
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
    }
  },
  computed: {
    tableOfContent () {
      const result = []
      this.$store.getters['collection/getCollection'].item.forEach(
        (element, index) => {
          const currentKey = element.name.toString().toLowerCase()
          result[index] = {
            label: currentKey,
            children: [],
            anchor: currentKey + 'anchor',
            icon: 'folder'
          }

          element.item.forEach(request => {
            result[index].children.push({
              key: uniqid(),
              originalKey: request.name.replace(/[^a-z0-9A-Z]/g, ''),
              label: request.name,
              method: request.request.method,
              anchor:
                request.name.replace(/[^a-z0-9A-Z]/g, '') +
                request.request.method
            })
          })
        }
      )
      return result
    }
  }
}
</script>
<style lang="css">
.tree a.item {
  text-decoration: none;
  color: var(--q-color-dark);
}
.tree a.item:hover{
  text-decoration: underline;
}
</style>
