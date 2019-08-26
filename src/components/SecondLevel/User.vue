<template>
  <div id="user">
    <mt-header :title="this.$store.getters.WordsConfig.User.userInfo">
      <router-link to slot="left">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.User.back}}</mt-button>
      </router-link>
      <!-- <span slot="left" style="font-size:18px;">
        <mt-button icon="back"></mt-button>个人信息
      </span>-->
    </mt-header>
    <mt-cell
      :title="this.$store.getters.UserInfo.UserName"
      :label="upId"
      is-link
      :value="this.$store.getters.WordsConfig.User.nickname_fix"
    ></mt-cell>
    <div style="height:10px;"></div>
    <div @click="addNew">
      <mt-cell
        :title="this.$store.getters.WordsConfig.User.my_upId"
        :value="this.$store.getters.UserInfo.SupPcode"
      >
        <p v-if="!this.$store.getters.UserInfo.SupPcode">
          <span id="arror-right">{{this.$store.getters.WordsConfig.User.btn_add}}</span>
          <i class="mint-cell-allow-right"></i>
        </p>
      </mt-cell>
    </div>

    <div style="height:10px;"></div>
    <div @click="showFDBL">
      <mt-cell :title="this.$store.getters.WordsConfig.User.curr_rate" value>
        <div>
          <span id="arror-right">{{ (this.$store.getters.IndexTable.Rebates * 100) + '%'}}</span>
          <i class="mint-cell-allow-right"></i>
        </div>
      </mt-cell>
    </div>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.month_income"
      :value="this.$store.getters.IndexTable.MonthUserProfit"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.done_income"
      :value="this.$store.getters.IndexTable.TotalIncome"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.can_getGold"
      :value="this.$store.getters.IndexTable.Cashable"
    ></mt-cell>
    <div style="height:10px;"></div>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.phone"
      :value="this.$store.getters.UserInfo.PhoneNumber"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.email"
      :value="this.$store.getters.UserInfo.Email"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.zalo"
      :value="this.$store.getters.UserInfo.Zalo"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.ins"
      :value="this.$store.getters.UserInfo.INS"
    ></mt-cell>
    <mt-cell
      :title="this.$store.getters.WordsConfig.User.facebook"
      :value="this.$store.getters.UserInfo.FACEBOOK"
    ></mt-cell>
    <div style="height:20px;"></div>
    <mt-button
      type="default"
      size="large"
      @click="logout"
    >{{this.$store.getters.WordsConfig.User.logout}}</mt-button>
    <div style="height:10px;"></div>
  </div>
</template>

<script>
import { G_SupInfo, P_Bind } from "../../api/api.js";
export default {
  data() {
    return {
      user_info: {
        hasUp: false,
        upId: ""
      }
    };
  },
  methods: {
    copyLink() {
      this.Toast({
        message: this.$store.getters.WordsConfig.User.methods.copyLink_toast,
        position: "bottom",
        duration: 1000
      });
    },
    showFDBL() {
      console.log("showFDBL()Click");
      // this.MessageBox({
      //   title: this.$store.getters.WordsConfig.User.methods
      //     .showFDBL_msgbox_title,
      //   message: this.$store.getters.WordsConfig.User.methods
      //     .showFDBL_msgbox_msg
      // });
    },
    logout() {
      //TODO 退出
      this.$store.commit("RemoveToken");
      this.$router.replace("/login");
    },
    vertifyPcode(val) {
      // console.log(val.length + "----------------------");
      //输入为空
      if (val === "" || val == null) {
        this.MessageBox({
          title: this.$store.getters.WordsConfig.User.mbTitle,
          message: this.$store.getters.WordsConfig.User.addNew_plzInputCode
        });
        // console.log('111111');
        return false;
      }
      //输入6位数字
      if (isNaN(val) || val.length !== 7) {
        this.MessageBox({
          title: this.$store.getters.WordsConfig.User.mbTitle,
          message: this.$store.getters.WordsConfig.User.addNew_plzInputNum
        });
        // console.log(2222222);
        return false;
      }
      //输入自己的ID
      if (val === this.$store.getters.UserInfo.Pcode) {
        this.MessageBox({
          title: this.$store.getters.WordsConfig.User.mbTitle,
          message: this.$store.getters.WordsConfig.User.mbMsg01
        });
        // console.log(44444444);
        return false;
      }
      // console.log(55555555);
      return true;
    },
    addNew() {
      console.log("addNew()");
      if (this.$store.getters.UserInfo.SupPcode) {
        return;
      }
      this.MessageBox.prompt(
        this.$store.getters.WordsConfig.User.methods.addNew_title,
        {
          closeOnClickModal: false
        }
      )
        .then(({ value, action }) => {
          console.log(value);
          console.log(action);
          if (action === "confirm") {
            if (!this.vertifyPcode(value)) return;
            //TODO 获取上线代理人信息
            G_SupInfo(value)
              .then(result => {
                console.log(result);
                this.MessageBox.confirm(
                  this.$store.getters.WordsConfig.User.methods.addNew_confirm0 +
                    value +
                    this.$store.getters.WordsConfig.User.methods.addNew_confirm1
                ).then(action => {
                  if (action === "confirm") {
                    //TODO 绑定上线代理接口：绑定上线id
                    P_Bind(value)
                      .then(result => {
                        console.log(result);
                        this.Toast({
                          message: this.$store.getters.WordsConfig.User.methods
                            .addNew_toast,
                          position: "bottom"
                        });
                        this.$store.getters.UserInfo.SupPcode = value;
                      })
                      .catch(err => {
                        console.log(err);
                      });
                  }
                });
              })
              .catch(err => {
                console.log(err);
                this.MessageBox({
                  title: this.$store.getters.WordsConfig.User.mbTitle,
                  message: this.$store.getters.WordsConfig.User.mbMsg02
                });
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
      this.$store.getters.WordsConfig.User = this.wordsConfig.User;
    }
  },
  computed: {
    upId() {
      let nick = `${this.$store.getters.WordsConfig.Index.firstAgent}${this.$store.getters.UserInfo.Pcode}`;
      if (this.$store.getters.UserInfo.SupPcode) {
        nick = `${this.$store.getters.WordsConfig.Index.secondAgent}${this.$store.getters.UserInfo.Pcode}`;
      }
      return nick;
    }
  }
};
</script>

<style lang="scss" scoped>
#user {
  height: 100%;
  background-color: #8080804a;
  overflow: scroll;
}
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