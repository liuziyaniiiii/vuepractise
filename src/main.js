
import 'swiper/css/swiper.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import './mock/mockServer'
import './validate'
import * as API from '@/api'


Vue.prototype.$API = API

Vue.config.productionTip = false

Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)
Vue.component('Pagination',Pagination)

// Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
