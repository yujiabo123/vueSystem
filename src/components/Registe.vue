<template>
  <div id="registe">
    <div id="form-registe" v-show="!isConfirm">
      <mt-header :title="this.$store.getters.WordsConfig.Registe.title">
        <a slot="left" @click="closePopup">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <div id="needField">
        <mt-field
          label
          :placeholder="this.$store.getters.WordsConfig.Registe.UserName"
          v-model="form_registe.UserName"
        ></mt-field>
        <mt-field
          label
          :placeholder="this.$store.getters.WordsConfig.Registe.Password"
          type="password"
          v-model="form_registe.Password"
        ></mt-field>
        <mt-field
          label
          :placeholder="this.$store.getters.WordsConfig.Registe.ConfirmPassword"
          type="password"
          v-model="form_registe.ConfirmPassword"
        ></mt-field>
        <mt-field
          label
          :placeholder="this.$store.getters.WordsConfig.Registe.PhoneNumber"
          v-model="form_registe.PhoneNumber"
          type="number"
        ></mt-field>
        <mt-field
          label
          :placeholder="this.$store.getters.WordsConfig.Registe.vertifycode"
          v-model="form_registe.vertifycode"
        >
          <mt-button type="primary" size="small" @click="sendSms">{{sendBtn}}</mt-button>
          <!-- <mt-button type="primary" size="small" class="countdown" v-if="true">{{ timeCount }}</mt-button> -->
        </mt-field>
      </div>
      <div style="height:10px;background-color:#8080804a;"></div>
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Registe.Email"
        type="email"
        v-model="form_registe.Email"
      ></mt-field>
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Registe.Zalo"
        v-model="form_registe.Zalo"
      ></mt-field>
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Registe.FACEBOOK"
        v-model="form_registe.FACEBOOK"
      ></mt-field>
      <mt-field
        label
        :placeholder="this.$store.getters.WordsConfig.Registe.INS"
        v-model="form_registe.INS"
      ></mt-field>
      <mt-checklist
        class="check"
        v-model="form_registe.isagree"
        :options="[this.$store.getters.WordsConfig.Registe.isagree]"
      ></mt-checklist>
      <mt-button
        class="registe"
        type="primary"
        size="large"
        @click="registe"
      >{{this.$store.getters.WordsConfig.Registe.registe}}</mt-button>
    </div>
    <div id="confirmPanel" v-show="isConfirm">
      <mt-header :title="this.$store.getters.WordsConfig.Registe.title">
        <a slot="left" @click="back">
          <mt-button icon="back"></mt-button>
        </a>
      </mt-header>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_UserName"
        :placeholder="form_registe.UserName"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_Password"
        :placeholder="form_registe.Password"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_PhoneNumber"
        :placeholder="form_registe.PhoneNumber"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_Email"
        :placeholder="form_registe.Email"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_Zalo"
        :placeholder="form_registe.Zalo"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_FACEBOOK"
        :placeholder="form_registe.FACEBOOK"
        disabled
      ></mt-field>
      <mt-field
        :label="this.$store.getters.WordsConfig.Registe.cf_INS"
        :placeholder="form_registe.INS"
        disabled
      ></mt-field>
      <mt-button
        type="primary"
        size="large"
        @click="cofirmInfo"
      >{{this.$store.getters.WordsConfig.Registe.cf_cofirmInfo}}</mt-button>
    </div>
  </div>
</template>

<script>
import { P_Registe, P_SendSms } from "../api/api";
import Utils from "../assets/js/utils";
export default {
  data() {
    return {
      isConfirm: false,
      timeCount: 60,
      countStart: false,
      interval: null,
      form_registe: {
        UserName: "",
        Password: "",
        PhoneNumber: "",
        ConfirmPassword: "",
        vertifycode: "",
        Email: "",
        Zalo: "",
        FACEBOOK: "",
        INS: "",
        isagree: []
      }
    };
  },
  destroyed() {
    clearInterval(this.interval);
  },
  methods: {
    back() {
      this.isConfirm = false;
    },
    closePopup() {
      this.$emit("closePopup");
    },
    sendSms() {
      if (this.sendBtn != this.$store.getters.WordsConfig.Registe.sendCode)
        return;
      if (!this.confirmPhoneNum(this.form_registe.PhoneNumber)) return;
      let t = Utils.encrypt(this.form_registe.PhoneNumber);
      P_SendSms(this.form_registe.PhoneNumber, t)
        .then(result => {
          console.log(result);
          this.Toast({
            position: "bottom",
            message: "验证码发送成功",
            className: "toast_registe"
          });
          this.countStart = true;
          this.interval = setInterval(() => {
            console.log(this.timeCount);
            this.timeCount = this.timeCount - 1;
            if (this.timeCount <= 0) {
              clearInterval(this.interval);
              this.timeCount = 60;
              this.countStart = false;
            }
          }, 1000);
        })
        .catch(err => {
          console.log(err);
          this.Toast({
            position: "bottom",
            message: err.Message,
            className: "toast_registe"
          });
          this.timeCount = 60;
          this.countStart = false;
        });
    },
    resetForm() {
      for (let key of Object.keys(this.form_registe)) {
        console.log(key);
        console.log(this.form_registe[key]);
        this.form_registe[key] = "";
      }
    },
    registeSuccess() {
      this.$emit(
        "loginAfterRegiste",
        this.form_registe.UserName,
        this.form_registe.Password
      );
      // this.resetForm();
    },
    cofirmInfo() {
      P_Registe(this.form_registe)
        .then(result => {
          this.closePopup();
          this.isConfirm = false;
          console.log("success");
          this.Toast({
            position: "bottom",
            message: this.$store.getters.WordsConfig.Registe.msgBox_success
          });
          //注册成功调用接口
          this.registeSuccess();
        })
        .catch(err => {
          console.log(Object.values(err.ModelState)[0][0]);
          this.Toast({
            position: "bottom",
            message: Object.values(err.ModelState)[0][0],
            className: "toast_registe"
          });
        });
    },
    confirmPhoneNum(num) {
      if (num === "" || num == null) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_PhoneNumber
        );
        return false;
      }
      if (isNaN(num) || num.length !== 10) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_phoneLengthOrNum
        );
        return false;
      }
      //TODO 验证手机号注册次数
      //TODO 如果已被注册弹出提示
      // 未注册
      return true;
    },
    confirmName(name) {
      if (name === "" || name == null) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_UserName
        );
        return false;
      }
      let reg = /^[0-9a-zA-Z]+$/;
      if (name.length < 4 || name.length > 14 || !reg.test(name)) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_nameVertify
        );
        return false;
      }
      return true;
    },
    confirmPassword(pwd) {
      if (pwd === "" || pwd == null) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_Password
        );
        return false;
      }
      let reg = /^[0-9a-zA-Z]+$/;
      if (pwd.length < 6 || pwd.length > 14 || !reg.test(pwd)) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_pwdVertify
        );
        return false;
      }
      if (this.form_registe.UserName === pwd) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_sameWithName
        );
        return false;
      }
      return true;
    },
    registe() {
      //客户端验证
      if (!this.confirmName(this.form_registe.UserName)) {
        return;
      }
      if (!this.confirmPassword(this.form_registe.Password)) {
        return;
      }
      if (this.form_registe.Password !== this.form_registe.ConfirmPassword) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_wrongPwd
        );
        return;
      }
      if (!this.confirmPhoneNum(this.form_registe.PhoneNumber)) {
        return;
      }
      if (!this.form_registe.vertifycode) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_vertifycode
        );
        return;
      }
      if (this.form_registe.isagree.length === 0) {
        this.MessageBox(
          this.$store.getters.WordsConfig.Registe.msgBox_title,
          this.$store.getters.WordsConfig.Registe.msgBox_isagree
        );
        return;
      }
      this.isConfirm = true;
    }
  },
  computed: {
    sendBtn() {
      if (!this.countStart) {
        return this.$store.getters.WordsConfig.Registe.sendCode;
      } else {
        return "重新发送（" + this.timeCount + "）";
      }
    }
  }
};
</script>

<style lang="scss">
#registe {
  height: 100%;
  // background: url(../assets/img/bg.jpg) no-repeat;
  background-size: 100% 100%;
  overflow: scroll;
}
.bg {
  width: 100%;
  height: 100%;
  position: absolute;
}

#form-registe {
  width: 100%;
  height: 100%;
  .mint-field {
    margin: 0 15px;
    border-bottom: solid 1px rgba(128, 128, 128, 0.39);

    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      font-size: 1rem;
    }
  }

  #needField {
    .mint-cell-value {
      &::before {
        content: "*";
        color: red;
      }
    }
  }
  .check {
    text-align: center;
    color: red;
  }
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
.toast_registe {
  z-index: 2005 !important;
}

.send {
  display: block;
}

.countdown {
  display: none;
}
</style>