<template>
  <div class="dataEcharts">
    <div class="dataList">
      <div class="list_item" v-for="(item, index) in dataAll" :key="index">
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
    <div class="echart">
      <div class="left" id="main"></div>
    </div>
    <!-- echart -->
    <div class="echart-box">
      <div class="echart-item">
        <div id="main2"></div>
      </div>
      <div class="echart-item">
        <div id="main3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { salesRatio, carSales } from "@/api/data";
import { chartsFuelType, chartsSegment } from "@/api/charts";
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
  name: "dataEcharts",
  data() {
    return {
      series: [],
      data: [],
      seriesData: [],
      dataAll: [],
      car: {
        car2: "1",
        car3: "1",
        car4: "1",
        energy2: "2",
        energy3: "2",
        energy4: "2",
        ownership_2: "3",
        ownership_3: "3",
        ownership_4: "3",
      },
      maxHight: {
        car2: 10000000,
        energy2: 500000,
        ownership_2: 500000000,
      },
      ysalesQtyMap: [],
      msalesQtyMap: [],
      title: "",
      carName: "",
    };
  },
  props: {
    timeData: {
      type: String,
      default: "",
    },
    stockTime: {
      type: String,
      default: "",
    },
  },
  methods: {
    onClass(data) {
      if (!data) return;
      let data_ = data.replace("%", "");
      if (data_ > 0) return "green";
      else return "red";
    },
    toLocaleString(data) {
      if (!Number(data)) return data;
      let d = Number(data).toLocaleString();
      return d;
    },
    init(data) {
      this.salesRatio(this.car[data]);
      this.carName = data || "";
    },
    salesRatio(data) {
      let beginDate = data === "3" ? this.stockTime : this.timeData;
      //销量走势图
      let carSalesData = {
        sourceType: data,
        beginDate: beginDate,
        cityName: "",
        provinceName: "",
      };
      carSales(carSalesData).then((res) => {
        this.title = res.data.text;
        let salesQtyMap = res.data.salesQtyMap || {};
        let ysalesQtyMap = res.data.ysalesQtyMap || {};
        let msalesQtyMap = res.data.msalesQtyMap || {};
        this.data = Object.keys(salesQtyMap);
        let series = Object.values(salesQtyMap);
        this.ysalesQtyMap = Object.values(ysalesQtyMap);
        this.msalesQtyMap = Object.values(msalesQtyMap);
        let ysalesQtyMap_ = [];
        let msalesQtyMap_ = [];
        this.ysalesQtyMap.forEach((element) => {
          ysalesQtyMap_.push(element.replace("%", ""));
        });
        this.ysalesQtyMap = ysalesQtyMap_;
        this.msalesQtyMap.forEach((element) => {
          msalesQtyMap_.push(element.replace("%", ""));
        });
        this.msalesQtyMap = msalesQtyMap_;
        this.seriesData = series;
        this.series = [
          {
            name: res.data.text,
            type: "line",
            data: series,
          },
        ];
        this.$nextTick(() => {
          this.initCharts();
        });
      });
      chartsFuelType({
        sourceType: "1",
        dateType: "2",
        beginDate: "2020-10",
        provinceName: "",
        cityName: "",
      }).then((res) => {
        this.initChartsPie(
          res.data.map(({ salesQty, fuelTypeName }) => ({
            value: salesQty,
            name: fuelTypeName,
          })),
          "main2",
          "新能源占比"
        );
      });
      chartsSegment({
        sourceType: "1",
        dateType: "2",
        beginDate: "2020-10",
        provinceName: "",
        cityName: "",
      }).then((res) => {
        this.initChartsPie(
          res.data.map(({ salesQty, segmentName }) => ({
            value: salesQty,
            name: segmentName,
          })),
          "main3",
          "车身形式占比"
        );
      });
      //右侧数据
      let salesRatioData = {
        sourceType: data,
        beginDate: beginDate,
        cityName: "",
        provinceName: "",
      };
      salesRatio(salesRatioData).then((res) => {
        if (res.code === 200 && res.data.length > 0) {
          this.dataAll = res.data || [];
        }
      });
    },
    //图表数据
    initCharts() {
      this.chart = echarts.init(document.getElementById("main"), "macarons");
      this.chart.setOption({
        title: {
          text: this.title,
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
              fontSize: 12,
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

            data: this.data,
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
            data: this.seriesData,
            barWidth: "12%",
          },
        ],
      });
    },
    //图表数据
    initChartsPie(data, id, title) {
      const chart = echarts.init(document.getElementById(id), "macarons");
      let colorList = [
        "#0b576f",
        "#066989",
        "#2B7F9B",
        "#408ECA",
        "#0984e3",
        "#029EF1",
        "#43C6F3",
        "#79DDFF",
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
            data,
          },
        ],
      });
    },
  },
};
</script>
<style scoped>
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
#main2,
#main3 {
  width: 100%;
  height: 100%;
}
</style>
