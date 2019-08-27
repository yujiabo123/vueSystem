<template>
  <div id="login">
    <div style="text-align: center">
      <img src="../assets/img/nnn.jpg" alt style="width:200px;height:200px; padding: 50px;" />
    </div>
    <div id="form-login">
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Login.username"
        v-model="form_login.username"
      ></mt-field>
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Login.password"
        type="password"
        v-model="form_login.Password"
      ></mt-field>
      <!-- <mt-field label="验证码" v-model="form_login.vertifycode">
        <img src height="45px" width="100px" />
      </mt-field>-->
      <div class="registe">
        <a @click="openPopup">{{this.$store.getters.WordsConfig.Login.no_account}}</a>
      </div>
      <div style="padding: 0 10px;">
        <mt-button
          type="primary"
          size="large"
          @click="login"
          class="loginBtn"
          :disabled="denyClick"
        >{{this.$store.getters.WordsConfig.Login.loginBtn}}</mt-button>
      </div>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="showModal"
      style="width: 100%; height: 100%;"
    >
      <vm-registe @closePopup="closePopup" @loginAfterRegiste="loginAfterRegiste"></vm-registe>
    </mt-popup>
  </div>
</template>

<script>
import { P_Login, G_UserInfo } from "../api/api.js";
import Registe from "./Registe.vue";
export default {
  data() {
    return {
      popupVisible: false,
      showModal: false,
      denyClick: false,
      form_login: {
        grant_type: "password",
        username: "",
        Password: ""
      }
    };
  },
  methods: {
    login() {
      this.denyClick = true;
      //TODO 客户端验证
      if (!this.form_login.username) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Login.msgTitle,
          this.$store.getters.WordsConfig.Login.msgBox_noName
        );
        this.denyClick = false;
        return;
      }
      if (!this.form_login.Password) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Login.msgTitle,
          this.$store.getters.WordsConfig.Login.msgBox_noPsd
        );
        this.denyClick = false;
        return;
      }
      // if (!this.form_login.vertifycode) {
      //   this.MessageBox("提示", "请输入验证码");
      //   return;
      // }

      console.log("login");
      //TODO 服务器端验证并获取token
      this.Indicator.open();
      P_Login(this.form_login)
        .then(res => {
          console.log(res);
          this.$store.commit("SetToken", res.access_token);
          G_UserInfo()
            .then(result => {
              this.denyClick = false;
              this.Indicator.close();
              //TODO 成功获取用户信息
              console.log(result);
              this.$store.commit("SetUserInfo", result);
              this.$router.replace("/");
            })
            .catch(err => {
              this.denyClick = false;
              this.Indicator.close();
              //TODO 获取用户信息失败
              console.log(err);
              this.MessageBox({
                title: this.$store.getters.WordsConfig.Login.msgTitle,
                message: this.$store.getters.WordsConfig.Login
                  .msgBox_waitConfirm,
                closeOnClickModal: false
              });
            });
        })
        .catch(err => {
          this.denyClick = false;
          this.Indicator.close();
          console.log(err);
          this.Toast({
            position: "bottom",
            message: err.error_description
          });
        });
    },
    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    },
    loginAfterRegiste(username, Password) {
      this.form_login.username = username;
      this.form_login.Password = Password;
      this.login();
    }
  },
  components: {
    "vm-registe": Registe
  },
  created() {
    //TODO 读取当前页面文字显示
    if (this.$route.query.status) {
      if (this.$route.query.status === "lose") {
        this.MessageBox({
          title: this.$store.getters.WordsConfig.Login.msgTitle,
          message: this.$store.getters.WordsConfig.Login.msgBox_loseToken,
          closeOnClickModal: false
        });
      }
    }
  }
};
</script>

<style lang="scss">
#login {
  height: 100%;
  background-color: white;
  background-size: 100% 100%;
  overflow: scroll;
}
#form-login {
  width: 100%;
  .registe {
    margin-top: 20px;
    text-align: center;
    color: red;
  }
  .loginBtn {
    margin-top: 100px;
  }
  .mint-field {
    margin: 0 15px;
    border-bottom: solid 1px rgba(128, 128, 128, 0.39);
  }
}
</style>