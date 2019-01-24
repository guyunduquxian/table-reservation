import Vue from 'vue'
import Router from 'vue-router'
import Shop from './views/Shop.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'shop',
      component: Shop
    }
  ]
})
