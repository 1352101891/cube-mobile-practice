import Vue from 'vue'
import router from './router/index.js'
import util from './util/CommonUtil.js'
import httpRequest from './util/NetUtil.js'
// By default we import all the components.
// Only reserve the components on demand and remove the rest.
// Style is always required.

import store from './store/store.js'
import App from './App'
import Cube from 'cube-ui'

import SubscribeDialog from './components/subscribe-dialog/subscribe-dialog'

Vue.use(Cube)
Cube.createAPI(Vue, SubscribeDialog, [], true)

Vue.config.productionTip = false
Vue.prototype.xRequest = httpRequest
Vue.prototype.util = util
/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router: router,
  render: h => h(App)
})
