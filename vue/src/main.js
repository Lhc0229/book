import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from 'axios';
var Stick = require('vue-stick')

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ViewUI);
Vue.use(Stick);
Vue.use(ElementUI);
Vue.prototype.$axios = axios;
Vue.prototype.$url = 'http://47.101.58.132:4002';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
