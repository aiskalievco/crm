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
      component: Home,
      beforeEnter(toR, fromR, next) {
        let auth = Vue.cookie.get('auth');
        if (auth) {
          let str = 'auth';
          auth = JSON.parse(auth);
          Vue.http.options.root = 'http://localhost:44313/';
          Vue.http.save(str, {params: auth}).then(function(response){
            let data = response.data;
            if (data !== false) {
              Vue.cookie.set('auth', JSON.stringify(auth), 1);
              store.dispatch('loadPerson', data);
            } else {
              Vue.cookie.delete('auth');
              Vue.router.push('/');
            }
            next();
          });
        } else {
          next();
        }
      }
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
