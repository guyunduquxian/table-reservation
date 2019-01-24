import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Axios from "axios"
Vue.prototype.$axios = Axios;

import "./../public/css/reset.css"
import "./assets/iconfont/iconfont.css"

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
