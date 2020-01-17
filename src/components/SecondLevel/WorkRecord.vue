<template>
  <div id="wordrecord">
    <mt-header :title="this.$store.getters.WordsConfig.WorkRecord.recordTitle">
      <router-link to slot="left">
        <mt-button
          icon="back"
          @click.native="$router.back(-1)"
        >{{this.$store.getters.WordsConfig.User.back}}</mt-button>
      </router-link>
    </mt-header>
    <div style="width:100%;display:inline-flex;background:white">
      <el-date-picker
        style="margin:4px"
        v-model="startDate"
        type="date"
        :placeholder="this.$store.getters.WordsConfig.WorkRecord.startDate"
      ></el-date-picker>
      <el-date-picker
        style="margin:4px"
        v-model="endDate"
        type="date"
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
    <div style="background:white;position:absolute;top:149px;bottom:0;left:0;right:0">
      <table id="dataTB" style="width:100%;text-align:center">
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.newplayer }}：</td>
          <td @click="checkDetail(1)">
            <span
              style="wihth:100%;color: red;text-decoration: underline;"
            >{{ this.tableDate.newplayer }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.activplayer }}：</td>
          <td @click="checkDetail(2)">
            <span
              style="wihth:100%;color: red;text-decoration: underline;"
            >{{ this.tableDate.activplayer }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.newregisteplayer }}：</td>
          <td @click="checkDetail(3)">
            <span
              style="wihth:100%;color: red;text-decoration: underline;"
            >{{ this.tableDate.newregisteplayer }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.newrechargeplayer }}：</td>
          <td @click="checkDetail(4)">
            <span
              style="wihth:100%;color: red;text-decoration: underline;"
            >{{ this.tableDate.newrechargeplayer }}</span>
          </td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.allrecharege }}：</td>
          <td>{{ this.tableDate.allrecharege }}</td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.allwithdraw }}：</td>
          <td>{{ this.tableDate.allwithdraw }}</td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.allprofit }}：</td>
          <td>{{ this.tableDate.allprofit }}</td>
        </tr>
        <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.allbet }}：</td>
          <td>{{ this.tableDate.allbet }}</td>
        </tr>
        <!-- <tr>
          <td>{{ this.$store.getters.WordsConfig.WorkRecord.gameprofit }}：</td>
          <td>{{ this.tableDate.gameprofit }}</td>
        </tr>-->
      </table>
      <mt-popup
        v-model="popupVisible"
        position="right"
        :modal="showModal"
        style="width: 100%; height: 100%;"
      >
        <vm-detail
          ref="child"
          @closePopup="closePopup"
          :total="this.total"
          :st="new Date(this.startDate).getTime()"
          :et="new Date(this.endDate).getTime()"
        ></vm-detail>
      </mt-popup>
    </div>
  </div>
</template>

<script>
import lang from "element-ui/lib/locale/lang/en";
import locale from "element-ui/lib/locale";
import { G_WorkRecord } from "../../api/api.js";
import DetailData from "../Cells/DetailData.vue";
export default {
  data() {
    return {
      popupVisible: false,
      showModal: false,
      tableDate: {
        newplayer: "",
        activplayer: "",
        newregisteplayer: "",
        newrechargeplayer: "",
        allrecharege: "",
        allwithdraw: "",
        allprofit: "",
        allbet: "",
        gameprofit: ""
      },
      queryBtnDisable: false,
      startDate: "",
      endDate: "",
      curType: -1,
      total: 0,
      queryStr: this.$store.getters.WordsConfig.WorkRecord.query,
      date0: this.$store.getters.WordsConfig.WorkRecord.yesterday,
      date1: this.$store.getters.WordsConfig.WorkRecord.today,
      date2: this.$store.getters.WordsConfig.WorkRecord.lastmonth,
      date3: this.$store.getters.WordsConfig.WorkRecord.thismonth
    };
  },
  components: {
    "vm-detail": DetailData
  },
  methods: {
    openPopup() {
      this.popupVisible = true;
      // this.$refs.child.$emit('childMethod')
      this.$refs.child.firData(this.curType);
    },
    closePopup() {
      this.popupVisible = false;
    },
    checkDetail(type) {
      this.curType = type;
      switch (type) {
        case 1:
          if (this.tableDate.newplayer == "" || this.tableDate.newplayer == 0) {
            return;
          }
          this.total = this.tableDate.newplayer;
          break;
        case 2:
          if (
            this.tableDate.activplayer == "" ||
            this.tableDate.activplayer == 0
          ) {
            return;
          }
          this.total = this.tableDate.activplayer;
          break;
        case 3:
          if (
            this.tableDate.newregisteplayer == "" ||
            this.tableDate.newregisteplayer == 0
          ) {
            return;
          }
          this.total = this.tableDate.newregisteplayer;
          break;
        case 4:
          if (
            this.tableDate.newrechargeplayer == "" ||
            this.tableDate.newrechargeplayer == 0
          ) {
            return;
          }
          this.total = this.tableDate.newrechargeplayer;
          break;
        default:
          this.total = 0;
          break;
      }
      this.openPopup();
      // this.$router.push(
      //   "/det?type=" +
      //     type +
      //     "&st=" +
      //     new Date(this.startDate).getTime() +
      //     "&et=" +
      //     new Date(this.endDate).getTime() +
      //     "&total=" +
      //     total
      // );
    },
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
      try {
        this.queryBtnDisable = true;
        // if (this.startDate.trim() === "" || this.endDate.trim() === "") {
        //   this.tableDate = {};
        //   this.queryBtnDisable = false;
        //   return;
        // }
        G_WorkRecord(
          new Date(this.startDate).getTime(),
          new Date(this.endDate).getTime()
        )
          .then(result => {
            console.log(result);
            this.tableDate = {
              newplayer: result.NewAddUser,
              activplayer: result.ActiveUser,
              newregisteplayer: result.NewBindUser,
              newrechargeplayer: result.NewRechargeUser,
              allrecharege: result.AllRecharge,
              allwithdraw: result.AllWithdraw,
              allprofit: result.CunTiCha,
              allbet: result.AllBet,
              gameprofit: result.UserProfit
            };
            this.queryBtnDisable = false;
          })
          .catch(err => {
            this.queryBtnDisable = false;
            this.tableDate = {};
            console.log(err);
          });
      } catch (error) {
        this.queryBtnDisable = false;
        this.tableDate = {};
      }
    }
  },
  mounted() {
    locale.use(lang);
    this.date3Click();
  }
};
</script>

<style lang="scss" scoped>
#wordrecord {
  height: 100%;
  background-color: #8080804a;
}
#dataTB tr td {
  width: 50%;
  height: 3rem;
  font-size: 1.4rem;
}
.wrBtn {
  width: 25%;
  font-size: small;
  padding: 2px 0;
  margin: 4px;
}
</style>