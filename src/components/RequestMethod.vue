<template>
  <div>
    <q-chip class="request-method" :color="getColorByMethod(method)" text-color="white">
      {{ method }}
    </q-chip>
    <strong class="text-bold request-name" :id.sync="anchor">{{requestName}}</strong>
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
