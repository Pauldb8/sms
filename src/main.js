import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import FooterToolbar from './components/FooterToolbar.vue';
import MyHeader from './components/MyHeader.vue';
import store from './store'

/* Registering components */
Vue.component('footer-toolbar', FooterToolbar);
Vue.component('my-header', MyHeader);

/* Global var */
Vue.prototype.$projects = [];

Vue.use(Ionic);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
