import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Register from '../components/RegistrationMain'
import VueCookie from 'vue-cookie'
import store from '../store'
import Error from '../components/Error'

Vue.use(Router);
Vue.use(VueCookie);

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/register',
      component: Register
    },
    {
      path: '/error',
      component: Error
    },
    {
      path: '*',
      redirect: '/error'
    }
  ],
  mode: 'history'
})
