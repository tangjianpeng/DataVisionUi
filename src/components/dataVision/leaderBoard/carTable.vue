<template>
  <div class="car">
    <div class="table">
      <el-table
        style="width: 100%;"
        v-loading="loading"
        :data="tableData"
        border
      >
        <el-table-column
          type="index"
          label="排名"
          width="120"
        ></el-table-column>
        <el-table-column
          prop="manfName"
          label="厂商"
          v-if="tableType === 'MN'"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="brandName"
          label="品牌"
          v-if="tableType === 'BN'"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="subModelName"
          label="车型"
          v-if="
            tableType !== 'BN' &&
            tableType !== 'MN' &&
            tableType !== 'PN' &&
            tableType !== 'CN'
          "
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="provinceName"
          label="省份"
          v-if="tableType === 'PN'"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="cityName"
          label="城市"
          v-if="tableType === 'CN'"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="salesQty"
          label="销量（辆）"
          v-if="sourceType !== '3'"
        >
          <template slot-scope="scope">
            <div class="percent-box">
              <span>
                {{ scope.row.salesQty }}
              </span>
              <div class="percent-line">
                <el-progress
                  :percentage="scope.row.percent"
                  :format="format"
                  color="#409eff"
                ></el-progress>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="salesQty"
          label="保有量（辆）"
          v-if="sourceType === '3'"
        >
          <template slot-scope="scope">
            <div class="percent-box">
              <span>
                {{ scope.row.salesQty }}
              </span>
              <div class="percent-line">
                <el-progress
                  :percentage="scope.row.percent"
                  :format="format"
                  color="#409eff"
                ></el-progress>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "car1",
  props: ["loading", "sourceType", "tableType", "tableData"],
  data() {
    return {};
  },
  methods: {
    format() {
      return "";
    },
  },
};
</script>

<style scoped>
.car {
  width: 100%;
  height: 100%;
}
.table {
  min-height: calc(100vh - 210px);
}
.percent-box {
  min-width: 500px;
  position: relative;
}
.percent-line {
  position: absolute;
  top: 4px;
  left: 100px;
  width: 300px;
}
</style>
