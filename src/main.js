import Vue from 'vue'
import BootstrapVue from "bootstrap-vue"
import VueResource from 'vue-resource';
import App from './components/App.vue'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"

import router from './router/app.router';

Vue.use(BootstrapVue)
Vue.use(VueResource);

new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
