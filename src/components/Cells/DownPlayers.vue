<template>
  <div id="downplayers">
    <mt-header :title="this.$store.getters.WordsConfig.CellList.wjgl">
      <router-link to slot="left">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.User.back}}</mt-button>
      </router-link>
    </mt-header>
    <mt-cell
      :title="this.$store.getters.WordsConfig.DownPlayers.allplayers"
      :value="this.$store.getters.IndexTable.SubUser"
    ></mt-cell>
    <mt-field
      :label="this.$store.getters.WordsConfig.DownPlayers.playerId"
      :placeholder="this.$store.getters.WordsConfig.DownPlayers.plzInputPlayerId"
      v-model="gameId"
    ></mt-field>
    <mt-field
      :label="this.$store.getters.WordsConfig.DownPlayers.gameAccount"
      :placeholder="this.$store.getters.WordsConfig.DownPlayers.plzInputAccount"
      v-model="nickName"
    ></mt-field>
    <div style="width:100%;display:inline-flex;background:white">
      <el-date-picker
        style="margin:4px"
        v-model="startDate"
        type="date"
        :picker-options="pickerOptions0"
        :placeholder="this.$store.getters.WordsConfig.WorkRecord.startDate"
      ></el-date-picker>
      <el-date-picker
        style="margin:4px"
        v-model="endDate"
        type="date"
        :picker-options="pickerOptions0"
        :placeholder="this.$store.getters.WordsConfig.WorkRecord.endDate"
      ></el-date-picker>
      <mt-button
        class="wrBtn"
        type="primary"
        size="small"
        @click="query"
        :disabled="queryBtnDisable"
      >{{queryStr}}</mt-button>
    </div>

    <div style="width:100%;display:inline-flex;background:white;padding:5px 0">
      <mt-button
        class="wrBtn"
        type="primary"
        size="small"
        @click="date0Click"
        :disabled="queryBtnDisable"
      >{{date0}}</mt-button>
      <mt-button
        class="wrBtn"
        type="primary"
        size="small"
        @click="date1Click"
        :disabled="queryBtnDisable"
      >{{date1}}</mt-button>
      <mt-button
        class="wrBtn"
        type="primary"
        size="small"
        @click="date2Click"
        :disabled="queryBtnDisable"
      >{{date2}}</mt-button>
      <mt-button
        class="wrBtn"
        type="primary"
        size="small"
        @click="date3Click"
        :disabled="queryBtnDisable"
      >{{date3}}</mt-button>
    </div>
    <div style="position: absolute;top: 300px;left: 0;right: 0;bottom: 26px;">
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
        <!-- <el-table-column
          prop="gameProfitDay"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitDay"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameProfitMonth"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitMonth"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameProfitHistory"
          sortable
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitHistory"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>-->
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
        :total="this.$store.state.IndexTable.SubUser"
        :page-size="50"
        layout="prev, pager, next"
        @current-change="getNextPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { G_SubU } from "../../api/api";
export default {
  data() {
    return {
      tableData: [],
      gameId: "",
      nickName: "",
      queryBtnDisable: false,
      startDate: "",
      endDate: "",
      queryStr: this.$store.getters.WordsConfig.WorkRecord.query,
      date0: this.$store.getters.WordsConfig.WorkRecord.yesterday,
      date1: this.$store.getters.WordsConfig.WorkRecord.today,
      date2: this.$store.getters.WordsConfig.WorkRecord.lastmonth,
      date3: this.$store.getters.WordsConfig.WorkRecord.thismonth,
      pickerOptions0: {
        disabledDate(time) {
          let curDate = new Date().getTime();
          let two = 60 * 24 * 3600 * 1000;
          let twoMonths = curDate - two;
          return time.getTime() > Date.now() || time.getTime() < twoMonths;
        }
      }
    };
  },
  created() {
    this.getData(0);
  },
  methods: {
    showDate(a) {
      console.log(this.$moment(a).format("YYYY-MM-DD"));
      console.log(a);
    },
    date0Click() {
      this.startDate = this.$moment(new Date())
        .add(-1, "days")
        .format("YYYY-MM-DD");
      this.endDate = this.$moment(new Date())
        .add(-1, "days")
        .format("YYYY-MM-DD");
      this.query();
    },
    date1Click() {
      this.startDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.endDate = this.$moment(new Date()).format("YYYY-MM-DD");
      this.query();
    },
    date2Click() {
      //上月
      this.startDate = this.$moment(new Date())
        .add(-1, "month")
        .startOf("month")
        .format("YYYY-MM-DD");
      this.endDate = this.$moment(new Date())
        .add(-1, "month")
        .endOf("month")
        .format("YYYY-MM-DD");
      this.query();
    },
    date3Click() {
      //本月
      this.startDate = this.$moment(new Date())
        .startOf("month")
        .format("YYYY-MM-DD");
      this.endDate = this.$moment(new Date())
        .endOf("month")
        .format("YYYY-MM-DD");
      this.query();
    },
    query() {
      this.queryBtnDisable = true;
      this.tableData = [];
      let st = this.startDate == "" ? 0 : new Date(this.startDate).getTime();
      let et = this.endDate == "" ? 0 : new Date(this.endDate).getTime();
      this.getData(
        0,
        st,
        et,
        this.nickName.trim(),
        this.gameId.trim() == "" ? 0 : this.gameId.trim()
      );
    },
    getData(id, st = 0, et = 0, nickname = "", gameid = 0) {
      try {
        this.queryBtnDisable = true;

        G_SubU(id, 50, st, et, nickname, gameid, 0)
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
            this.queryBtnDisable = false;
          })
          .catch(err => {
            this.queryBtnDisable = false;
            console.log(err);
          });
      } catch (error) {
        this.tableData = [];
        this.queryBtnDisable = false;
        console.log(error);
      }
    },
    getNextPage(currPage) {
      this.tableData = [];
      this.getData(currPage - 1);
    }
  }
};
</script>

<style lang="scss" scoped>
#downplayers {
  height: 100%;
  overflow: hidden;
}
.pagination {
  position: absolute;
  bottom: -26px;
  width: 100%;
  background: white;
  text-align: center;
}
.wrBtn {
  width: 25%;
  font-size: small;
  padding: 2px 0;
  margin: 4px;
}
</style>