<template>
  <div id="index">
    <!-- 标题 -->
    <mt-header :title="head_title">
      <router-link to slot="left" v-if="$route.path !== '/index/cls'">
        <mt-button icon="back" @click.native="$router.back(-1)">返回</mt-button>
      </router-link>
    </mt-header>
    <div id="panel-user">
      <div style="display:flex;height:60px; padding: 0 20px;">
        <div style="width:80%;">
          <h3>昵称（一级代理）</h3>
          <div style="color:grey">一级代理（代理ID：888888）</div>
        </div>
        <div style="width:20%;text-align: center;padding: 10px 0;">
          <img width="44" height="44" src="../assets/img/bg.jpg" alt class />
        </div>
      </div>
      <table title="实时数据" style="padding:0 20px;">
        <tr>
          <td class="word">今日收入</td>
          <td>9999999999</td>
          <td class="word">本月收入</td>
          <td>9999999999</td>
        </tr>
        <tr>
          <td class="word">返点比例</td>
          <td>100%</td>
          <td class="word">可提现金额</td>
          <td>999999999999999</td>
        </tr>
        <tr>
          <td class="word">今日新增玩家</td>
          <td>999999</td>
          <td class="word">本月新增玩家</td>
          <td>999999</td>
        </tr>
        <tr>
          <td class="word">今日新增代理</td>
          <td>99999</td>
          <td class="word">本月新增代理</td>
          <td>099999999</td>
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
import { G_UserInfo, G_WordsConfig, G_ApiConfig } from "../api/api.js";
export default {
  data() {
    return {
      head_title: "V8代理后台"
    };
  },
  methods: {
    /**
     * 1
     */
  },
  created() {
    G_WordsConfig();
    G_ApiConfig();
    //todo 获取token
    if (sessionStorage.getItem("token")) {
      console.log("======================Login======================");
      this.$router.replace("/login");
    } else {
      console.log("======================获取用户信息======================");
      G_UserInfo("001")
        .then(data => {
          //todo 成功获取用户信息
          console.log(data);
        })
        .catch(err => {
          //todo 获取用户信息失败
          console.log(err);
        });
    }
    // this.$store.commit("GetToken");
  },
  mounted() {
    /**
     *
     */
  },
  watch: {
    
    $route(to, from) {
      console.log(to.path);
      switch (to.path) {
        case "/index/cls":
          this.head_title = "V8代理后台";
          break;
        case "/index/icd":
          this.head_title = "收入明细";
          break;
        case "/index/dps":
          this.head_title = "玩家管理";
          break;
        case "/index/am":
          this.head_title = "代理管理";
          break;

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