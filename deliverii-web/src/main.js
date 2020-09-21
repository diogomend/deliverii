import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "@/plugins/vuetify";
import VueRouter from "vue-router";
import { ValidationProvider, extend } from "vee-validate";

import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required"
});

Vue.use(VueRouter);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  ValidationProvider,
  render: h => h(App)
}).$mount("#app");

window.addEventListener(
  "touchmove",
  function() {
    document.body.classList.add("hide-ripple");
  },
  { passive: true }
);
window.addEventListener("touchend", function() {
  setTimeout(function() {
    document.body.classList.remove("hide-ripple");
  }, 50);
});
