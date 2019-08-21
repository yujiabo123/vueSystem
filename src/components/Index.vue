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
          <img width="44" height="44" src="../assets/img/bg.jpg" alt class />
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
          <td>{{this.$store.getters.IndexTable.Rebates}}</td>
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
    return {};
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
      let nick = `${this.$store.getters.WordsConfig.Index.firstAgent}${this.$store.getters.UserInfo.Pcode}）`;
      if (this.$store.getters.UserInfo.SupPcode) {
        nick = `${this.$store.getters.WordsConfig.Index.secondAgent}${this.$store.getters.UserInfo.Pcode}）`;
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
          return this.$store.getters.WordsConfig.Index.head_title.v8;
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