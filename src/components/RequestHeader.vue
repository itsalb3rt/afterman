<template>
  <div>
    <p class="text-h5">
      Headers
    </p>
    <div class="row" v-for="(item, index) in header" :key="index">
      <div class="col-3 text-bold">{{ item.key }}</div>
      <div class="col-9">{{ item.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'requestHeader',
  props: ['header'],
  data () {
    return {}
  }
}
</script>
