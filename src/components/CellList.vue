<template>
  <div>
    <mt-cell label is-link :to="data.link_to" v-for="data in cell_list" :key="data.key">
      <div slot="title">
        <img slot="icon" :src="data.icon" width="auto" height="24" />
        {{ data.title }}
        <span v-show="data.show">{{ data.detail }}</span>
      </div>
    </mt-cell>
  </div>
</template>

<script>
import dlgl from "../assets/img/dlgl.png";
import fzdl from "../assets/img/fzdl.png";
import grxx from "../assets/img/grxx.png";
import icd from "../assets/img/icd.png";
import wjgl from "../assets/img/wjgl.png";
export default {
  data() {
    return {
      cell_list: [
        {
          icon: grxx,
          title: "个人信息",
          link_to: "/user",
          detail: "",
          show: false
        },
        {
          icon: dlgl,
          title: "代理管理",
          link_to: "/index/am",
          detail: "999人",
          show: true
        },
        {
          icon: wjgl,
          title: "玩家管理",
          link_to: "/index/dps",
          detail: "9999人",
          show: true
        },
        {
          icon: icd,
          title: "收入明细",
          link_to: "/index/icd",
          detail: "",
          show: false
        },
        { icon: fzdl, title: "发展代理", link_to: "/ag", detail: "", show: false },
        { icon: fzdl, title: "发展玩家", link_to: "/pg", detail: "", show: false }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.mint-cell {
  border-bottom: solid 1px rgba(128, 128, 128, 0.39);
  img {
    padding: 0 10px;
  }
  div {
    font-weight: bold;
  }
  span {
    margin-left: 20px;
    border-radius: 6px;
    padding: 2px 16px;
    background-color: orangered;
    width: 50px;
    height: 100%;
    color: white;
    font-weight: normal;
  }
}
</style>