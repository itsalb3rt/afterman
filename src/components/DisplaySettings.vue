<template>
  <div>
    <q-page-sticky position="bottom-right" class="z-max" :offset="[18, 18]">
      <q-btn fab icon="settings" color="primary" @click="toggleDialog = true" />
    </q-page-sticky>
    <q-dialog position="right" v-model="toggleDialog">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Display settings</div>
          <q-space />
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Controls the general display settings
        </q-card-section>
        <q-card-section>
          <div>
            <q-toggle
              @input="toggleDisableLineNumbers()"
              v-model="toggleLineNumbers"
              label="Disable line numbers"
            ></q-toggle>
          </div>
          <div>
            <q-separator class="q-my-md" />
          </div>
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
{{$store.getters['collection/getCollection']}}
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
  },
  data () {
    return {
      toggleDialog: false,
      toggleLineNumbers: false,
      displayRaw: false
    }
  },
  methods: {
    toggleDisableLineNumbers () {
      this.$store.commit(
        'displaySettings/SET_DISABLE_LINE_NUMBER',
        this.toggleLineNumbers
      )
    }
  }
}
</script>
