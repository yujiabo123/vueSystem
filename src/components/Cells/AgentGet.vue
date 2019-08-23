<template>
  <div id="agentget">
    <mt-header :title="words_region.head">
      <router-link to slot="left">
        <mt-button icon="back" @click.native="$router.back(-1)">{{words_region.back}}</mt-button>
      </router-link>
    </mt-header>
    <div style="padding: 10px 20px; background-color: white">
      <h3>{{ this.$store.getters.UserInfo.UserName }}</h3>
      <span style="font-size:small">{{ words_region.subs }}</span>
    </div>
    <div style="height:10px;background-color:#8080804a"></div>
    <div
      style="padding: 10px 20px; background-color: white; margin-top:10px;"
    >
      <span>{{ words_region.myId }}</span>
      <span style="float:right">{{ this.$store.getters.UserInfo.Pcode }}</span>
      <hr />
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          type="primary"
          style="width:140px;"
          v-clipboard:copy="this.$store.getters.UserInfo.Pcode"
          v-clipboard:success="onCopy"
        >{{ words_region.copyId }}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      words_region: {
        head: "发展代理",
        back: "返回",
        name: "玩家昵称",
        subs: "您可以通过分享ID给您的下线代理",
        myId: "我的代理ID",
        copyId: "复制ID"
      }
    };
  },
  methods: {
    onCopy(e) {
      this.Toast({ position: "bottom", message: "复制成功" });
    }
  }
};
</script>

<style lang="scss" scoped>
#agentget{
  height: 100%;
  overflow: scroll;
}
</style>