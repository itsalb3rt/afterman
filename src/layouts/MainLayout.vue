<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="text-primary bg-white">
        <q-btn flat dense round aria-label="Menu" />
        <q-avatar>
          <q-img src="~assets/mars.png" alt="mars-planet" />
        </q-avatar>
        <q-toolbar-title>
          Afterman
        </q-toolbar-title>

        <div>v{{ appVersion }}</div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
  mounted () {
    this.appVersion = process.env.APP_VERSION
  },
  data () {
    return {
      appVersion: ''
    }
  }
}
</script>
