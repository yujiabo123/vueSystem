<template>
  <div id="incomedetails">
    <mt-cell :title="word_region.allincome" value="999.999.999.999"></mt-cell>
    <div style="height:10px;background-color:#8080804a"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="month_date" :label="word_region.month_date" width="100"></el-table-column>
      <el-table-column prop="month_income" :label="word_region.month_income" width="150"></el-table-column>
      <el-table-column prop="month_newuser" :label="word_region.month_newuser" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { G_WordsConfig } from "../../api/api.js";
export default {
  data() {
    return {
      ooo: true,
      word_region: {
        allincome: "",
        month_date: "",
        month_income: "",
        month_newuser: ""
      },
      tableData: [
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        },
        {
          month_date: "08/2019",
          month_income: "999.999.999.999",
          month_newuser: "999"
        }
      ]
    };
  },
  beforeCreate() {},
  created() {
    // console.log("sssssssssssssssss");
    // if (!this.$store.state.WordsConfig.IncomeDetails) {
    //   // this.getConfig();
    //   G_WordsConfig();
    //   console.warn("缺少收入明细页文字");
    //   return;
    // }
    this.word_region = this.$store.state.WordsConfig.IncomeDetails;
  },
  mounted() {
    // getWords();

      // this.word_region = this.$store.state.WordsConfig.IncomeDetails;
  },
  computed: {
    // getWords() {
    //   this.word_region = this.$store.state.WordsConfig.IncomeDetails;
    // }
  },
  watch: {
    // "$store.state.WordsConfig.IncomeDetails": () => {
    //   this.word_region = this.$store.state.WordsConfig.IncomeDetails;
    //   console.log(this.word_region.allincome);
    // },
    // getWords(newVal, oldVal) {
    //   console.log(oldVal);
    //   console.log(newVal);
    //   if (!oldVal) {
    //     // this.getConfig();
    //     console.warn("缺少收入明细页文字");
    //     G_WordsConfig();
    //     return;
    //   } else {
    //     this.word_region = this.$store.state.WordsConfig.IncomeDetails;
    //     console.log(this.word_region.allincome);
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
</style>