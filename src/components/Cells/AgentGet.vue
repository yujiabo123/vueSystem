<template>
  <div id="agentget">
    <mt-header :title="this.$store.getters.WordsConfig.AgentGet.head">
      <router-link to slot="left">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.AgentGet.back}}</mt-button>
      </router-link>
    </mt-header>
    <div style="padding: 10px 20px; background-color: white">
      <h3 style="font-size:2rem">{{ this.$store.getters.UserInfo.UserName }}</h3>
      <span>{{ this.$store.getters.WordsConfig.AgentGet.subs }}</span>
    </div>
    <div style="height:10px;background-color:#8080804a"></div>
    <div style="padding: 10px 20px; background-color: white; margin-top:10px;">
      <span>{{ this.$store.getters.WordsConfig.AgentGet.myId }}</span>
      <span style="float:right">{{ this.$store.getters.UserInfo.Pcode }}</span>
      <hr />
      <div style="text-align:center;margin-top:10px;">
        <mt-button
          type="primary"
          style="width:140px;font-size:1.4rem"
          v-clipboard:copy="this.$store.getters.UserInfo.Pcode"
          v-clipboard:success="onCopy"
        >{{ this.$store.getters.WordsConfig.AgentGet.copyId }}</mt-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    onCopy(e) {
      this.Toast({
        position: "bottom",
        message: this.$store.getters.WordsConfig.Index.copySuccess
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#agentget {
  height: 100%;
  overflow: scroll;
}
span {
  font-size: 1.4rem;
}
</style>