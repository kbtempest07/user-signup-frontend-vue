import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";

import customer from "@/store/modules/customer";

Vue.use(Vuex);
const vuexPersistLocalStorage = new VuexPersist({
  key: "local-storage",
  storage: window.localStorage,
  modules: [customer]
});

export const store = new Vuex.Store({
  state: {
    version: ""
  },
  mutations: {},
  plugins: [vuexPersistLocalStorage.plugin],
  modules: {
    customer
  }
});
