import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const state = {
  token: "",
  WordsConfig: {
    GameLink: "www.baidu.com",
    IncomeDetails: {
      allincome: "总收入",
      month_date: "日期",
      month_income: "月收入",
      month_newuser: "月新增玩家"
    },
    User: {
      userInfo: "个人信息",
      back: "返回",
      nickname_fix: "修改昵称密码",
      my_upId: "我的上线ID",
      btn_add: "点击添加",
      curr_rate: "当前返点比例",
      month_income: "本月收入",
      done_income: "已结算收入",
      can_getGold: "可提现金额",
      phone: "手机",
      email: "邮箱",
      zalo: "Zalo",
      ins: "Instagram",
      facebook: "FaceBook",
      methods: {
        copyLink_toast: "已复制",
        showFDBL_msgbox_title: "返点比例",
        showFDBL_msgbox_msg: "一级代理返利：80%<br>二级代理返利：50% ",
        addNew_title: "请输入上线代理ID",
        addNew_confirm0: "确定添加",
        addNew_confirm1: "为你的上线代理?",
        addNew_toast: "添加成功"
      }
    }
  },
  ApiConfig: {
    token: "",
    Register: "",
    Info: "/local/api/Promotion/Info",
    Promotion: "/local/api/Promotion",
    SupInfo: "/local/api/Promotion/SupInfo",
    Bind: "/local/api/Promotion/Bind",
    SubP: "/local/api/Promotion/SubP",
    SubU: "/local/api/Promotion/SubU",
    Profit: "/local/api/Promotion/Profit"
  },
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
  },
  SetIndexTable(state, data) {
    state.IndexTable = data;
  }
};

export default new Vuex.Store({
  state,
  mutations
});
