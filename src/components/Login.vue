<template>
  <div id="login">
    <div style="text-align: center">
      <img src="../assets/img/bg.jpg" alt style="width:auto;height:300px; padding: 50px;" />
    </div>
    <div id="form-login">
      <mt-field label="" placeholder="请输入账号" v-model="form_login.account"></mt-field>
      <mt-field label="" placeholder="请输入密码" type="password" v-model="form_login.password"></mt-field>
      <!-- <mt-field label="验证码" v-model="form_login.vertifycode">
        <img src height="45px" width="100px" />
      </mt-field> -->
      <div class="registe">
        <a @click="openPopup">没有账号？点我注册</a>
      </div>

      <mt-button type="primary" size="large" @click="login" class="loginBtn">登录</mt-button>
    </div>

    <mt-popup
      v-model="popupVisible"
      position="right"
      :modal="showModal"
      style="width: 100%; height: 100%"
    >
      <vm-registe @closePopup="closePopup"></vm-registe>
    </mt-popup>
  </div>
</template>

<script>
import Registe from "./Registe.vue";
export default {
  data() {
    return {
      popupVisible: false,
      showModal: false,
      form_login: {
        account: "",
        password: "",
        vertifycode: ""
      }
    };
  },
  methods: {
    login() {
      //客户端验证
      if (!this.form_login.account) {
        this.MessageBox("提示", "请输入账号");
        return;
      }
      if (!this.form_login.password) {
        this.MessageBox("提示", "请输入密码");
        return;
      }
      if (!this.form_login.vertifycode) {
        this.MessageBox("提示", "请输入验证码");
        return;
      }
      //服务器端验证
      this.Indicator.open();
      setTimeout(() => {
        this.$router.push("/index");
        this.Indicator.close();
      }, 3000);
      // this.axios({})
      //   .then(res => {})
      //   .catch(err => {});
    },
    openPopup() {
      this.popupVisible = true;
    },
    closePopup() {
      this.popupVisible = false;
    }
  },
  components: {
    "vm-registe": Registe
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
    background-color: green;
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