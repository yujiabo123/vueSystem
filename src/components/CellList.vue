<template>
  <div>
    <mt-cell label is-link :to="data.link_to" v-for="data in getCellList" :key="data.key">
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
    return {};
  },
  computed: {
    getCellList() {
      return [
        {
          icon: grxx,
          title: this.$store.getters.WordsConfig.CellList.grxx,
          link_to: "/user",
          detail: "",
          show: false
        },
        {
          icon: dlgl,
          title: this.$store.getters.WordsConfig.CellList.dlgl,
          link_to: "/index/am",
          detail: `${this.$store.state.IndexTable.SubPromoter}${this.$store.getters.WordsConfig.CellList.p}`,
          show: true
        },
        {
          icon: wjgl,
          title: this.$store.getters.WordsConfig.CellList.wjgl,
          link_to: "/index/dps",
          detail: `${this.$store.state.IndexTable.SubUser}${this.$store.getters.WordsConfig.CellList.p}`,
          show: true
        },
        {
          icon: icd,
          title: this.$store.getters.WordsConfig.CellList.icd,
          link_to: "/index/icd",
          detail: "",
          show: false
        },
        {
          icon: fzdl,
          title: this.$store.getters.WordsConfig.CellList.fzdl,
          link_to: "/ag",
          detail: "",
          show: false
        },
        {
          icon: fzdl,
          title: this.$store.getters.WordsConfig.CellList.fzwj,
          link_to: "/pg",
          detail: "",
          show: false
        }
      ];
    }
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