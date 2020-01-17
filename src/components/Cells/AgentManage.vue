<template>
  <div id="agentmanage">
    <mt-cell :title="this.$store.getters.WordsConfig.AgentManage.agent_counts" :value="this.$store.state.IndexTable.SubPromoter"></mt-cell>
    <div style="height:10px;"></div>
    <div style="position: absolute;top: 58px;left: 0;right: 0;bottom: 26px;">
      <el-table
        :data="table"
        height="100%"
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
        small
        class="pagination"
        background
        :total="this.$store.state.IndexTable.SubPromoter"
        :page-size="50"
        layout="prev, pager, next"
        @current-change="getNextPage"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { G_SubP } from "../../api/api";
export default {
  data() {
    return {
      table: [],
      table_height: 0
    };
  },
  created() {
    //TODO 获取下线推广列表
    this.getData(0);
  },
  methods: {
    getData(page) {
      G_SubP(page)
        .then(result => {
          console.log(
            "======================获取代理管理======================"
          );
          let d = [];
          d = result;
          this.getSubP(d);
        })
        .catch(err => {
          console.log(err);
        });
    },
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
      }
    },
    getNextPage(currPage) {
      this.table = [];
      this.getData(currPage - 1);
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
  bottom: -26px;
  width: 100%;
  background: white;
  text-align: center;
}
</style>