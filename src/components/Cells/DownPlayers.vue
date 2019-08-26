<template>
  <div id="downplayers">
    <mt-cell
      :title="this.$store.getters.WordsConfig.DownPlayers.allplayers"
      :value="tableData.length"
    ></mt-cell>
    <div style="height:10px;"></div>
    <div style="position: absolute;top: 58px;left: 0;right: 0;bottom: 0;">
      <el-table :data="tableData" style height="100%" max-height="100%">
        <el-table-column
          fixed
          prop="gameId"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameId"
          header-align="center"
          align="center"
          width="88"
        ></el-table-column>
        <el-table-column
          prop="gameAccount"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameAccount"
          width="100"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameProfitDay"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitDay"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameProfitMonth"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitMonth"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameProfitHistory"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameProfitHistory"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="gameBindTime"
          :label="this.$store.getters.WordsConfig.DownPlayers.gameBindTime"
          width="160"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="lastLogin"
          :label="this.$store.getters.WordsConfig.DownPlayers.lastLogin"
          width="160"
          header-align="center"
          align="center"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { G_SubU } from "../../api/api";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.getData(0);
  },
  methods: {
    getData(id) {
      G_SubU(id)
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
#downplayers {
  height: 100%;
  overflow: hidden;

}
</style>