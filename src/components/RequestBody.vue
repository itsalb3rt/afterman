<template>
  <div>
    <q-markdown :no-line-numbers="true">
      {{parseDescription(body)}}
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
    parseDescription (description) {
      return description.toString()
    }
  }
}
</script>
