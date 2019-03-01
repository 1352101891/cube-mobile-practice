import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    currentTab: Number
  },
  mutations: {
    setCurrentTab (state, payload) {
      state.currentTab = payload.position
      window.console.log('position:' + payload.position)
    }
  }
})
