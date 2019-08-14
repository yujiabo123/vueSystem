import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: "",
  WordsConfig: {},
  ApiConfig: {},
  UserInfo: {}
};

const mutations = {
  SetToken(state, t) {
    state.token = t;
    sessionStorage.token = t;
  },
  RemoveToken(state) {
    state.token = "";
    sessionStorage.removeItem("token");
  },
  SetWordsConfig(state, config) {
    state.WordsConfig = config;
  },
  SetApiConfig(state, config) {
    state.ApiConfig = config;
  },
  SetUserInfo(state, info) {
    state.UserInfo = info;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
