<template>
  <div id="agentmanage">
    <mt-cell :title="word_region.agent_counts" value="999.999.999.999"></mt-cell>
    <div style="height:10px;background-color:#8080804a"></div>
    <el-table :data="tableData" style="width: 100%" max-height="400">
      <el-table-column fixed prop="agent_id" :label="word_region.agent_id" width="100"></el-table-column>
      <el-table-column prop="agent_name" :label="word_region.agent_name" width="150"></el-table-column>
      <el-table-column prop="agent_income" :label="word_region.agent_income" width="150"></el-table-column>
      <el-table-column prop="agent_history" :label="word_region.agent_history" width="150"></el-table-column>
      <el-table-column prop="agent_bindtime" :label="word_region.agent_bindtime" width="150"></el-table-column>
      <el-table-column prop="agent_status" :label="word_region.agent_status" width="150"></el-table-column>

      <!-- <el-table-column
        v-for="(value,key, index) in word_region"
        :key="index"
        :prop="key"
        :label="value"
         width="150"
      ></el-table-column>-->
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
        agent_counts: "我的代理总数",
        agent_id: "代理ID",
        agent_name: "昵称",
        agent_income: "本月游戏盈利金额",
        agent_history: "历史总游戏盈利",
        agent_bindtime: "绑定时间",
        agent_status: "状态"
      },
      tableData: [
        {
          agent_id: "12312312",
          agent_name: "张三",
          agent_income: "999.999.999",
          agent_history: "999.999.999",
          agent_bindtime: "2019-12-12",
          agent_status: "1"
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
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
</style>