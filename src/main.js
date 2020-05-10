
import 'swiper/css/swiper.min.css'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import './mock/mockServer'

Vue.config.productionTip = false

Vue.component('TypeNav',TypeNav)
Vue.component('Carousel',Carousel)

// Vue.prototype.$bus = new Vue()

new Vue({
  beforeCreate () {
    Vue.prototype.$bus = this
  },
  render: h => h(App),
  router,
  store,
}).$mount('#app')
