export default {
  namespaced: true,
  state: {
    collection: {
      item: null, // All request
      variable: [] // Collection variables used, for example in URL
    }
  },
  getters: {
    getCollection (state) {
      return state.collection
    },
    getCollectionVariables (state) {
      return state.collection.variable
    }
  },
  mutations: {
    SET_COLLECTION (state, payload) {
      state.collection = payload
    }
  }
}
