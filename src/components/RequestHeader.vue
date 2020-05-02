<template>
  <div>
    <h4 class="text-h6 q-my-sx">
      Headers
    </h4>
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
