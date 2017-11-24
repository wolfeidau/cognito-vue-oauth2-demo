import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import AuthRedirect from '@/pages/AuthRedirect'
import Dashboard from '@/pages/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/auth/redirect',
      name: 'AuthRedirect',
      component: AuthRedirect
    },
    {
      path: '/dashboard',
      name: 'Dash',
      component: Dashboard
    }
  ]
})
