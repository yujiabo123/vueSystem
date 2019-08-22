<template>
  <div id="incomedetails">
    <mt-cell :title="this.$store.getters.WordsConfig.IncomeDetails.allincome" :value="allincome"></mt-cell>
    <div style="height:10px;background-color:#8080804a"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="month_date" :label="this.$store.getters.WordsConfig.IncomeDetails.month_date" width="100"></el-table-column>
      <el-table-column prop="month_income" :label="this.$store.getters.WordsConfig.IncomeDetails.month_income" width="150"></el-table-column>
      <el-table-column prop="month_newuser" :label="this.$store.getters.WordsConfig.IncomeDetails.month_newuser" width="100"></el-table-column>
      <el-table-column prop="month_newagent" :label="this.$store.getters.WordsConfig.IncomeDetails.month_newagent" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { G_WordsConfig, G_Profit } from "../../api/api.js";
export default {
  data() {
    return {
      tableData: [],
      allincome: 0
    };
  },
  methods: {
    getData() {}
  },
  created() {
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
  }
};
</script>

<style lang="scss" scoped>
</style>