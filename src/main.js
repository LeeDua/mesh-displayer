import '@fortawesome/fontawesome-free/css/all.min.css'
import 'bootstrap-css-only/css/bootstrap.min.css'
import 'mdbvue/lib/mdbvue.css'
import Vue from 'vue'
import router from './router'
import store from './store'

require('./assets/scss/main.scss')
const VueUploadComponent = require('vue-upload-component')
Vue.component('file-upload', VueUploadComponent)

import App from './App.vue'
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
