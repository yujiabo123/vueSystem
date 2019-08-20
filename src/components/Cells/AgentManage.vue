<template>
  <div id="agentmanage">
    <mt-cell :title="word_region.agent_counts" :value="dataLength"></mt-cell>
    <div style="height:10px;background-color:#8080804a"></div>
    <el-table :data="table" style="width: 100%" max-height="400">
      <el-table-column fixed prop="agent_id" :label="word_region.agent_id" width="100"></el-table-column>
      <el-table-column prop="agent_name" :label="word_region.agent_name" width="150"></el-table-column>
      <el-table-column prop="agent_income" :label="word_region.agent_income" width="150"></el-table-column>
      <el-table-column prop="agent_history" :label="word_region.agent_history" width="150"></el-table-column>
      <el-table-column prop="agent_bindtime" :label="word_region.agent_bindtime" width="160"></el-table-column>

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
import { G_SubP } from "../../api/api";
export default {
  data() {
    return {
      word_region: {
        agent_counts: "我的代理总数",
        agent_id: "代理ID",
        agent_name: "昵称",
        agent_income: "本月游戏盈利金额",
        agent_history: "历史总游戏盈利",
        agent_bindtime: "绑定时间",
        agent_status: "状态"
      },
      dataLength: "",
      table: []
    };
  },
  beforeCreate() {},
  created() {
    // console.log(this.wordsConfig);
    // if (!this.wordsConfig) {
    //   // this.getConfig();
    //   return;
    // }

    //TODO 获取下线推广列表

    G_SubP(0)
      .then(result => {
        console.log("======================获取代理管理======================");
        console.log(result);
        let d = [];
        d = result;
        this.getSubP(d);
      })
      .catch(err => {
        console.log(err);
      });
  },
  mounted() {},
  methods: {
    getSubP(arr) {
      let data = [];
      for (let it of arr) {
        let agent = {
          agent_id: it.PromoterCode,
          agent_name: it.UserName,
          agent_income: it.MonthAward,
          agent_history: it.Award,
          agent_bindtime: it.BindDate
        };
        this.table.push(agent);
        this.dataLength = this.table.length;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
</style>