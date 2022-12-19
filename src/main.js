import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/normalize.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
// 需要和代理做标识的对应，baseUrl
Vue.config.productionTip = false;
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
