import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import { store } from "@/store";
import "./registerServiceWorker";
import VueResource from "vue-resource";
import Vuelidate from "vuelidate";

Vue.use(Vuelidate);
Vue.use(VueResource);

Vue.config.productionTip = false;

Vue.http.interceptors.push((request, next) => {
  if (store.state.customer.jwtToken) {
    request.headers.set(
      "Authorization",
      "Bearer " + store.state.customer.jwtToken
    );
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
