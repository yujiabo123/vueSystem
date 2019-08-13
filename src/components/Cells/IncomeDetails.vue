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
import Vue from "vue";
export default {
  data() {
    return {
      ooo: true,
      word_region: {
        allincome:"总收入",
        month_date: "日期",
        month_income: "月收入",
        month_newuser: "月新增玩家"
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
    console.log(this.wordsConfig);
    if (!this.wordsConfig) {
      // this.getConfig();
      return;
    }
    this.word_region.allincome = this.wordsConfig.IncomeDetails.allincome;
    this.word_region.month_date = this.wordsConfig.IncomeDetails.month_date;
    this.word_region.month_income = this.wordsConfig.IncomeDetails.month_income;
    this.word_region.month_newuser = this.wordsConfig.IncomeDetails.month_newuser;
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>