import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import 'bootstrap/scss/bootstrap.scss'
import '@popperjs/core'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
