import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: "",
  WordsConfig: null,
  ApiConfig: null,
  UserInfo: null,
  IndexTable: null,
  Lang:"vi"
};

const mutations = {
  ChangeLang(state) {
    if (state.Lang === "cn") {
      state.Lang = "vi";
      sessionStorage.setItem("Lang", "vi");
    }else {
      state.Lang = "cn";
      sessionStorage.setItem("Lang", "cn"); 
    }
  },
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
  },
  SetLang(state, lang) {
    state.Lang = lang;
  }
};

const getters = {
  Lang: state => {
    if (!state.Lang) {
      state.Lang = sessionStorage.getItem("Lang");
    }
    return state.Lang;
  },
  token: state => {
    if (!state.token) {
      state.token = sessionStorage.getItem("token");
    }
    return state.token;
  },
  WordsConfig: state => {
    if (!state.WordsConfig) {
      state.WordsConfig = JSON.parse(sessionStorage.getItem("WordsConfig"));
      if (!state.WordsConfig) {
        state.WordsConfig = {
          cn: {
            GameLink: "",
            Login: {
              username: "",
              password: "",
              no_account: "",
              loginBtn: "",
              msgBox_noName: "",
              msgBox_noPsd: "",
              msgTitle: "",
              msgBox_waitConfirm: "",
              msgBox_loseToken: ""
            },
            Index: {
              head_title: {
                v8: "",
                icd: "",
                dps: "",
                am: ""
              },
              back: "",
              dayIncome: "",
              monthIncome: "",
              returnRate: "",
              canWithdraw: "",
              dayNewPlayer: "",
              monthNewPlayer: "",
              dayNewAgent: "",
              monthNewAgent: "",
              messageBoxTitle: "",
              messageBoxMessage: "",
              firstAgent: "",
              secondAgent: ""
            },
            Registe: {
              title: "",
              UserName: "",
              Password: "",
              ConfirmPassword: "",
              PhoneNumber: "",
              vertifycode: "",
              sendCode: "",
              Email: "",
              Zalo: "",
              FACEBOOK: "",
              INS: "",
              isagree: "",
              registe: "",
              cf_UserName: "",
              cf_Password: "",
              cf_PhoneNumber: "",
              cf_Email: "",
              cf_Zalo: "",
              cf_FACEBOOK: "",
              cf_INS: "",
              cf_cofirmInfo: "",
              msgBox_title: "",
              msgBox_success: "",
              msgBox_UserName: "",
              msgBox_Password: "",
              msgBox_wrongPwd: "",
              msgBox_PhoneNumber: "",
              msgBox_vertifycode: "",
              msgBox_isagree: ""
            },
            CellList: {
              grxx: "",
              dlgl: "",
              wjgl: "",
              icd: "",
              fzdl: "",
              fzwj: "",
              p: ""
            },
            IncomeDetails: {
              allincome: "",
              month_date: "",
              month_income: "",
              month_newuser: "",
              month_newagent: ""
            },
            User: {
              userInfo: "",
              back: "",
              nickname_fix: "",
              my_upId: "",
              btn_add: "",
              curr_rate: "",
              month_income: "",
              done_income: "",
              can_getGold: "",
              phone: "",
              email: "",
              zalo: "",
              ins: "",
              facebook: "",
              methods: {
                copyLink_toast: "",
                showFDBL_msgbox_title: "",
                showFDBL_msgbox_msg: "",
                addNew_title: "",
                addNew_confirm0: "",
                addNew_confirm1: "",
                addNew_toast: ""
              },
              logout: "",
              mbTitle: "",
              mbMsg01: "",
              mbMsg02: ""
            },
            PlayerGet: {
              head: "",
              back: "",
              name: "",
              subs: "",
              mylink: "",
              link: "",
              copylink: "",
              myQRcode: "",
              saveQRcode: ""
            },
            AgentManage: {
              agent_counts: "",
              agent_id: "",
              agent_name: "",
              agent_income: "",
              agent_history: "",
              agent_bindtime: "",
              agent_status: ""
            },
            DownPlayers: {
              allplayers: "",
              gameId: "",
              gameAccount: "",
              gameProfitDay: "",
              gameProfitMonth: "",
              gameProfitHistory: "",
              gameRechargeScore: "",
              gameWithdrawScore: "",
              gameTotalProfit: "",
              gameBindTime: "",
              lastLogin: ""
            }
          },
          vi: {
            GameLink: "",
            Login: {
              username: "",
              password: "",
              no_account: "",
              loginBtn: "",
              msgBox_noName: "",
              msgBox_noPsd: "",
              msgTitle: "",
              msgBox_waitConfirm: "",
              msgBox_loseToken: ""
            },
            Index: {
              head_title: {
                v8: "",
                icd: "",
                dps: "",
                am: ""
              },
              back: "",
              dayIncome: "",
              monthIncome: "",
              returnRate: "",
              canWithdraw: "",
              dayNewPlayer: "",
              monthNewPlayer: "",
              dayNewAgent: "",
              monthNewAgent: "",
              messageBoxTitle: "",
              messageBoxMessage: "",
              firstAgent: "",
              secondAgent: ""
            },
            Registe: {
              title: "",
              UserName: "",
              Password: "",
              ConfirmPassword: "",
              PhoneNumber: "",
              vertifycode: "",
              sendCode: "",
              Email: "",
              Zalo: "",
              FACEBOOK: "",
              INS: "",
              isagree: "",
              registe: "",
              cf_UserName: "",
              cf_Password: "",
              cf_PhoneNumber: "",
              cf_Email: "",
              cf_Zalo: "",
              cf_FACEBOOK: "",
              cf_INS: "",
              cf_cofirmInfo: "",
              msgBox_title: "",
              msgBox_success: "",
              msgBox_UserName: "",
              msgBox_Password: "",
              msgBox_wrongPwd: "",
              msgBox_PhoneNumber: "",
              msgBox_vertifycode: "",
              msgBox_isagree: ""
            },
            CellList: {
              grxx: "",
              dlgl: "",
              wjgl: "",
              icd: "",
              fzdl: "",
              fzwj: "",
              p: ""
            },
            IncomeDetails: {
              allincome: "",
              month_date: "",
              month_income: "",
              month_newuser: "",
              month_newagent: ""
            },
            User: {
              userInfo: "",
              back: "",
              nickname_fix: "",
              my_upId: "",
              btn_add: "",
              curr_rate: "",
              month_income: "",
              done_income: "",
              can_getGold: "",
              phone: "",
              email: "",
              zalo: "",
              ins: "",
              facebook: "",
              methods: {
                copyLink_toast: "",
                showFDBL_msgbox_title: "",
                showFDBL_msgbox_msg: "",
                addNew_title: "",
                addNew_confirm0: "",
                addNew_confirm1: "",
                addNew_toast: ""
              },
              logout: "",
              mbTitle: "",
              mbMsg01: "",
              mbMsg02: ""
            },
            PlayerGet: {
              head: "",
              back: "",
              name: "",
              subs: "",
              mylink: "",
              link: "",
              copylink: "",
              myQRcode: "",
              saveQRcode: ""
            },
            AgentManage: {
              agent_counts: "",
              agent_id: "",
              agent_name: "",
              agent_income: "",
              agent_history: "",
              agent_bindtime: "",
              agent_status: ""
            },
            DownPlayers: {
              allplayers: "",
              gameId: "",
              gameAccount: "",
              gameProfitDay: "",
              gameProfitMonth: "",
              gameProfitHistory: "",
              gameRechargeScore: "",
              gameWithdrawScore: "",
              gameTotalProfit: "",
              gameBindTime: "",
              lastLogin: ""
            }
          }
        };
      }
    }
    if (state.Lang === "cn") {
      return state.WordsConfig.cn;
    } else {
      return state.WordsConfig.vi;
    }
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
