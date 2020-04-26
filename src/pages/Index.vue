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
            <div v-for="(item, index) in fileAsJson.item" :key="index">
              <p class="text-h4">{{ item.name }}</p>
              <div class="requests">
                <div
                  class="request"
                  v-for="(request, requestKey) in item.item"
                  :key="requestKey"
                >
                  <p class="header">
                    <request-header :header="request.request.header" />
                  </p>
                  <p class="method">
                    <request-method :method="request.request.method" />
                    {{ request.name }}
                  </p>
                  <p class="url">{{ request.request.url.raw }}</p>
                  <div class="description">
                    <request-body :body="request.request.description" />
                  </div>
                </div>
              </div>
            </div>
          </q-card-section>
          <pre>
                {{ fileAsJson.item }}
          </pre>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
import requestMethod from 'src/components/RequestMethod'
import requestHeader from 'src/components/RequestHeader'
import requestBody from 'src/components/RequestBody'
import displaySettings from 'src/components/DisplaySettings'

export default {
  name: 'PageIndex',
  components: { requestMethod, requestHeader, requestBody, displaySettings },
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
        this.fileAsJson = result
      }
      fr.readAsText(this.uploadedFile)
    }
  }
}
</script>
