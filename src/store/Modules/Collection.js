export default {
  namespaced: true,
  state: {
    collection: {
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
