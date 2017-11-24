import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import Auth from '@/authentication'

Vue.use(VueResource)
Vue.use(Auth, {
  cognitoDomain: process.env.COGNITO_DOMAIN,
  clientId: process.env.CLIENT_ID,
  redirectURL: process.env.REDIRECT_URL
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
