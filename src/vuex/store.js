import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: "",
  WordsConfig: null,
  ApiConfig: null,
  UserInfo: null,
  IndexTable: {
    Cashable: 0,
    MonthAddPromoter: 0,
    MonthAddUser: 0,
    MonthUserProfit: 0,
    Rebates: 0,
    SubPromoter: 0,
    SubUser: 0,
    TodayAddPromoter: 0,
    TodayAddUser: 0,
    TodayUserProfit: 0,
    TotalIncome: 0
  }
};

const mutations = {
  SetToken(state, t) {
    state.token = t;
    sessionStorage.setItem("token", t);
  },
  RemoveToken(state) {
    state.token = "";
    sessionStorage.removeItem("token");
  },
  SetWordsConfig(state, config) {
    state.WordsConfig = config;
    sessionStorage.setItem("WordsConfig", JSON.stringify(config));
  },
  SetApiConfig(state, config) {
    state.ApiConfig = config;
    sessionStorage.setItem("ApiConfig", JSON.stringify(config));
  },
  SetUserInfo(state, info) {
    state.UserInfo = info;
    sessionStorage.setItem("UserInfo", JSON.stringify(info)); 
  },
  SetIndexTable(state, data) {
    state.IndexTable = data;
    sessionStorage.setItem("IndexTable", JSON.stringify(data)); 
  }
};

const getters = {
  token: state => {
    if (!state.token) {
      state.token = sessionStorage.getItem("token");
    }
    return state.token;
  },
  WordsConfig: state => {
    if (!state.WordsConfig) {
      state.WordsConfig = JSON.parse(sessionStorage.getItem("WordsConfig"));
    }
    return state.WordsConfig;
  },
  ApiConfig: state => {
    if (!state.ApiConfig) {
      state.ApiConfig = JSON.parse(sessionStorage.getItem("ApiConfig"));
    }
    return state.ApiConfig;
  },
  UserInfo: state => {
    if (!state.UserInfo) {
      state.UserInfo = JSON.parse(sessionStorage.getItem("UserInfo"));
    }
    return state.UserInfo;
  },
  IndexTable: state => {
    if (!state.IndexTable) {
      state.IndexTable = JSON.parse(sessionStorage.getItem("IndexTable"));
    }
    return state.IndexTable;
  }
};

export default new Vuex.Store({
  state,
  mutations,
  getters
});
