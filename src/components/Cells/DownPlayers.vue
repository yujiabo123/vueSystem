<template>
  <div id="downplayers">
    <div style="height:10px;"></div>
    <mt-cell :title="word_region.allplayers" :value="1"></mt-cell>
    <div style="height:10px;"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="gameId" :label="word_region.gameId" width="100"></el-table-column>
      <el-table-column prop="gameAccount" :label="word_region.gameAccount" width="100"></el-table-column>
      <el-table-column prop="gameProfitDay" :label="word_region.gameProfitDay" width="150"></el-table-column>
      <el-table-column prop="gameProfitMonth" :label="word_region.gameProfitMonth" width="150"></el-table-column>
      <el-table-column prop="gameProfitHistory" :label="word_region.gameProfitHistory" width="150"></el-table-column>
      <el-table-column prop="gameBindTime" :label="word_region.gameBindTime" width="160"></el-table-column>
      <el-table-column prop="lastLogin" :label="word_region.lastLogin" width="160"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { G_SubU } from "../../api/api";
export default {
  data() {
    return {
      word_region: {
        allplayers: "我的玩家总数",
        gameId: "游戏ID",
        gameAccount: "账号",
        gameProfitDay: "今日盈利",
        gameProfitMonth: "本月盈利",
        gameProfitHistory: "历史盈利",
        gameBindTime: "绑定时间",
        lastLogin: "最后游戏时间"
      },
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
</style>