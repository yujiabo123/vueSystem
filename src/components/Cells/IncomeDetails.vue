<template>
  <div id="incomedetails">
    <mt-cell :title="word_region.allincome" :value="allincome"></mt-cell>
    <div style="height:10px;background-color:#8080804a"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="month_date" :label="word_region.month_date" width="100"></el-table-column>
      <el-table-column prop="month_income" :label="word_region.month_income" width="150"></el-table-column>
      <el-table-column prop="month_newuser" :label="word_region.month_newuser" width="100"></el-table-column>
      <el-table-column prop="month_newagent" :label="word_region.month_newagent" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { G_WordsConfig, G_Profit } from "../../api/api.js";
export default {
  data() {
    return {
      word_region: {
        allincome: "",
        month_date: "",
        month_income: "",
        month_newuser: "",
        month_newagent: ""
      },
      tableData: [],
      allincome: 0
    };
  },
  methods: {
    getData() {}
  },
  created() {
    // console.log("sssssssssssssssss");
    // if (!this.$store.state.WordsConfig.IncomeDetails) {
    //   // this.getConfig();
    //   G_WordsConfig();
    //   console.warn("缺少收入明细页文字");
    //   return;
    // }
    this.word_region = this.$store.state.WordsConfig.IncomeDetails;
    G_Profit()
      .then(res => {
        console.log(res);
        let d = [];
        for (const it of res) {
          let detail = {
            month_date: it.Month,
            month_income: it.Award,
            month_newuser: it.AddUser,
            month_newagent: it.AddPro
          };
          this.allincome += it.Award;
          d.push(detail);
        }
        this.tableData = d;
      })
      .catch(err => {
        console.log(err);
      });
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