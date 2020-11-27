<template>
  <div class="center_">
    <h5 class="title">
      {{ dataVal.textData[this.tabId] }}
      <span>覆盖全市场销量数据，每月15日更新</span>
    </h5>
    <div class="car_t">
      <span style="margin-right: 20px;">时间筛选</span>
      <el-radio-group v-model="dateType" v-if="sourceType !== '3'">
        <el-radio label="year">按年</el-radio>
        <el-radio label="month">按月</el-radio>
      </el-radio-group>
    </div>
    <div :class="sourceType === '3' ? 'center_picker2' : 'center_picker'">
      <el-date-picker
        v-if="dateType == 'month'"
        v-model="time"
        type="month"
        value-format="yyyy-MM"
        style="margin-right: 30px;"
        placeholder="选择时间"
        :clearable="false"
      >
      </el-date-picker>
      <el-date-picker
        v-else
        v-model="time"
        type="year"
        value-format="yyyy"
        style="margin-right: 30px;"
        placeholder="选择时间"
        :clearable="false"
      >
      </el-date-picker>
      <el-radio-group>
        <el-button type="primary" @click="reset">重 置</el-button>
      </el-radio-group>
    </div>
    <div class="selectionBox">
      <el-tabs lazy v-model="tableType" @tab-click="load">
        <el-tab-pane
          v-for="(item, index) in tableTypeData"
          :key="index"
          :label="item.lable"
          :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <carTable
        :loading="loading"
        :sourceType="sourceType"
        :tableType="tableType"
        :tableData="tableData"
      ></carTable>
    </div>
  </div>
</template>

<script>
import { dvIndustry, salesRankList } from "@/api/data";
import dataVal from "../../../store/dataVal";
import carTable from "./carTable";
export default {
  name: "car",
  data() {
    return {
      loading: false,
      dataVal,
      tabId: "",
      tableTypeData: [],
      tableType: "",
      sourceType: "",
      time: "",
      dateType: "", // year,month
      tableData: [],
    };
  },
  props: ["timeData", "stockTime"],
  components: {
    carTable,
  },
  methods: {
    init(tabId) {
      this.tabId = tabId;
      this.sourceType = dataVal.sourceType[tabId];
      this.tableTypeData = dataVal.tabData[this.tabId];
      this.tableType = this.tableTypeData[0].name;
      if (this.dateType === "" || this.sourceType === "3") {
        this.dateType = "year";
        this.timeChange();
      }
      if (this.loading) return;
      this.load();
    },
    timeChange() {
      if (this.sourceType === "3") {
        this.time = this.stockTime;
        return;
      }
      if (this.dateType === "year") {
        this.time = this.timeData.slice(0, 4);
      }
      if (this.dateType === "month") {
        this.time = this.timeData;
      }
    },
    load() {
      if (!(this.time && this.dateType && this.tableType && this.sourceType)) {
        return;
      }
      this.loading = true;
      salesRankList({
        beginDate: this.time,
        dateType: this.dateType === "year" ? "1" : "2",
        type: this.tableType,
        sourceType: this.sourceType,
      }).then((res) => {
        this.loading = false;
        let max = 0;
        this.tableData = (res.rows || []).map((v, i) => {
          if (i === 0) max = v.salesQty;
          v.percent = (Math.sqrt(v.salesQty / max) || 0) * 100;
          return v;
        });
      });
    },
    reset() {
      this.dateType = "year";
      if (this.sourceType === "3") {
        this.time = this.stockTime;
      } else {
        this.time = this.timeData.slice(0, 4);
      }
      this.timeChange();
    },
  },
  watch: {
    time(data) {
      if (data && !this.loading) {
        this.load();
      }
    },
    timeData(data) {
      if (data) {
        this.timeChange();
      }
    },
    dateType(data) {
      this.timeChange();
    },
  },
  computed: {},
};
</script>

<style scoped>
.center_ {
  width: 100%;
  height: 100%;
  position: relative;
}
.title {
  width: 100%;
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: 650;
  margin: 0;
  padding: 10px 0;
  line-height: 1.2;
  text-align: left;
}
.title span {
  font-weight: 400;
  font-size: 14px;
  margin-left: 10px;
}
.car_t {
  height: 60px;
  margin-bottom: 10px;
  padding: 20px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.car_t >>> .el-radio-group {
  margin-right: 24px;
}
.car_t >>> .el-radio {
  margin-right: 12px;
}
.center_picker {
  position: absolute;
  top: 52px;
  left: 250px;
  z-index: 100;
}
.center_picker2 {
  position: absolute;
  top: 52px;
  left: 120px;
  z-index: 100;
}
.selectionBox {
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.selectionBox >>> .el-tabs__header {
  margin-bottom: 0;
}
.selectionBox >>> .el-tabs__nav-scroll {
  padding-left: 20px;
}
</style>
