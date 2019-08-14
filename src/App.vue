<template>
  <div id="app">
    <!-- 主区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  beforeCreate() {
    //TODO 获取调用
    // G_WordsConfig();
    // G_ApiConfig();
    // this.$store.commit()
    // this.getConfig();
  },
  mounted() {}
};
</script>

<style lang="scss">
#app {
  background-color: #8080804a;
}
@import url(./assets/css/site.scss);
</style>
