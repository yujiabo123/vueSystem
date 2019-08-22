<template>
  <div id="playerget">
    <mt-header :title="this.$store.getters.WordsConfig.PlayerGet.head">
      <router-link to slot="left">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.PlayerGet.back}}</mt-button>
      </router-link>
    </mt-header>
    <div style="padding: 10px 20px; background-color: white">
      <h3>{{ this.$store.getters.WordsConfig.PlayerGet.name}}</h3>
      <span style="font-size:small">{{ this.$store.getters.WordsConfig.PlayerGet.subs }}</span>
    </div>

    <div style="padding: 10px 20px; background-color: white; margin-top:10px;">
      <span>{{ this.$store.getters.WordsConfig.PlayerGet.mylink }}</span>
      <hr />
      <div
        style="width: 100%;text-align: center;margin-top: 10px;padding: 8px;border: solid 1px grey;border-radius: 8px;word-break:break-all;"
      >{{this.$store.getters.WordsConfig.GameLink + this.$store.getters.WordsConfig.PlayerGet.link + this.$store.getters.UserInfo.Pcode}}</div>
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          type="primary"
          style="width:140px;"
          v-clipboard:copy="this.$store.getters.WordsConfig.GameLink + this.$store.getters.WordsConfig.PlayerGet.link + this.$store.getters.UserInfo.Pcode"
          v-clipboard:success="onCopy"
        >{{ this.$store.getters.WordsConfig.PlayerGet.copylink }}</mt-button>
      </div>
    </div>

    <div style="padding: 10px 20px; background-color: white; margin-top:10px;">
      <span>{{ this.$store.getters.WordsConfig.PlayerGet.myQRcode }}</span>
      <hr />
      <div style="width:100%;text-align:-webkit-center;margin-top:10px">
        <div id="qrcode" ref="qrcode" style=" display:none"></div>
        <img :src="imgUrl" alt @click="showPic" />
      </div>
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          style="width:200px;"
          disabled
        >{{ this.$store.getters.WordsConfig.PlayerGet.saveQRcode }}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      imgUrl: ""
    };
  },
  methods: {
    onCopy(e) {
      this.Toast({ position: "bottom", message: "复制成功" });
    },
    showPic() {}
  },
  mounted() {
    let qrCode = new QRCode("qrcode", {
      width: 200,
      height: 200,
      text:
        this.$store.getters.WordsConfig.GameLink +
        this.$store.getters.WordsConfig.PlayerGet.link +
        this.$store.getters.UserInfo.Pcode,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
    let myCanvas = document.getElementsByTagName("canvas");
    this.imgUrl = myCanvas[0].toDataURL("image/png");
  }
};
</script>

<style lang="scss" scoped>
#playerget {
  height: 100%;
  overflow: scroll;
}
</style>