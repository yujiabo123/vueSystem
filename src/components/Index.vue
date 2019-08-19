<template>
  <div id="index">
    <!-- 标题 -->
    <mt-header :title="title">
      <router-link to slot="left" v-if="$route.path !== '/index/cls'">
        <mt-button icon="back" @click.native="$router.back(-1)">{{words_region.back}}</mt-button>
      </router-link>
    </mt-header>
    <div id="panel-user">
      <div style="display:flex;height:60px; padding: 0 20px;">
        <div style="width:80%;">
          <h3>{{this.$store.state.UserInfo.UserName }}</h3>
          <div style="color:grey">{{upId}}</div>
        </div>
        <div style="width:20%;text-align: center;padding: 10px 0;">
          <img width="44" height="44" src="../assets/img/bg.jpg" alt class />
        </div>
      </div>
      <table style="padding:0 20px;">
        <tr>
          <td class="word">{{words_region.dayIncome}}</td>
          <td>{{this.$store.state.IndexTable.TodayUserProfit}}</td>
          <td class="word">{{words_region.monthIncome}}</td>
          <td>{{this.$store.state.IndexTable.MonthUserProfit}}</td>
        </tr>
        <tr>
          <td class="word">{{words_region.returnRate}}</td>
          <td>{{this.$store.state.IndexTable.Rebates}}</td>
          <td class="word">{{words_region.canWithdraw}}</td>
          <td>{{this.$store.state.IndexTable.Cashable}}</td>
        </tr>
        <tr>
          <td class="word">{{words_region.dayNewPlayer}}</td>
          <td>{{this.$store.state.IndexTable.TodayAddUser}}</td>
          <td class="word">{{words_region.monthNewPlayer}}</td>
          <td>{{this.$store.state.IndexTable.TodayAddPromoter}}</td>
        </tr>
        <tr>
          <td class="word">{{words_region.dayNewAgent}}</td>
          <td>{{this.$store.state.IndexTable.MonthAddUser}}</td>
          <td class="word">{{words_region.monthNewAgent}}</td>
          <td>{{this.$store.state.IndexTable.MonthAddPromoter}}</td>
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
      words_region: {
        head_title: "V8代理后台",
        back: "返回",
        dayIncome: "本日预估收入",
        monthIncome: "本月预估收入",
        returnRate: "返点比例",
        canWithdraw: "可提现金额",
        dayNewPlayer: "今日新增玩家",
        monthNewPlayer: "本月新增玩家",
        dayNewAgent: "今日新增代理",
        monthNewAgent: "本月新增代理"
      }
    };
  },
  methods: {
    /**
     * 1
     */
  },
  created() {
    console.log("======================获取文字配置文件======================");
    G_WordsConfig();
    console.log("======================获取api配置文件======================");
    G_ApiConfig();
    //TODO 获取token
    if (!sessionStorage.getItem("token") && !this.$store.state.token) {
      console.log("======================Login======================");
      this.$router.replace("/login?status=lose");
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
            title: "提示",
            message: "登录失效",
            closeOnClickModal: false
          });
          this.$router.replace("/login?status=lose");
        });

      console.log(
        "======================获取获取实时显示数据======================"
      );
      setInterval(() => {
        //TODO 调用接口
        G_Promotion()
          .then(result => {
            console.log(result);
          })
          .catch(err => {
            console.log(err);
          });
      }, 60000);
    }
    // this.$store.commit("GetToken");
  },
  computed: {
    upId() {
      let nick = `一级代理（代理ID：${this.$store.state.UserInfo.Pcode}）`;
      if (this.$store.state.UserInfo.SupPcode) {
        nick = `二级代理（代理ID：${this.$store.state.UserInfo.Pcode}）`;
      }
      return nick;
    },
    title() {
      switch (this.$route.path) {
        case "/index/cls":
          return (this.head_title = "V8代理后台");
        case "/index/icd":
          return (this.head_title = "收入明细");
        case "/index/dps":
          return (this.head_title = "玩家管理");
        case "/index/am":
          return (this.head_title = "代理管理");
        default:
          return (this.head_title = "V8代理后台");
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#index {
  height: 100%;
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
  margin-top: 8px;
  width: 100%;
  tr {
    width: 100%;
    .word {
      color: grey;
    }
    td {
      width: 25%;
      height: 28px;
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
  height: 100%;
  padding: 0px 0 240px 0;
  overflow: auto;
  background-color: white;
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