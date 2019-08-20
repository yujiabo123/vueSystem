<template>
  <div id="user">
    <mt-header :title="words_region.userInfo">
      <router-link to slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">{{words_region.back}}</mt-button>
      </router-link>
      <!-- <span slot="left" style="font-size:18px;">
        <mt-button icon="back"></mt-button>个人信息
      </span>-->
    </mt-header>
    <mt-cell
      :title="this.$store.state.UserInfo.UserName"
      :label="upId"
      is-link
      :value="words_region.nickname_fix"
    ></mt-cell>
    <div style="height:10px;"></div>
    <mt-cell :title="words_region.my_upId" :value="this.$store.state.UserInfo.SupPcode">
      <p v-if="!this.$store.state.UserInfo.SupPcode" @click="addNew">
        <span id="arror-right">{{words_region.btn_add}}</span>
        <i class="mint-cell-allow-right"></i>
      </p>
    </mt-cell>
    <div style="height:10px;"></div>
    <mt-cell :title="words_region.curr_rate" value>
      <div @click="showFDBL">
        <span id="arror-right">{{this.$store.state.IndexTable.Rebates}}</span>
        <i class="mint-cell-allow-right"></i>
      </div>
    </mt-cell>
    <mt-cell
      :title="words_region.month_income"
      :value="this.$store.state.IndexTable.MonthUserProfit"
    ></mt-cell>
    <mt-cell :title="words_region.done_income" :value="this.$store.state.IndexTable.TotalIncome"></mt-cell>
    <mt-cell :title="words_region.can_getGold" :value="this.$store.state.IndexTable.Cashable"></mt-cell>
    <div style="height:10px;"></div>
    <mt-cell :title="words_region.phone" :value="this.$store.state.UserInfo.PhoneNumber"></mt-cell>
    <mt-cell :title="words_region.email" :value="this.$store.state.UserInfo.Email"></mt-cell>
    <mt-cell :title="words_region.zalo" :value="this.$store.state.UserInfo.Zalo"></mt-cell>
    <mt-cell :title="words_region.ins" :value="this.$store.state.UserInfo.INS"></mt-cell>
    <mt-cell :title="words_region.facebook" :value="this.$store.state.UserInfo.FACEBOOK"></mt-cell>
    <div style="height:20px;"></div>
    <mt-button type="default" size="large" @click="logout">退出</mt-button>
    <div style="height:10px;"></div>
  </div>
</template>

<script>
import { G_SupInfo, P_Bind } from "../../api/api.js";
export default {
  data() {
    return {
      words_region: {
        userInfo: "个人信息",
        back: "返回",
        nickname_fix: "修改昵称密码",
        my_upId: "我的上线ID",
        btn_add: "点击添加",
        curr_rate: "当前返点比例",
        month_income: "本日预估收入",
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
          showFDBL_msgbox_msg: "一级代理返利：80%<br>二级代理返利：10%",
          addNew_title: "请输入上线代理ID",
          addNew_confirm0: "确定添加",
          addNew_confirm1: "为你的上线代理?",
          addNew_toast: "添加成功"
        }
      },
      user_info: {
        nickName: "这里是用户昵称",
        label: "一级代理（代理ID：888888）",
        hasUp: false,
        upId: "",
        curr_rate: "80%",
        month_income: "999.999.999.999",
        done_income: "999.999.999.999",
        can_getGold: "999.999.999.999",
        phone: "1234567890",
        email: "abc123@google.com",
        zalo: "1234567890",
        ins: "1234567890",
        facebook: "1234567890"
      }
    };
  },
  methods: {
    copyLink() {
      this.Toast({
        message: this.words_region.methods.copyLink_toast,
        position: "bottom",
        duration: 1000
      });
    },
    showFDBL() {
      console.log("showFDBL()Click");
      this.MessageBox({
        title: this.words_region.methods.showFDBL_msgbox_title,
        message: this.words_region.methods.showFDBL_msgbox_msg
      });
    },
    logout() {
      //TODO 退出
      this.$store.commit("RemoveToken");
      this.$router.replace("/login");
    },
    addNew() {
      console.log("addNew()");
      this.MessageBox.prompt(this.words_region.methods.addNew_title, {
        closeOnClickModal: false
      })
        .then(({ value, action }) => {
          console.log(value);
          console.log(action);
          if (action === "confirm") {
            if (value === this.$store.state.UserInfo.Pcode) {
              this.MessageBox({ title: "提示", message: "不能添加自己为上线" });
              return;
            }
            //TODO 获取上线代理人信息
            G_SupInfo(value)
              .then(result => {
                console.log(result);
                this.MessageBox.confirm(
                  this.words_region.methods.addNew_confirm0 +
                    value +
                    this.words_region.methods.addNew_confirm1
                ).then(action => {
                  if (action === "confirm") {
                    //TODO 绑定上线代理接口：绑定上线id
                    P_Bind(value)
                      .then(result => {
                        console.log(result);
                        this.Toast({
                          message: this.words_region.methods.addNew_toast,
                          position: "bottom"
                        });
                        this.$store.state.UserInfo.SupPcode = value;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                });
              })
              .catch(err => {
                console.log(err);
                this.MessageBox({ title: "提示", message: "不存在此推广码" });
              });
          }
        })
        .catch(cancel => {});
    }
  },
  created() {
    //TODO 用户信息接口

    //
    this.user_info.hasUp = false;
    this.user_info.upId = "";
    if (this.wordsConfig) {
      // console.log(this.wordsConfig.User);
      this.words_region = this.wordsConfig.User;
    }
  },
  computed: {
    upId() {
      let nick = `一级代理（代理ID：${this.$store.state.UserInfo.Pcode}）`;
      if (this.$store.state.UserInfo.SupPcode) {
        nick = `二级代理（代理ID：${this.$store.state.UserInfo.Pcode}）`;
      }
      return nick;
    }
  }
};
</script>

<style lang="scss" scoped>
.personal-link {
  width: 150px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: x-small;
}

#arror-right {
  margin-right: 24px;
}
</style>