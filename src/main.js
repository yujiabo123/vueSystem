// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import { Table, TableColumn } from "element-ui";
import App from "./App";
import router from "./router";
import Qs from "qs";
import store from "./vuex/store"; // 引入store
import plus from "vue-h5-plus";
import VueClipboard from 'vue-clipboard2'

// import { testGet } from './api/api.js'

Vue.use(MintUI);
Vue.use(plus);
Vue.use(VueClipboard)

Vue.config.productionTip = false;
// Vue.prototype.axios = axios
// axios.defaults.baseURL = '/api'
Vue.prototype.Qs = Qs;
Vue.prototype.Toast = MintUI.Toast;
Vue.prototype.MessageBox = MintUI.MessageBox;
Vue.prototype.Indicator = MintUI.Indicator;

// Vue.prototype.$testGet = testGet

// Vue.prototype.$http = axios
// Vue.prototype.getConfig = function () {
//   this.$http.get('./static/config.json').then(res => {
//     console.log(res.data)
//     Vue.prototype.apiConfig = res.data
//   }).catch(err => {
//     console.log(err)
//   })
//   this.$http.get('./static/words.json').then(res => {
//     console.log(res.data)
//     Vue.prototype.wordsConfig = res.data
//   }).catch(err => {
//     console.log(err)
//   })
// }

console.log("main");
Vue.component(MintUI.Popup.name, MintUI.Popup);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
