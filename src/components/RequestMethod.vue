<template>
  <div>
    <q-chip :color="getColorByMethod(method)" text-color="white">
      {{ method }}
    </q-chip>
    <span class="text-bold" :id.sync="anchor">{{requestName}}</span>
  </div>
</template>

<script>
export default {
  name: 'requestMethod',
  props: ['method', 'requestName', 'anchor'],
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
      const result = this.colors.find(color => color.method === method.toUpperCase())
      return result.value
    }
  }
}
</script>
