<template>
  <div>
    <q-markdown>
```
{{ setUrlVars(url) }}
```
    </q-markdown>
  </div>
</template>

<script>
export default {
  name: 'requestUrl',
  props: ['url'],
  data () {
    return {}
  },
  methods: {
    setUrlVars (url) {
      const urlVars = url.match(/({{[a-zA-Z]+}})/)
      if (urlVars) {
        urlVars.forEach(element => {
          const result = this.$store.getters['collection/getCollectionVariables'].find(item => item.key === element.replace(/({{)|(}})/g, ''))
          url = url.replace(`{{${result.key}}}`, result.value)
        })
      }
      return url
    }
  }
}
</script>
