<template>
  <div id="app">
    <!-- 主区域 -->
    <router-view></router-view>
  </div>
</template>

<script>
import { G_WordsConfig, G_ApiConfig } from "./api/api";
export default {
  name: "App",
  data() {
    return {};
  },
  created() {
    console.log("======================获取文字配置文件======================");
    G_WordsConfig();
    console.log("======================获取api配置文件======================");
    G_ApiConfig();
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
