export default {
  namespaced: true,
  state: {
    disableLineNumbers: true,
    displayRequestHeaders: true,
    displayRequestDescription: true,
    displayRequestBody: true,
    displayRequestUrl: true
  },
  getters: {
    getDisableLineNumbers (state) {
      return state.disableLineNumbers
    },
    getDisplayRequestHeaders (state) {
      return state.displayRequestHeaders
    },
    getDisplayRequestDescription (state) {
      return state.displayRequestDescription
    },
    getDisplayRequestBody (state) {
      return state.displayRequestBody
    },
    getDisplayRequestUrl (state) {
      return state.displayRequestUrl
    }
  },
  mutations: {
    SET_DISABLE_LINE_NUMBER (state, value) {
      state.disableLineNumbers = value
    },
    SET_DISPLAY_REQUEST_HEADERS (state, value) {
      state.displayRequestHeaders = value
    },
    SET_DISPLAY_REQUEST_DESCRIPTION (state, value) {
      state.displayRequestDescription = value
    },
    SET_DISPLAY_REQUEST_BODY (state, value) {
      state.displayRequestBody = value
    },
    SET_DISPLAY_REQUEST_URL (state, value) {
      state.displayRequestUrl = value
    }
  }
}
