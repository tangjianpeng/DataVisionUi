<template>
  <div class="center_box">
    <div class="dataTable" v-show="!isCountry">
      <div class="dataBtn">
        <el-select
          v-model="selectName"
          filterable
          placeholder="请选择"
          @change="selectClick"
          v-show="!isCountry"
        >
          <el-option
            v-for="(item, index) in selectOptions"
            :key="index"
            :label="item.name"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <!-- top 累计销量数据 -->
    <div class="dataList">
      <div class="list_item" v-for="(item, index) in salesData" :key="index">
        <span class="title">{{ item.text }}</span>
        <p class="number">{{ toLocaleString(item.salesQtyTotal) }}</p>
        <div class="list_item_footer">
          <div v-if="item.morMonth">
            <span v-show="item.morMonth">环比增速：</span>
            <span v-show="item.morMonth">
              {{ item.morMonth }}
            </span>
          </div>
          <div v-if="item.yorYear">
            <span v-show="item.yorYear">同比增速：</span>
            <span v-show="item.yorYear">
              {{ item.yorYear }}
            </span>
          </div>
          <div v-if="item.yorYearTotal">
            <span v-show="item.yorYearTotal">年累计同比：</span>
            <span v-show="item.yorYearTotal">
              {{ item.yorYearTotal }}
            </span>
          </div>
        </div>
      </div>
    </div>
    <!-- echart -->
    <div class="echart" v-show="isCountry">
      <div class="left" id="bar"></div>
    </div>
    <div class="echart-box">
      <div class="echart-item" v-show="!isCountry">
        <div id="bar1"></div>
      </div>
      <div class="echart-item" v-show="!isCountry">
        <div id="bar2"></div>
      </div>
    </div>
    <div class="echart-box">
      <div class="echart-item">
        <div id="pie1"></div>
      </div>
      <div class="echart-item">
        <div id="pie2"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { dvProvince, dvCity, carSales, salesRatio } from "@/api/data";
import {
  chartsManf,
  chartsProvince,
  chartsCity,
  chartsBrand,
  chartsSubModel,
  chartsFuelType,
  chartsManfProp,
  chartsSegment,
} from "@/api/charts";
import echarts from "echarts";

function formatNum(strNum) {
  if (strNum.length <= 3) {
    return strNum;
  }
  if (!/^(\+|-)?(\d+)(\.\d+)?$/.test(strNum)) {
    return strNum;
  }
  var a = RegExp.$1,
    b = RegExp.$2,
    c = RegExp.$3;
  var re = new RegExp();
  re.compile("(\\d)(\\d{3})(,|$)");
  while (re.test(b)) {
    b = b.replace(re, "$1,$2$3");
  }
  return a + "" + b + "" + c;
}

export default {
  name: "dashboard",
  data() {
    return {
      carData: {
        car3: "provinceName",
        car4: "cityName",
        energy3: "provinceName",
        energy4: "cityName",
        ownership_3: "provinceName",
        ownership_4: "cityName",
      },

      dateType: "2",
      provinceDataSlt: [
        {
          value: "-1",
          name: "所有省份",
        },
      ],
      cityDataSlt: [
        {
          value: "-1",
          name: "所有城市",
        },
      ],

      selectName: "-1",

      salesData: [],

      tableData_mn: [],
      tableData_sn: [],
    };
  },
  props: {
    tabId: {
      type: String,
      default: "",
    },
    timeData: {
      type: String,
      default: "",
    },
    stockTime: {
      type: String,
      default: "",
    },
  },
  mounted() {
    //省份
    dvProvince({ type: "0" }).then((res) => {
      this.provinceDataSlt = this.provinceDataSlt.concat(
        (res.data || []).map((v) => ({
          value: v.name,
          name: v.name,
        }))
      );
    });
    //城市
    dvCity({ type: "0" }).then((res) => {
      this.cityDataSlt = this.cityDataSlt.concat(
        (res.data || []).map((v) => ({
          value: v.name,
          name: v.name,
        }))
      );
    });
  },
  computed: {
    sourceType() {
      switch (this.tabId) {
        case "car2":
          return "1";
        case "car3":
          return "1";
        case "car4":
          return "1";
        case "energy2":
          return "2";
        case "energy3":
          return "2";
        case "energy4":
          return "2";
        case "ownership_2":
          return "3";
        case "ownership_3":
          return "3";
        case "ownership_4":
          return "3";
        default:
          return "1";
      }
    },
    beginDate() {
      return ["ownership_2", "ownership_3", "ownership_4"].includes(this.tabId)
        ? this.stockTime
        : this.timeData;
    },
    isCountry() {
      return ["car2", "energy2", "ownership_2"].includes(this.tabId);
    },
    isProvince() {
      return ["car3", "energy3", "ownership_3"].includes(this.tabId);
    },
    isCity() {
      return ["car4", "energy4", "ownership_4"].includes(this.tabId);
    },
    selectOptions() {
      if (this.isProvince) {
        return this.provinceDataSlt;
      }
      if (this.isCity) {
        return this.cityDataSlt;
      }
      return [];
    },
    requestParams() {
      return {
        sourceType: this.sourceType,
        dateType: this.sourceType === "3" ? "1" : this.dateType,
        beginDate: this.beginDate,
        provinceName:
          this.isProvince && this.selectName !== "-1" ? this.selectName : "",
        cityName:
          this.isCity && this.selectName !== "-1" ? this.selectName : "",
      };
    },
  },
  methods: {
    init() {
      this.selectName = "-1";
      this.getData();
    },
    selectClick() {
      this.getData();
    },
    getData() {
      this.salesRatio();
      this.isCountry && this.carSales();
      !this.isCountry && this.chartsBrand();
      !this.isCountry && this.chartsSegment();
      this.sourceType !== "3" && this.chartsFuelType();
      this.sourceType === "3" && this.chartsManfProp();
      this.chartsSubModel();
    },
    // 月和累计量
    salesRatio() {
      salesRatio(this.requestParams).then((res) => {
        if (res.code === 200 && res.data.length > 0) {
          this.salesData = res.data;
        }
      });
    },
    carSales() {
      carSales(this.requestParams).then((res) => {
        this.initChartsBar({
          id: "bar",
          title: res.data ? res.data.text : "",
          data: res.data ? Object.keys(res.data.salesQtyMap || {}) : [],
          seriesData: res.data ? Object.values(res.data.salesQtyMap || {}) : [],
        });
      });
    },
    // 厂商销量
    chartsManf() {},
    // 省份销量
    chartsProvince() {},
    // 城市销量
    chartsCity() {},
    // 品牌销量
    chartsBrand() {
      chartsBrand(this.requestParams).then((res) => {
        let data = res.data ? res.data.map((v) => v.brandName) : [];
        if (data.length > 5) {
          data = data.map((v, i) => `${i & 1 ? "\n" : ""}${v}`);
        }
        this.initChartsBar({
          id: "bar1",
          title: "品牌TOP10",
          data,
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 汽车类型
    chartsSegment() {
      chartsSegment(this.requestParams).then((res) => {
        let data = res.data ? res.data.map((v) => v.segmentName) : [];
        if (data.length > 5) {
          data = data.map((v, i) => `${i & 1 ? "\n" : ""}${v}`);
        }
        this.initChartsBar({
          id: "bar2",
          title: "车型TOP10",
          data,
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 燃料类型
    chartsFuelType() {
      chartsFuelType(this.requestParams).then((res) => {
        this.initChartsPie({
          id: "pie1",
          title: "新能源占比",
          data: res.data
            ? res.data.map((v) => ({
                value: v.salesQty,
                name: v.fuelTypeName,
              }))
            : [],
        });
      });
    },
    // 厂商属性
    chartsManfProp() {
      chartsManfProp(this.requestParams).then((res) => {
        this.initChartsPie({
          id: "pie1",
          title: "厂商属性",
          data: res.data
            ? res.data.map((v) => ({
                value: v.salesQty,
                name: v.manfPropName,
              }))
            : [],
        });
      });
    },
    // 车型销量 => 车身形式
    chartsSubModel() {
      chartsSubModel(this.requestParams).then((res) => {
        this.initChartsPie({
          id: "pie2",
          title: "车身形式占比",
          data: res.data
            ? res.data.map((v) => ({
                value: v.salesQty,
                name: v.subModelName,
              }))
            : [],
        });
      });
    },
    // 柱状图
    initChartsBar({ id, title, data, seriesData }) {
      const chart = echarts.init(document.getElementById(id), "macarons");
      if (!chart) return;
      this.$nextTick(() => {
        chart.setOption({
          title: {
            text: title || "",
          },
          grid: [
            {
              top: 80,
            },
          ],
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          tooltip: {
            trigger: "axis",
            axisPointer: {
              show: true,
              status: "shadow",
              z: -1,
              shadowStyle: {
                color: "#E6F7FF",
              },
              type: "shadow",
            },
          },
          xAxis: [
            {
              position: "bottom",
              type: "category",
              axisLine: {
                show: true,
                lineStyle: {
                  color: "#ECF1F6",
                },
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                rotate: 0,
                fontSize: 10,
                color: "#3A3A3C",
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: ["#ECF1F6", "#ECF1F6"],
                  width: 0,
                  type: "dashed",
                },
              },
              gridIndex: 0,

              data: data,
            },
          ],
          yAxis: [
            {
              type: "value",
              name: "单位（辆）",
              position: "left",
              axisLine: {
                show: false,
              },
              axisTick: {
                show: false,
              },
              axisLabel: {
                show: true,
                rotate: 0,
                fontSize: 12,
                color: "#6E7D9C",
              },
              splitLine: {
                show: true,
                lineStyle: {
                  color: "#ECF1F6",
                  width: 1,
                  type: "solid",
                },
              },
              min: 0,
              gridIndex: 0,
              boundaryGap: ["10%", "10%"],
            },
          ],
          series: [
            {
              xAxisIndex: 0,
              yAxisIndex: 0,
              itemStyle: {
                color: "#43A7FF",
              },
              barMaxWidth: 20,
              z: 3,
              name: "单位（辆）",
              type: "bar",
              data: seriesData,
              barWidth: "12%",
            },
          ],
        });
      });
    },
    // 饼图
    initChartsPie({ id, title, data }) {
      const chart = echarts.init(document.getElementById(id), "macarons");
      if (!chart) return;
      this.$nextTick(() => {
        let colorList = [
          "#0b576f",
          "#066989",
          "#2B7F9B",
          "#408ECA",
          "#0984e3",
          "#44A1EA",
          "#029EF1",
          "#43C6F3",
          "#79DDFF",
          "#B1EBFF",
        ];
        if (data.length < 8) {
          colorList = colorList.slice(8 - data.length);
        }
        chart.setOption({
          color: colorList,
          title: {
            text: title || "",
            x: "left",
            y: "top",
            textStyle: {
              color: "#333",
              fontSize: 16,
            },
          },
          toolbox: {
            feature: {
              dataView: { show: true, readOnly: false },
              restore: { show: true },
              saveAsImage: { show: true },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: function (p) {
              return p.name + "：" + formatNum(p.value) + "（辆）";
            },
          },
          series: [
            {
              type: "pie",
              center: ["50%", "60%"],
              radius: ["45%", "60%"],
              clockwise: true,
              avoidLabelOverlap: true,
              hoverOffset: 15,
              itemStyle: {
                normal: {
                  color: function (params) {
                    return colorList[params.dataIndex];
                  },
                },
              },
              label: {
                show: true,
                position: "outside",
                formatter: "{a|{b}：{d}%}",
                rich: {
                  hr: {
                    backgroundColor: "t",
                    borderRadius: 3,
                    width: 3,
                    height: 3,
                    padding: [3, 3, 0, -12],
                  },
                  a: {
                    padding: [-30, 15, -20, 15],
                    color: "#999",
                  },
                },
              },
              labelLine: {
                normal: {
                  length: 5,
                  length2: 20,
                  lineStyle: {
                    width: 1,
                  },
                },
              },
              data: data,
            },
          ],
        });
      });
    },
    toLocaleString(data) {
      if (!Number(data)) return data;
      let d = Number(data).toLocaleString();
      return d;
    },
  },
  watch: {
    tabId() {
      this.init();
    },
  },
};
</script>

<style scoped>
.center_box {
  width: 100%;
  height: 100%;
}
.top_box {
  width: 100%;
}
.table_box {
  width: 100%;
}
.dataBtn {
  padding: 10px 0;
}
.dataTable >>> .el-tabs__header {
  float: left;
  margin-right: 20px;
}
.list_item {
  width: 50%;
  height: 100%;
  padding: 20px 20px;
}
.number {
  font-size: 38px;
}
.green {
  color: #24a2a1 !important;
  margin: 0 20px;
}
.red {
  color: red !important;
  margin: 0 20px;
}

/* ------------------------------- */
.dataEcharts {
  width: 100%;
}
.left {
  width: 100%;
  height: 500px;
}
.right {
  width: 400px;
  height: 100%;
  float: left;
}
.right .top,
.right .btm {
  width: 100%;
  height: 50%;
  color: #889aa7;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 16px;
  /* border: solid 1px #889AA7; */
}
.top_t {
  width: 100%;
  height: calc(100% - 60px);
}
.top_t p {
  font-size: 38px;
  padding: 0;
  line-height: 100px;
  font-weight: 600;
  color: #000;
  text-align: center;
}
.top_b {
  height: 60px;
  display: flex;
}
.top_b p {
  padding: 0;
  color: #000;
}
.top_b_l,
.top_b_r {
  flex: 1;
}
.green {
  color: #24a2a1 !important;
}
.red {
  color: red !important;
}
.dataList {
  width: 100%;
  height: 220px;
  display: flex;
  margin-bottom: 12px;
}
.list_item {
  flex: 1;
  height: 100%;
  margin: 0 10px;
  padding: 20px 0;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.list_item:first-child {
  margin-left: 0px;
}
.list_item:last-child {
  margin-right: 0px;
}
.list_item .title {
  padding-left: 32px;
}
.number {
  padding-left: 32px;
  line-height: 120px;
  margin: 0;
  border-bottom: 2px solid #f1f1f1;
  color: #04a0e7;
  font-size: 48px;
  font-weight: bold;
  font-family: auto;
}
.list_item_footer {
  display: flex;
  padding: 20px 20px 0 32px;
}
.list_item_footer div {
  flex: 1;
}
.list_item_footer span {
  font-size: 16px;
  color: #82929f;
}
.echart {
  margin-bottom: 12px;
  padding: 10px;
  background: #fff;
}
.echart-box {
  display: flex;
  margin-bottom: 10px;
}
.echart-item {
  position: relative;
  flex: 1;
  margin: 0 10px;
  padding: 10px;
  height: 300px;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.echart-item:first-child {
  margin-left: 0px;
}
.echart-item:last-child {
  margin-right: 0px;
}
#bar1,
#bar2,
#pie1,
#pie2 {
  width: 100%;
  height: 100%;
}
</style>
