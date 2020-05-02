<template>
  <div>
    <h1 class="text-h3 text-center q-my-md">{{info.name}}</h1>
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
