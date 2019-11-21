<template>
  <div id="agentmanage">
    <mt-cell :title="this.$store.getters.WordsConfig.AgentManage.agent_counts" :value="dataLength"></mt-cell>
    <div style="height:10px;"></div>
    <div style="position: absolute;top: 58px;left: 0;right: 0;bottom: 0;">
      <el-table
        :data="table"
        style="position:absolute;left:0;top:0;bottom:32px;right:0"
        max-height="100%"
        :empty-text="this.$store.getters.WordsConfig.TBEmptyText"
      >
        <el-table-column
          fixed
          prop="agent_id"
          :label="this.$store.getters.WordsConfig.AgentManage.agent_id"
          width="88"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="agent_name"
          :label="this.$store.getters.WordsConfig.AgentManage.agent_name"
          width="120"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="agent_income"
          :label="this.$store.getters.WordsConfig.AgentManage.agent_income"
          width="150"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="agent_history"
          :label="this.$store.getters.WordsConfig.AgentManage.agent_history"
          width="150"
          header-align="center"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="agent_bindtime"
          :label="this.$store.getters.WordsConfig.AgentManage.agent_bindtime"
          width="160"
          header-align="center"
          align="center"
        ></el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        :hide-on-single-page="showPage"
        background
        :total="5"
        :page-size="1"
        layout="prev, pager, next"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { G_SubP } from "../../api/api";
export default {
  data() {
    return {
      dataLength: 0,
      table: [],
      table_height: 0,
      showPage: false
    };
  },
  beforeCreate() {},
  created() {
    //TODO 获取下线推广列表
    G_SubP(0)
      .then(result => {
        console.log("======================获取代理管理======================");
        console.log(result);
        let d = [];
        d = result;
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
        this.getSubP(d);
      })
      .catch(err => {
        console.log(err);
      });
  },
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
#agentmanage {
  height: 100%;
  overflow: hidden;
}
.pagination {
  position: absolute;
  bottom: 0;
  width: 100%;
  background: white;
}
</style>