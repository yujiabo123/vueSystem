<template>
  <div id="registe">
    <div id="form-registe" v-show="!isConfirm">
      <mt-header :title="registTitle">
        <a slot="left" @click="closePopup">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <mt-field label placeholder="账号：不小于6位数" v-model="form_registe.account"></mt-field>
      <mt-field label placeholder="密码：不小于6位数的字母+数字" type="password" v-model="form_registe.password"></mt-field>
      <mt-field label placeholder="确认密码" type="password" v-model="form_registe.confirmpassword"></mt-field>
      <mt-field label placeholder="手机号码" v-model="form_registe.phone"></mt-field>
      <mt-field label placeholder="输入手机验证码" v-model="form_registe.vertifycode">
        <mt-button type="primary" size="small">发送验证码</mt-button>
      </mt-field>
      <div style="height:10px;background-color:#8080804a;"></div>
      <mt-field label placeholder="邮箱" type="email" v-model="form_registe.email"></mt-field>
      <mt-field label placeholder="Zalo账号" v-model="form_registe.zalo"></mt-field>
      <mt-field label placeholder="FaceBook账号" v-model="form_registe.facebook"></mt-field>
      <mt-field label placeholder="Instagram账号" v-model="form_registe.instagram"></mt-field>
      <mt-checklist class="check" v-model="form_registe.isagree" :options="['同意我们的服务条款和隐私政策']"></mt-checklist>
      <mt-button class="registe" type="primary" size="large" @click="registe">注册</mt-button>
    </div>
    <div id="confirmPanel" v-show="isConfirm">
      <mt-header :title="registTitle">
        <a slot="left" @click="back">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <mt-field label="账号:" :placeholder="form_registe.account" disabled></mt-field>
      <mt-field label="密码:" :placeholder="form_registe.password" disabled></mt-field>
      <mt-field label="手机号码:" :placeholder="form_registe.phone" disabled></mt-field>
      <mt-field label="邮箱:" :placeholder="form_registe.email" disabled></mt-field>
      <mt-field label="Zalo账号:" :placeholder="form_registe.zalo" disabled></mt-field>
      <mt-field label="FaceBook账号:" :placeholder="form_registe.facebook" disabled></mt-field>
      <mt-field label="Instagram账号:" :placeholder="form_registe.instagram" disabled></mt-field>
      <mt-button type="primary" size="large" @click="closePopup">确认注册</mt-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      registTitle: "注册",
      value: 1,
      isConfirm: false,
      form_registe: {
        account: "",
        password: "",
        phone: "",
        confirmpassword: "",
        vertifycode: "",
        email: "",
        zalo: "",
        facebook: "",
        instagram: "",
        isagree: []
      }
    };
  },
  methods: {
    back() {
      this.isConfirm = false;
    },
    closePopup() {
      this.$emit("closePopup");
    },
    registe() {
      //客户端验证
      if (!this.form_registe.account) {
        this.MessageBox("提示", "请输入账号");
        return;
      }
      if (!this.form_registe.password) {
        this.MessageBox("提示", "请输入密码");
        return;
      }
      if (this.form_registe.password !== this.form_registe.confirmpassword) {
        this.MessageBox("提示", "两次密码输入不一致");
        return;
      }
      if (!this.form_registe.phone) {
        this.MessageBox("提示", "请输入手机号");
        return;
      }
      if (!this.form_registe.vertifycode) {
        this.MessageBox("提示", "请输入验证码");
        return;
      }
      if (this.form_registe.isagree.length === 0) {
        this.MessageBox("提示", "请先同意我们的服务条款和隐私政策");
        return;
      }
      // this.Indicator.open();
      setTimeout(() => {
        // this.Indicator.close();
        // this.$emit("closePopup");
        this.isConfirm = true;
      }, 0);
      //post到服务端
      // this.axios({
      //   method: "post",
      //   url: "/local/api/Account/Register",
      //   data: this.Qs.stringify({
      //     UserName: "111111",
      //     Password: "123456",
      //     ConfirmPassword: "123456"
      //   })
      // })
      // this.axios({
      //   method: "post",
      //   url: "/local/token",
      //   data: this.Qs.stringify({
      //     grant_type: "password",
      //     UserName: "111111",
      //     Password: "123456"
      //   })
      // })
      //   // this.axios({
      //   //   method: "get",
      //   //   url: "/local/api/values/get"
      //   // })
      //   .then(res => {
      //     console.log(this.Qs.parse(res.data));
      //     this.Indicator.close();
      //     //跳转到首页
      //   })
      //   .catch(err => {
      //     console.log(err);

      //     //修改
      //     this.Indicator.close();
      //   });
    }
  }
};
</script>

<style lang="scss">
#registe {
  height: 100%;
  // background: url(../assets/img/bg.jpg) no-repeat;
  background-size: 100% 100%;
}
.bg {
  width: 100%;
  height: 100%;
}

#form-registe {
  width: 100%;
  height: 100%;
  .mint-field {
    margin: 0 15px;
    border-bottom: solid 1px rgba(128, 128, 128, 0.39);
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 0.2rem;
      // color: rgb(187, 255, 1);
    }
  }
  .check {
    text-align: center;
    color: red;
  }
  // padding: 100px 50px;
  // background-color: transparent;
  // a {
  //   background-color: transparent;
  //   span {
  //     color: #ff09de;
  //   }
  // }
  // .check {
  //   label {
  //     margin: 0;
  //   }
  //   a {
  //     background-color: transparent;
  //   }
  // }

  // input {
  //   color: white;
  //   padding-left: 12px;
  //   border-radius: 12px !important;
  //   background-color: #524a4ab3;
  // }
}
#confirmPanel {
  input:disabled {
    background-color: transparent;
  }
  .mint-field {
    margin: 0 15px;
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      padding-left: 20px;
      font-size: 1rem;
      background-color: rgb(250, 250, 250) !important;
      color: black;
    }
  }
  .mint-cell-title {
    width: auto;
    color: grey;
  }
}
</style>