import Vue from 'vue'
import App from './App.vue'
import router from './router'

import Ionic from '@ionic/vue';
import '@ionic/core/css/ionic.bundle.css';

import FooterToolbar from './components/FooterToolbar.vue';
import MyHeader from './components/MyHeader.vue';
import ScanModal from './components/ScanModal.vue';
import VueQrcodeReader from "vue-qrcode-reader";
import store from './store'
import Clipboard from 'v-clipboard'

/* Registering components */
Vue.component('footer-toolbar', FooterToolbar);
Vue.component('my-header', MyHeader);
Vue.component('scan-modal', ScanModal);

/* Global var */
Vue.prototype.$projects = [];

Vue.use(Ionic);
Vue.use(VueQrcodeReader);
Vue.use(Clipboard);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
