<template>
  <div>
    <p class="text-h6">Description</p>
    <q-markdown :no-line-numbers="$store.getters['displaySettings/getDisableLineNumbers']">
{{description}}
    </q-markdown>
  </div>
</template>

<script>
export default {
  name: 'requestDescription',
  props: ['description'],
  data () {
    return {}
  }
}
</script>
