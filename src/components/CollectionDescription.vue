<template>
  <div>
    <p class="text-h3 text-center">{{info.name}}</p>
    <q-markdown :no-line-numbers="$store.getters['displaySettings/getDisableLineNumbers']">
{{sanitizeInfo(info.description)}}
    </q-markdown>
  </div>
</template>

<script>
export default {
  name: 'collectionDescription',
  props: ['info'],
  data () {
    return {}
  },
  methods: {
    sanitizeInfo (info) {
      if (info) {
        return info.toString()
      }
    }
  }
}
</script>
