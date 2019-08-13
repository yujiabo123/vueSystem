<template>
  <div id="downplayers">
    <div style="height:10px;"></div>
    <mt-cell :title="word_region.allplayers" :value="tableData.allplayers"></mt-cell>
    <div style="height:10px;"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="gameId" :label="word_region.gameId" width="100"></el-table-column>
      <el-table-column prop="gameAccount" :label="word_region.gameAccount" width="100"></el-table-column>
      <el-table-column prop="gameProfitDay" :label="word_region.gameProfitDay" width="150"></el-table-column>
      <el-table-column prop="gameProfitMonth" :label="word_region.gameProfitMonth" width="150"></el-table-column>
      <el-table-column prop="gameProfitHistory" :label="word_region.gameProfitHistory" width="150"></el-table-column>
      <el-table-column prop="gameBindTime" :label="word_region.gameBindTime" width="100"></el-table-column>
      <el-table-column prop="lastLogin" :label="word_region.lastLogin" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
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
      tableData: [
        {
          allplayers: "999.999",
          gameId: "123123",
          gameAccount: "a******k",
          gameProfitDay: "999.999.999.999",
          gameProfitMonth: "999.999.999.999",
          gameProfitHistory: "999.999.999.999",
          gameBindTime: "2019-12-12",
          lastLogin: "2019-12-12"
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>