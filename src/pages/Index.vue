<template>
  <q-page class="q-pa-md">
    <div class="row q-gutter-sm">
      <div class="col-sm-12 col-md-4">
        <q-card class="my-card">
          <q-card-section>
            <p>
              Upload the postman collection file here in
              <span class="text-bold">.json</span> format. Remember that you
              must export the file from postman, right click on the collection
              -> export ->
              <span class="text-bold">Collection 2.1 (recomend)</span>
            </p>
          </q-card-section>
          <q-separator inset />
          <q-card-section>
            <q-file
              standout
              @input="parseJsonFile()"
              v-model="uploadedFile"
              label="Upload JSON"
              accept=".json"
            >
              <template v-slot:prepend>
                <q-icon name="cloud_upload" @click.stop />
              </template>
            </q-file>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-sm-12 col-md-7">
        <q-card>
          <q-card-section>
            <display-settings />
          </q-card-section>
          <q-card-section>
            <collection-description
              :info="this.$store.getters['collection/getCollection'].info"
              v-if="this.$store.getters['collection/getCollection'].info"
            />
          </q-card-section>
          <q-separator />
          <q-card-section>
            <div
              v-for="(item, index) in this.$store.getters[
                'collection/getCollection'
              ].item"
              :key="index"
            >
              <q-separator v-if="index > 0" />
              <p class="text-h4 q-mt-md">{{ item.name }}</p>
              <div class="request">
                <div
                  class="request "
                  v-for="(request, requestKey) in item.item"
                  :key="requestKey"
                >
                  <div class="description">
                    <request-description
                      :description="request.request.description"
                    />
                  </div>
                  <p class="header">
                    <request-header :header="request.request.header" />
                  </p>
                  <div class="method">
                    <request-method
                      :method="request.request.method"
                      :request-name="request.name"
                    />
                  </div>
                  <div class="url q-mt-sm q-mb-sm">
                    <request-url :url="request.request.url.raw" />
                  </div>
                  <q-separator class="q-mt-md q-mb-md" />
                  <div class="description">
                    <request-body :body="request.request.body" />
                  </div>
                </div>
              </div>
              <q-separator color="secondary" class="q-mt-md q-mb-md" />
            </div>
          </q-card-section>
        </q-card>
        <pre>
          {{ $store.getters["collection/getCollection"] }}
        </pre>
      </div>
    </div>
  </q-page>
</template>

<script>
import collectionDescription from 'src/components/CollectionDescription'
import requestMethod from 'src/components/RequestMethod'
import requestHeader from 'src/components/RequestHeader'
import requestBody from 'src/components/RequestBody'
import requestDescription from 'src/components/RequestDescription'
import requestUrl from 'src/components/RequestUrl'
import displaySettings from 'src/components/DisplaySettings'

export default {
  name: 'PageIndex',
  components: {
    requestMethod,
    requestHeader,
    requestBody,
    requestDescription,
    displaySettings,
    collectionDescription,
    requestUrl
  },
  data () {
    return {
      uploadedFile: null,
      fileAsJson: {
        item: null
      }
    }
  },
  methods: {
    parseJsonFile () {
      const fr = new FileReader()

      fr.onload = e => {
        const result = JSON.parse(e.target.result)
        this.$store.commit('collection/SET_COLLECTION', result)
      }
      fr.readAsText(this.uploadedFile)
    }
  }
}
</script>
