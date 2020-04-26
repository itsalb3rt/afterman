export default {
  namespaced: true,
  state: {
    disableLineNumbers: false
  },
  getters: {
    getDisableLineNumbers (state) {
      return state.disableLineNumbers
    }
  },
  mutations: {
    SET_DISABLE_LINE_NUMBER (state, value) {
      state.disableLineNumbers = value
    }
  }
}
