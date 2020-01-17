<template>
  <div id="detaildata">
    <mt-header :title="this.$store.getters.WordsConfig.CellList.wjgl">
      <a slot="left" @click="closePopup">
        <mt-button icon="back"></mt-button>
      </a>
    </mt-header>
    <div style="position: absolute;top: 40px;left: 0;right: 0;bottom: 26px;">
      <el-table
        :data="tableData"
        height="100%"
        :empty-text="this.$store.getters.WordsConfig.TBEmptyText"
      >
        <el-table-column
          fixed
          prop="gameId"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameId"
          header-align="center"
          align="center"
          width="88"
        ></el-table-column>
        <el-table-column
          prop="gameAccount"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameAccount"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="todayRechargeScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.todayRechargeScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="monthRechargeScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.monthRechargeScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastMonthRechargeScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.lastMonthRechargeScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="todayWithdrawScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.todayWithdrawScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="monthWithdrawScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.monthWithdrawScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastMonthWithdrawScore"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.lastMonthWithdrawScore"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>

        <el-table-column
          prop="todayProfit"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.todayProfit"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="monthProfit"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.monthProfit"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastMonthProfit"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.lastMonthProfit"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>

        <!-- <el-table-column
          prop="gameDescribe"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameDescribe"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>-->
        <el-table-column
          prop="gameBindTime"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameBindTime"
          width="160"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastLogin"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.lastLogin"
          width="160"
          header-align="center"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        small
        class="pagination"
        background
        :total="total * 1"
        :page-size="50"
        layout="prev, pager, next"
        :current-page.sync="curPage"
        @current-change="getNextPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { G_SubU } from "../../api/api.js";
export default {
  data() {
    return {
      type: 0,
      tableData: [],
      curPage:0
    };
  },
  props: ["total", "st", "et"],
  mounted() {},
  methods: {
    firData(type) {
      this.type = type;
      this.tableData = [];
      this.getData(0, this.st, this.et);
    },
    closePopup() {
      this.curPage = 0;
      this.$emit("closePopup");
    },
    getNextPage(currPage) {
      this.tableData = [];
      this.getData(currPage - 1, this.st, this.et);
    },
    getData(id, st = 0, et = 0, nickname = "", gameid = 0) {
      G_SubU(id, 50, st, et, nickname, gameid, this.type)
        .then(res => {
          console.log(res);
          for (const it of res) {
            let item = {
              gid: it.Id,
              gameId: it.GameID,
              gameAccount: it.Accounts,
              gameProfitDay: it.TodayProfit,
              gameProfitMonth: it.MonthProfit,
              gameProfitHistory: it.HistoryProfit,
              todayRechargeScore: it.TodayRechargeScore,
              monthRechargeScore: it.MonthRechargeScore,
              lastMonthRechargeScore: it.LastMonthRechargeScore,
              todayWithdrawScore: it.TodayWithdrawScore,
              monthWithdrawScore: it.MonthWithdrawScore,
              lastMonthWithdrawScore: it.LastMonthWithdrawScore,
              todayProfit: it.TodayRechargeScore - it.TodayWithdrawScore,
              monthProfit: it.MonthRechargeScore - it.MonthWithdrawScore,
              lastMonthProfit:
                it.LastMonthRechargeScore - it.LastMonthWithdrawScore,
              gameDescribe: it.gameDescribe,
              gameBindTime: it.BindDate,
              lastLogin: it.LastLogonDate
            };
            this.tableData.push(item);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  position: absolute;
  bottom: -26px;
  width: 100%;
  background: white;
  text-align: center;
}
</style>