import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import VueCookie from 'vue-cookie'
import VueResource from 'vue-resource'
import store from './store'

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(VueCookie);
Vue.use(VueResource);

Vue.http.options.root = 'http://localhost:54153/Home/';

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
