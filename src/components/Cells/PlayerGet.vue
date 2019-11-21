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
    <div class="playerget-content">
      <div style="padding: 10px 20px; background-color: white">
        <h3 style="font-size:2rem">{{ this.$store.getters.UserInfo.UserName}}</h3>
        <span>{{ this.$store.getters.WordsConfig.PlayerGet.subs }}</span>
      </div>
      <div style="height:10px;background-color:#8080804a"></div>
      <div style="padding: 10px 20px; background-color: white;">
        <span>{{ this.$store.getters.WordsConfig.PlayerGet.mylink }}</span>
        <hr />
        <div
          class="input-link"
        >{{this.$store.getters.WordsConfig.GameLink + this.$store.getters.WordsConfig.PlayerGet.link + this.$store.getters.UserInfo.Pcode}}</div>
        <div style="text-align:center;margin-top:10px;">
          <mt-button
            type="primary"
            style="width:140px;font-size:1.4rem"
            v-clipboard:copy="this.$store.getters.WordsConfig.GameLink + this.$store.getters.WordsConfig.PlayerGet.link + this.$store.getters.UserInfo.Pcode"
            v-clipboard:success="onCopy"
          >{{ this.$store.getters.WordsConfig.PlayerGet.copylink }}</mt-button>
        </div>
      </div>
      <div style="height:10px;background-color:#8080804a"></div>
      <div style="padding: 10px 20px; background-color: white;">
        <span>{{ this.$store.getters.WordsConfig.PlayerGet.myQRcode }}</span>
        <hr />
        <div style="text-align:center;margin-top:10px">
          <div id="qrcode" ref="qrcode" style="display:none"></div>
          <div ref="box" style="width: 20rem;position: absolute;left: -1000px;line-height: 0;">
            <img :src="require('../../assets/img/a.jpg')" style="width:100%" alt @load="loadImage0"/>
            <!--width: 9rem;position: absolute;bottom: 3.65rem;right: 1.35rem; -->
            <div style="width: 7.65rem;position: absolute;bottom: 3rem;right: 1.2rem;">
              <img :src="imgUrl" alt @click="showPic" style="width: 100%;" @load="loadImage1" />
            </div>
          </div>
          <img :src="picUrl" style="width:20rem;" />
          <div style="width: 20rem;position: relative;margin: 5px auto;"></div>
          <div style="text-align:center;margin-top:10px;">
            <mt-button
              style="width:200px;font-size:1.4rem"
              disabled
            >{{ this.$store.getters.WordsConfig.PlayerGet.saveQRcode }}</mt-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      imgUrl: "",
      imgUrl1: "",
      loadPics: 0
    };
  },
  methods: {
    onCopy(e) {
      this.Toast({
        position: "bottom",
        message: this.$store.getters.WordsConfig.Index.copySuccess
      });
    },
    showPic() {
      let that = this;
      console.log(this.$refs.box.style);
      html2canvas(this.$refs.box).then(function(canvas) {
        that.imgUrl1 = canvas.toDataURL("image/png");
      });
    },
    loadImage0() {
      this.loadPics += 1;
    },
    loadImage1() {
      this.loadPics += 1;
    },
    base64ToBlob(code) {
      let parts = code.split(";base64,");
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;

      let uInt8Array = new Uint8Array(rawLength);

      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    }
  },
  computed: {
    picUrl() {
      let that = this;
      if (this.loadPics != 2) return "";
      html2canvas(this.$refs.box)
        .then(canvas => {
          console.log(canvas);
          that.imgUrl1 = canvas.toDataURL("image/png");
        })
        .catch(err => {
          that.imgUrl1 = "";
        });
      return this.imgUrl1;
    }
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
    this.imgUrl = myCanvas[0].toDataURL();
  }
};
</script>

<style lang="scss" scoped>
#playerget {
  height: 100%;
  overflow: scroll;
}
.playerget-content {
  overflow: auto;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 40px;
}
.input-link {
  width: 100%;
  text-align: center;
  margin-top: 10px;
  padding: 8px;
  border: solid 1px grey;
  border-radius: 8px;
  word-break: break-all;
  font-size: 1.4rem;
}
span {
  font-size: 1.4rem;
}
</style>