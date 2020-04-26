<template>
  <div>
    <p class="text-h6">Body</p>
    <q-markdown v-if="body" :no-line-numbers="$store.getters['displaySettings/getDisableLineNumbers']">
      {{parseBody(body.raw)}}
    </q-markdown>
  </div>
</template>

<script>
export default {
  name: 'requestBody',
  props: ['body'],
  data () {
    return {}
  },
  methods: {
    parseBody (body) {
      return body.toString()
    }
  }
}
</script>
