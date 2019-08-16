<template>
  <div id="playerget">
    <mt-header :title="words_region.head">
      <router-link to slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">{{words_region.back}}</mt-button>
      </router-link>
    </mt-header>
    <div style="padding: 10px 20px; background-color: white">
      <h3>{{ words_region.name}}</h3>
      <span style="font-size:small">{{ words_region.subs }}</span>
    </div>

    <div style="padding: 10px 20px; background-color: white; margin-top:10px;">
      <span>{{ words_region.mylink }}</span>
      <hr />
      <div
        style="width: 100%;text-align: center;margin-top: 10px;padding: 8px;border: solid 1px grey;border-radius: 8px;"
      >{{ words_region.link }}</div>
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          type="primary"
          style="width:140px;"
          v-clipboard:copy="words_region.link"
          v-clipboard:success="onCopy"
        >{{ words_region.copylink }}</mt-button>
      </div>
    </div>

    <div
      style="height: -webkit-fill-available;padding: 10px 20px; background-color: white; margin-top:10px;"
    >
      <span>{{ words_region.myQRcode }}</span>
      <hr />
      <div style="width:100%;text-align:-webkit-center;margin-top:10px">
        <div id="qrcode" ref="qrcode" style=" display:none"></div>
        <img :src="imgUrl" alt />
      </div>
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          style="width:200px;"
          disabled
        >{{ words_region.saveQRcode }}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      imgUrl: "",
      words_region: {
        head: "发展玩家",
        back: "返回",
        name: "玩家昵称",
        subs: "您可以通过分享二维码或链接的方式发展您的下线玩家",
        mylink: "我的邀请链接",
        link: "http://www.baidu.com",
        copylink: "复制链接",
        myQRcode: "我的邀请二维码",
        saveQRcode: "长按二维码保存图片"
      }
    };
  },
  methods: {
    onCopy(e) {
      this.Toast({ position: "bottom", message: "复制成功" });
    },
  },
  mounted() {
    let qrCode = new QRCode("qrcode", {
      width: 200, //二维码宽度，单位像素
      height: 200, //二维码高度，单位像素
      text: "http://www.baidu.com", //二维码中的内容
      colorDark: "#000000", //前景色
      colorLight: "#ffffff", //背景色
      correctLevel: QRCode.CorrectLevel.H //容错级别，
    });
    let myCanvas = document.getElementsByTagName("canvas");
    this.imgUrl = myCanvas[0].toDataURL("image/png");
  }
};
</script>

<style lang="scss" scoped>
</style>