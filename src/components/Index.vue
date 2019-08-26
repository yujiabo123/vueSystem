<template>
  <div id="index">
    <!-- 标题 -->
    <mt-header :title="title">
      <router-link to slot="left" v-if="$route.path !== '/index/cls'">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.Index.back}}</mt-button>
      </router-link>
    </mt-header>
    <div id="panel-user">
      <div style="display:flex;height:60px; padding: 0 20px;">
        <div style="width:80%;">
          <h3>{{this.$store.getters.UserInfo.UserName }}</h3>
          <div style="color:grey">{{upId}}</div>
        </div>
        <div style="width:20%;text-align: center;padding: 10px 0;">
          <img width="44" height="44" src="../assets/img/nnn.jpg" alt class />
        </div>
      </div>
      <table style="padding:0 20px;">
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayIncome}}</td>
          <td>{{this.$store.getters.IndexTable.TodayUserProfit}}</td>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthIncome}}</td>
          <td>{{this.$store.getters.IndexTable.MonthUserProfit}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.returnRate}}</td>
          <td>{{ (this.$store.getters.IndexTable.Rebates * 100) + '%'}}</td>
          <td class="word">{{this.$store.getters.WordsConfig.Index.canWithdraw}}</td>
          <td>{{this.$store.getters.IndexTable.Cashable}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayNewPlayer}}</td>
          <td>{{this.$store.getters.IndexTable.TodayAddUser}}</td>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthNewPlayer}}</td>
          <td>{{this.$store.getters.IndexTable.MonthAddUser}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayNewAgent}}</td>
          <td>{{this.$store.getters.IndexTable.TodayAddPromoter}}</td>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthNewAgent}}</td>
          <td>{{this.$store.getters.IndexTable.MonthAddPromoter}}</td>
        </tr>
      </table>
    </div>
    <div style="height:10px;"></div>
    <div id="routeView">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import {
  G_UserInfo,
  G_WordsConfig,
  G_ApiConfig,
  G_Promotion
} from "../api/api.js";
export default {
  data() {
    return {
      //初始默认配置
      WordsConfig: {
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
          gameBindTime: "",
          lastLogin: ""
        }
      },
      UserInfo: {
        UserName: "",
        PhoneNumber: "",
        Zalo: "",
        FACEBOOK: "",
        INS: "",
        SupPcode: "",
        Pcode: ""
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
  },
  methods: {
    getData() {
      G_Promotion()
        .then(result => {
          console.log(result);
          this.$store.commit("SetIndexTable", result);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    if (!this.$store.getters.WordsConfig) {
      this.$store.commit("SetWordsConfig", this.WordsConfig);
    }
    if (!this.$store.getters.UserInfo) {
      this.$store.commit("SetUserInfo", this.UserInfo);
    }
    if (!this.$store.getters.IndexTable) {
      this.$store.commit("SetIndexTable", this.IndexTable);
    }
    //TODO 获取token
    if (!this.$store.getters.token) {
      console.log("======================Login======================");
      this.$router.replace("/login");
    } else {
      console.log("======================获取用户信息======================");
      G_UserInfo()
        .then(result => {
          //TODO 成功获取用户信息
          console.log(result);
          this.$store.commit("SetUserInfo", result);
        })
        .catch(err => {
          //TODO 获取用户信息失败
          console.log(err);
          this.MessageBox({
            title: this.$store.getters.WordsConfig.Index.messageBoxTitle,
            message: this.$store.getters.WordsConfig.Index.messageBoxMessage,
            closeOnClickModal: false
          });
          this.$router.replace("/login?status=lose");
        });
      console.log(
        "======================获取获取实时显示数据======================"
      );
      this.getData();
      setInterval(() => {
        //TODO 调用接口
        this.getData();
      }, 60000);
    }
  },
  computed: {
    upId() {
      let nick = `${this.$store.getters.WordsConfig.Index.firstAgent}${this.$store.getters.UserInfo.Pcode}`;
      if (this.$store.getters.UserInfo.SupPcode) {
        nick = `${this.$store.getters.WordsConfig.Index.secondAgent}${this.$store.getters.UserInfo.Pcode}`;
      }
      return nick;
    },
    title() {
      switch (this.$route.path) {
        case "/index/cls":
          return this.$store.getters.WordsConfig.Index.head_title.v8;
        case "/index/icd":
          return this.$store.getters.WordsConfig.Index.head_title.icd;
        case "/index/dps":
          return this.$store.getters.WordsConfig.Index.head_title.dps;
        case "/index/am":
          return this.$store.getters.WordsConfig.Index.head_title.am;
        default:
          break;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#index {
  height: 100%;
  min-height: 300px;
  background-color: #8080804a;
}
#panel-user {
  width: 100%;
  height: auto;
  overflow: hidden;
  background-color: white;
  // text-align: center;
}

#panel-data {
  height: 100%;
  overflow: auto;
  border-top: solid 1px #26a2ff96;

  display: grid;
  grid-template-columns: 20% 20% 20% 20% 20%;
  grid-template-rows: 50px 50px 50px 50px 50px;
}

table {
  width: 100%;
  tr {
    width: 100%;
    .word {
      color: grey;
    }
    td {
      width: 25%;
      font-size: small;
    }
  }
}

.item {
  font-size: 1rem;
  text-align: center;
  border: 1px solid #e5e4e9;
  padding: 8px;
}

#routeView {
  overflow: auto;
  position: absolute;
  min-height: 400px;
  top: 188px;
  bottom: 0;
  left: 0;
  right: 0;
}
#cellList {
  .mint-cell {
    border-bottom: solid 1px rgba(128, 128, 128, 0.39);
    div {
      font-weight: bold;
    }
    span {
      margin-left: 20px;
      border-radius: 6px;
      padding: 2px 16px;
      background-color: orange;
      width: 50px;
      height: 100%;
      color: white;
      font-weight: normal;
    }
  }
}

</style>