<template>
  <div>
    <q-page-sticky position="bottom-right" class="z-max" :offset="[18, 18]">
      <q-btn fab icon="settings" color="primary" @click="toggleDialog" />
    </q-page-sticky>
    <q-dialog position="right" v-model="showDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Display settings</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section class="general-settings">
          <p class="text-bold">General</p>
          <div>
            <q-toggle
              @input="toggleDisableLineNumbers()"
              v-model="toggleLineNumbers"
              label="Disable line numbers"
            ></q-toggle>
          </div>
          <div>
            <q-toggle
              @input="darkMode()"
              v-model="toggleDarkMode"
              label="Dark Mode"
            ></q-toggle>
          </div>
          <div>
            <q-separator class="q-mt-md" />
          </div>
        </q-card-section>
        <q-card-section class="content-settings">
          <div>
            <p class="text-bold">Content</p>
          </div>
          <div>
            <q-toggle
              @input="toggleDisplayHeaders()"
              v-model="displayRequestHeaders"
              label="Display Headers"
            ></q-toggle>
          </div>
          <div>
            <q-toggle
              v-model="displayRequestUrl"
              label="Display URL"
            ></q-toggle>
          </div>
          <div>
            <q-toggle
              v-model="displayRequestDescription"
              label="Display Description"
            ></q-toggle>
          </div>
          <div>
            <q-toggle
              v-model="displayRequestBody"
              label="Display Body"
            ></q-toggle>
          </div>
          <div>
            <q-separator class="q-mt-md" />
          </div>
        </q-card-section>
        <q-card-section>
          <div>
            <q-btn
              @click="displayRaw = true"
              color="primary"
              outline
              label="View collection in raw (JSON)"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
    <q-dialog maximized v-model="displayRaw">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Collection</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-card-section>
          <q-markdown>
            ```json
            {{ $store.getters["collection/getCollection"] }}
            ```
          </q-markdown>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'displaySettings',
  mounted () {
    this.toggleLineNumbers = this.$store.getters[
      'displaySettings/getDisableLineNumbers'
    ]
    this.displayRequestHeaders = this.$store.getters[
      'displaySettings/getDisplayRequestHeaders'
    ]
    this.toggleDarkMode = this.$q.dark.isActive
  },
  data () {
    return {
      showDialog: false,
      toggleLineNumbers: false,
      displayRaw: false,
      toggleDarkMode: false,
      displayRequestHeaders: true,
      displayRequestDescription: true,
      displayRequestBody: true,
      displayRequestUrl: true
    }
  },
  methods: {
    toggleDialog () {
      this.showDialog = !this.showDialog
    },
    toggleDisableLineNumbers () {
      this.$store.commit(
        'displaySettings/SET_DISABLE_LINE_NUMBER',
        this.toggleLineNumbers
      )
    },
    toggleDisplayHeaders () {
      this.$store.commit(
        'displaySettings/SET_DISPLAY_REQUEST_HEADERS',
        this.displayRequestHeaders
      )
    },
    darkMode () {
      this.$q.dark.set(this.toggleDarkMode)
    }
  }
}
</script>
