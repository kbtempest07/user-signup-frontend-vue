const state = {
  loginStatus: false,
  jwtToken: ""
};

const getters = {};

const mutations = {
  setLoginStatusMutation: (state, payload) => {
    state.loginStatus = payload;
  },
  setJWTMutation: (state, payload) => {
    state.jwtToken = payload;
  }
};

const actions = {
  setLoginStatus: ({ commit }, payload) => {
    commit("setLoginStatusMutation", payload);
  },
  setJWT: ({ commit }, payload) => {
    commit("setJWTMutation", payload);
  }
};

export default {
  state,
  mutations,
  actions,
  getters
};
