<template>
  <div class="car">
    <div class="car_t">
      <span style="margin-right: 20px;">时间筛选</span>
      <el-date-picker
        v-model="time"
        :type="type"
        :value-format="format"
        style="margin-right: 30px;"
        placeholder="选择时间"
      >
      </el-date-picker>
      <el-radio-group v-model="format" v-if="sourceType !== '3'">
        <el-radio label="yyyy">按年</el-radio>
        <el-radio label="yyyy-MM">按月</el-radio>
      </el-radio-group>
    </div>
    <div class="table">
      <el-table
        :data="tableData"
        border
        v-loading="loading"
        style="width: 100%;"
      >
        <el-table-column type="index" label="排名" width="180">
        </el-table-column>

        <el-table-column prop="manfName" label="厂商" v-if="typeData === 'MN'">
        </el-table-column>
        <el-table-column prop="brandName" label="品牌" v-if="typeData === 'BN'">
        </el-table-column>
        <el-table-column
          prop="subModelName"
          label="车型"
          v-if="
            typeData !== 'BN' &&
            typeData !== 'MN' &&
            typeData !== 'PN' &&
            typeData !== 'CN'
          "
        >
        </el-table-column>
        <el-table-column
          prop="provinceName"
          label="省份"
          v-if="typeData === 'PN'"
        >
        </el-table-column>
        <el-table-column prop="cityName" label="城市" v-if="typeData === 'CN'">
        </el-table-column>
        <el-table-column
          prop="salesQty"
          label="销量（辆）"
          v-if="sourceType !== '3'"
        >
        </el-table-column>
        <el-table-column
          prop="salesQty"
          label="保有量（辆）"
          v-if="sourceType === '3'"
        >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { salesRankList } from "@/api/data";
export default {
  name: "car1",
  data() {
    return {
      time: "",
      format: "yyyy",
      loading: false,
      type: "year", //month
      tableData: [],
      beginDate: {
        yyyy: "1",
        "yyyy-MM": "2",
      },
      typeData: "",
      sourceType: "",
    };
  },
  props: ["timeData", "stockTime"],
  mounted() {
    this.timeChange();
  },
  methods: {
    init(val, data) {
      this.typeData = val;
      this.sourceType = data;
      if (this.sourceType === "3") {
        this.format = "yyyy";
        this.timeChange();
      }
      if (this.loading) return;
      this.load();
    },
    load() {
      let dateType = this.beginDate[this.format];
      if (!(this.time && dateType && this.typeData && this.sourceType)) return;
      let data = {
        beginDate: this.time,
        dateType: this.beginDate[this.format],
        type: this.typeData,
        sourceType: this.sourceType,
      };
      this.loading = true;
      salesRankList(data).then((res) => {
        this.loading = false;
        this.tableData = res.rows || [];
      });
    },
    timeChange() {
      let begin = this.beginDate[this.format];
      if (this.sourceType === "3") {
        this.time = this.stockTime;
        return;
      }
      if (begin === "1") {
        this.time = this.timeData.slice(0, 4);
      }
      if (begin === "2") {
        this.time = this.timeData;
      }
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
    format(data) {
      // this.time = '';
      if (data === "yyyy") {
        this.type = "year";
      } else {
        this.type = "month";
      }
    },
    type(data) {
      if (data) {
        this.timeChange();
      }
    },
  },
};
</script>

<style scoped>
.car {
  width: 100%;
  height: 100%;
}
.car_t {
  margin-bottom: 20px;
  padding-left: 20px;
}
.table {
  min-height: calc(100vh - 225px);
}
</style>
