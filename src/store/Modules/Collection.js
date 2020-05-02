export default {
  namespaced: true,
  state: {
    collectionModel: {
      // Used for reset collection object only

      info: { // the information object
        schema: ''
      },
      item: [], // All request
      variable: [] // Collection variables used, for example in URL
    },
    collection: {
      info: { // the information object
        schema: ''
      },
      item: [], // All request
      variable: [] // Collection variables used, for example in URL
    },
    isTableContentReady: false
  },
  getters: {
    getCollection (state) {
      return state.collection
    },
    getCollectionVariables (state) {
      return state.collection.variable
    },
    getIsTableContentReady (state) {
      return state.isTableContentReady
    },
    getCollectionModel (state) {
      return state.model
    },
    isValid (state) {
      return (state.collection.info.schema === 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json')
    }
  },
  mutations: {
    SET_COLLECTION (state, payload) {
      state.collection = payload
    },
    SET_TABLE_CONTENT_READY (state, value) {
      state.isTableContentReady = value
    }
  }
}
