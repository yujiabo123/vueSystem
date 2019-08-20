<template>
  <div id="login">
    <div style="text-align: center">
      <img src="../assets/img/bg.jpg" alt style="width:auto;height:300px; padding: 50px;" />
    </div>
    <div id="form-login">
      <mt-field label placeholder="请输入账号" v-model="form_login.username"></mt-field>
      <mt-field label placeholder="请输入密码" type="password" v-model="form_login.Password"></mt-field>
      <!-- <mt-field label="验证码" v-model="form_login.vertifycode">
        <img src height="45px" width="100px" />
      </mt-field>-->
      <div class="registe">
        <a @click="openPopup">没有账号？点我注册</a>
      </div>
      <div style="padding: 0 10px;">
        <mt-button type="primary" size="large" @click="login" class="loginBtn">登录</mt-button>
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
      form_login: {
        grant_type: "password",
        username: "",
        Password: ""
      }
    };
  },
  methods: {
    login() {
      //TODO 客户端验证
      if (!this.form_login.username) {
        this.MessageBox("提示", "请输入账号");
        return;
      }
      if (!this.form_login.Password) {
        this.MessageBox("提示", "请输入密码");
        return;
      }
      // if (!this.form_login.vertifycode) {
      //   this.MessageBox("提示", "请输入验证码");
      //   return;
      // }

      console.log("登录");
      //TODO 服务器端验证并获取token
      this.Indicator.open();
      P_Login(this.form_login)
        .then(res => {
          this.Indicator.close();
          console.log(res);
          this.$store.commit("SetToken", res.access_token);
          G_UserInfo()
            .then(result => {
              //TODO 成功获取用户信息
              console.log(result);
              this.$store.commit("SetUserInfo", result);
              this.$router.replace("/");
            })
            .catch(err => {
              //TODO 获取用户信息失败
              console.log(err);
              //TODO 等待审核通过
              this.MessageBox({
                title: "提示",
                message: "等待审核人员认证...",
                closeOnClickModal: false
              });
            });
        })
        .catch(err => {
          this.Indicator.close();
          console.log(err);
          this.Toast({
            position: "bottom",
            message: "账号或密码错误"
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
          title: "提示",
          message: "登录失效",
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
  // background: url(../assets/img/bg2.jpg) no-repeat;
  background-size: 100% 100%;
}
#form-login {
  width: 100%;
  height: 100%;
  // padding: 100px 50px;
  // background-color: transparent;
  .registe {
    margin-top: 20px;
    text-align: center;
    color: red;
  }
  // a {
  //   background-color: transparent;
  //   span {
  //     color: #ff09de;
  //   }
  // }
  .loginBtn {
    margin-top: 100px;
  }
  .mint-field {
    margin: 0 15px;
    border-bottom: solid 1px rgba(128, 128, 128, 0.39);
  }
  // ::-webkit-input-placeholder {
  //   /* Chrome/Opera/Safari */
  //   font-size: 0.2rem;
  //   color: rgb(187, 255, 1);
  // }

  // input {
  //   color: white;
  //   padding-left: 12px;
  //   border-radius: 12px !important;
  //   background-color: #524a4ab3;
  // }
}
</style>