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
      <mt-button icon="more" slot="right" @click="changeLang"></mt-button>
    </mt-header>
    <div id="panel-user">
      <div style="display:flex; padding: 0 6px;">
        <div style="width: 80%;display: flex;">
          <h3 style="width: fit-content;font-size:1.8rem">{{this.$store.getters.UserInfo.UserName }}</h3>&nbsp;&nbsp;&nbsp;
          <div style="color:grey;width: fit-content;font-size:1.6rem">{{upId}}</div>
        </div>
      </div>
      <table style="padding:0 6px;">
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayIncome}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.TodayUserProfit}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthIncome}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.MonthUserProfit}}</td>
        </tr>
        <!-- <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayIncome}}</td>
          <td>{{this.$store.getters.IndexTable.TodayUserProfit}}</td>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthIncome}}</td>
          <td>{{this.$store.getters.IndexTable.MonthUserProfit}}</td>
        </tr>-->
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.returnRate}}</td>
          <td class="fl">{{ (this.$store.getters.IndexTable.Rebates * 100) + '%'}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.canWithdraw}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.Cashable}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayNewPlayer}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.TodayAddUser}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthNewPlayer}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.MonthAddUser}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.dayNewAgent}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.TodayAddPromoter}}</td>
        </tr>
        <tr>
          <td class="word">{{this.$store.getters.WordsConfig.Index.monthNewAgent}}</td>
          <td class="fl">{{this.$store.getters.IndexTable.MonthAddPromoter}}</td>
        </tr>
      </table>
    </div>
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
      },
      mission: null
    };
  },
  methods: {
    changeLang() {
      this.$store.commit("ChangeLang");
    },
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
  destroyed() {
    console.log("die-=-=-=-=-=-=-=-=-");
    clearInterval(this.mission);
  },
  created() {
    // if (!this.$store.getters.WordsConfig) {
    //   this.$store.commit("SetWordsConfig", this.WordsConfig);
    // }
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
          console.log(result);
          this.$store.commit("SetUserInfo", result);
        })
        .catch(err => {
          console.log(err);
          this.$router.replace("/login?status=lose");
        });
      console.log(
        "======================获取获取实时显示数据======================"
      );
      this.getData();
      this.mission = setInterval(() => {
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
  height: 15.8rem;
  overflow: auto;
  background-color: white;
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
    .word {
      color: grey;
    }
    td {
      font-size: 1.3rem;
    }
  }
}

.item {
  font-size: 1rem;
  text-align: center;
  border: 1px solid #e5e4e9;
  padding: 8px;
}
.fl {
  float: right;
}

#routeView {
  overflow: auto;
  position: absolute;
  min-height: 400px;
  top: 20.8rem;
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