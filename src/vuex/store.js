import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: "",
  WordsConfig: {},
  ApiConfig: {},
  UserInfo: {
    FACEBOOK: "",
    INS: "",
    Pcode: "",
    PhoneNumber: "",
    SupPcode: "",
    UserName: "",
    Zalo: ""
  },
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
    console.log(t + "==========================");
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
