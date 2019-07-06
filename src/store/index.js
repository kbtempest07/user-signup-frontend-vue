import Vue from "vue";
import Vuex from "vuex";
import VuexPersist from "vuex-persist";
import { version } from "../../package.json";
import customer from "@/store/modules/customer";

Vue.use(Vuex);
const vuexPersistLocalStorage = new VuexPersist({
  key: "vuex",
  storage: window.localStorage,
  modules: [customer]
});

export const store = new Vuex.Store({
  state: {
    version: ""
  },
  mutations: {
    initialiseStore(state) {
      // Check if the store exists
      if (localStorage.getItem("vuex")) {
        const vuex = JSON.parse(localStorage.getItem("vuex"));
        const initialState = {
          customer: customer.state
        };
        if (vuex.version === version) {
          this.replaceState(Object.assign(state, vuex));
        } else {
          state.version = version;
          Object.keys(initialState).forEach(key => {
            state[key] = initialState[key];
          });
        }
      }
    }
  },
  plugins: [vuexPersistLocalStorage.plugin],
  modules: {
    customer
  }
});
