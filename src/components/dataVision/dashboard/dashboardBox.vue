<template>
  <div class="center_box">
    <div class="date_type">
      <el-radio-group
        v-model="dateType"
        v-if="!isStock"
        @change="dateTypeChange"
      >
        <el-radio label="1">按年</el-radio>
        <el-radio label="2">按月</el-radio>
      </el-radio-group>
      <el-select
        v-show="isProvince || isCity"
        v-model="placeVal"
        filterable
        placeholder="请选择"
        :style="`margin-left: ${
          isCountry ? 0 : 220
        }px; margin-right: 30px; width: 200px;`"
      >
        <el-option
          v-for="(item, index) in selectOptions"
          :key="index"
          :label="item.name"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        type="primary"
        icon="el-icon-refresh-right"
        @click="reset"
        :style="`margin-left: ${isCountry ? 240 : 0}px;`"
      >
        重 置
      </el-button>
      <el-button type="primary" icon="el-icon-search" @click="confirm">
        查 询
      </el-button>
    </div>
    <div :class="isStock ? 'date_picker_2' : 'date_picker'">
      <el-date-picker
        v-if="dateType == '1'"
        v-model="dateVbl"
        :picker-options="dateValidate"
        type="year"
        value-format="yyyy"
        style="width: 200px;"
        placeholder="选择时间"
        :clearable="false"
      >
      </el-date-picker>
      <el-date-picker
        v-if="dateType == '2'"
        v-model="dateVbl"
        :picker-options="dateValidate"
        type="month"
        value-format="yyyy-MM"
        style="width: 200px;"
        placeholder="选择时间"
        :clearable="false"
      >
      </el-date-picker>
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
    <div class="echart-box" v-show="isCountry">
      <div class="ecahrt-div" id="bar"></div>
    </div>
    <div class="echart-box" v-show="isProvince">
      <div class="ecahrt-div" id="geo"></div>
      <div class="ecahrt-div" id="geo-bar"></div>
    </div>
    <div class="echart-box" v-show="!isCountry">
      <div class="echart-item">
        <div class="ecahrt-div" id="bar1"></div>
      </div>
      <div class="echart-item">
        <div class="ecahrt-div" id="bar2"></div>
      </div>
    </div>
    <div class="echart-box">
      <div class="echart-item">
        <div class="ecahrt-div" id="pie1"></div>
      </div>
      <div class="echart-item">
        <div class="ecahrt-div" id="pie2"></div>
      </div>
    </div>
    <div class="echart-box" v-show="isCountry || isCity">
      <div class="ecahrt-div" id="bar3"></div>
    </div>
    <div class="echart-box" v-show="isCountry">
      <div class="ecahrt-div" id="bar4"></div>
    </div>
  </div>
</template>

<script>
require("echarts/lib/component/geo");
require("echarts/map/js/china");

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

const provinceList = [
  { name: "北京", key: "北京市" },
  { name: "天津", key: "天津市" },
  { name: "上海", key: "上海市" },
  { name: "重庆", key: "重庆市" },
  { name: "河北", key: "河北省" },
  { name: "河南", key: "河南省" },
  { name: "云南", key: "云南省" },
  { name: "辽宁", key: "辽宁省" },
  { name: "黑龙江", key: "黑龙江省" },
  { name: "湖南", key: "湖南省" },
  { name: "安徽", key: "安徽省" },
  { name: "山东", key: "山东省" },
  { name: "新疆", key: "新疆维吾尔自治区" },
  { name: "江苏", key: "江苏省" },
  { name: "浙江", key: "浙江省" },
  { name: "江西", key: "江西省" },
  { name: "湖北", key: "湖北省" },
  { name: "广西", key: "广西壮族自治区" },
  { name: "甘肃", key: "甘肃省" },
  { name: "山西", key: "山西省" },
  { name: "内蒙古", key: "内蒙古自治区" },
  { name: "陕西", key: "陕西省" },
  { name: "吉林", key: "吉林省" },
  { name: "福建", key: "福建省" },
  { name: "贵州", key: "贵州省" },
  { name: "广东", key: "广东省" },
  { name: "青海", key: "青海省" },
  { name: "西藏", key: "西藏自治区" },
  { name: "四川", key: "四川省" },
  { name: "宁夏", key: "宁夏回族自治区" },
  { name: "海南", key: "海南省" },
  { name: "香港", key: "香港特别行政区" },
  { name: "澳门", key: "澳门特别行政区" },
  { name: "台湾", key: "台湾省" },
  { name: "南沙诸岛", key: "南沙诸岛" },
];

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
      dateVbl: "",
      endDateYear: 0,
      endDateMonth: 0,
      endDateStock: 0,

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
      placeVal: "-1",

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
      this.provinceDataSlt = [
        {
          value: "-1",
          name: "所有省份",
        },
      ].concat(
        (res.data || []).map((v) => ({
          value: v.name,
          name: v.name,
        }))
      );
    });
    //城市
    dvCity({ type: "0" }).then((res) => {
      this.cityDataSlt = [
        {
          value: "-1",
          name: "所有城市",
        },
      ].concat(
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
      return this.isStock ? this.stockTime : this.timeData;
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
    isStock() {
      return this.sourceType === "3";
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
        dateType: this.dateType,
        beginDate: this.dateVbl,
        provinceName:
          this.isProvince && this.placeVal !== "-1" ? this.placeVal : "",
        cityName: this.isCity && this.placeVal !== "-1" ? this.placeVal : "",
      };
    },
    dateValidate() {
      return {
        disabledDate: (time) => {
          if (this.sourceType === "1" || this.sourceType === "2") {
            return (
              time >
              (this.dateType === "1" ? this.endDateYear : this.endDateMonth)
            );
          }
          if (this.sourceType === "3") {
            return time > this.endDateStock;
          }
          return true;
        },
      };
    },
  },
  methods: {
    init() {
      this.reset();
      this.confirm();
    },
    dateTypeChange(val) {
      if (val === "2") {
        this.dateVbl = this.timeData;
      } else if (this.sourceType === "3") {
        this.dateVbl = this.stockTime;
      } else {
        this.dateVbl = this.timeData ? this.timeData.slice(0, 4) : "";
      }
    },
    reset() {
      if (this.isStock) {
        this.dateType = "1";
        this.dateVbl = this.stockTime;
      } else {
        this.dateType = "2";
        this.dateVbl = this.timeData;
      }
      this.placeVal = "-1";
    },
    confirm() {
      this.getData();
    },
    getData() {
      this.salesRatio();
      this.isCountry && this.carSales();
      !this.isCountry && this.chartsBrand();
      !this.isCountry && this.chartsSubModel();
      !this.isStock && this.chartsFuelType();
      this.isStock && this.chartsManfProp();
      this.chartsSegment();
      this.isCountry && this.chartsManf();
      this.isProvince && this.chartsProvince();
      (this.isCountry || this.isCity) && this.chartsCity();
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
        const data = Object.keys(res.data.salesQtyMap || {}).sort(
          (a, b) =>
            new Date(a.replace(/^(\d{4}-)(\d)$/, "$10$2")) -
            new Date(b.replace(/^(\d{4}-)(\d)$/, "$10$2"))
        );
        const seriesData = data.map((v) => res.data.salesQtyMap[v]);
        const lastTitle =
          res.data.salesQtyLastMap !== null
            ? Object.keys(res.data.salesQtyLastMap || {}).sort(
                (a, b) =>
                  new Date(a.replace(/^(\d{4}-)(\d)$/, "$10$2")) -
                  new Date(b.replace(/^(\d{4}-)(\d)$/, "$10$2"))
              )
            : undefined;
        const lastData =
          res.data.salesQtyLastMap !== null
            ? lastTitle.map((v) => res.data.salesQtyLastMap[v])
            : undefined;
        this.initChartsBar({
          isRotate: false,
          id: "bar",
          title: res.data ? res.data.text : "",
          data,
          seriesData,
          lastTitle,
          lastData,
        });
      });
    },
    // 品牌TOP10
    chartsBrand() {
      chartsBrand(this.requestParams).then((res) => {
        this.initChartsBar({
          isRotate: true,
          id: "bar1",
          title: "品牌TOP10",
          data: res.data ? res.data.map((v) => v.brandName) : [],
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 车系TOP10
    chartsSubModel() {
      chartsSubModel(this.requestParams).then((res) => {
        this.initChartsBar({
          isRotate: true,
          id: "bar2",
          title: "车型TOP10",
          data: res.data ? res.data.map((v) => v.subModelName) : [],
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 燃料类型
    chartsFuelType() {
      chartsFuelType(this.requestParams).then((res) => {
        let total = 0;
        const data = res.data
          ? res.data.map((v) => ({
              value: v.salesQty || 0,
              name: v.fuelTypeName,
            }))
          : [];
        if (data.length !== 0) {
          let max = 0;
          data.forEach((item) => {
            total += item.value;
            if (item.value > max) {
              max = item.value;
            }
          });
          max = max / 20;
          data.forEach((item) => {
            item.showVal = item.value < max ? max : item.value;
          });
        }
        this.initChartsPie({
          id: "pie1",
          title: "燃料类型",
          data,
          total,
        });
      });
    },
    // 厂商属性
    chartsManfProp() {
      chartsManfProp(this.requestParams).then((res) => {
        let total = 0;
        const data = res.data
          ? res.data.map((v) => ({
              value: v.salesQty || 0,
              name: v.manfPropName,
            }))
          : [];
        if (data.length !== 0) {
          let max = 0;
          data.forEach((item) => {
            total += item.value;
            if (item.value > max) {
              max = item.value;
            }
          });
          max = max / 20;
          data.forEach((item) => {
            item.showVal = item.value < max ? max : item.value;
          });
        }
        this.initChartsPie({
          id: "pie1",
          title: "厂商属性",
          data,
          total,
        });
      });
    },
    // 车身形式
    chartsSegment() {
      chartsSegment(this.requestParams).then((res) => {
        let total = 0;
        const data = res.data
          ? res.data.map((v) => ({
              value: v.salesQty || 0,
              name: v.segmentName,
            }))
          : [];
        if (data.length !== 0) {
          let max = 0;
          data.forEach((item) => {
            total += item.value;
            if (item.value > max) {
              max = item.value;
            }
          });
          max = max / 20;
          data.forEach((item) => {
            item.showVal = item.value < max ? max : item.value;
          });
        }
        this.initChartsPie({
          id: "pie2",
          title: "汽车类型",
          data,
          total,
        });
      });
    },
    // 城市销量
    chartsCity() {
      chartsCity(this.requestParams).then((res) => {
        this.initChartsBar({
          isRotate: true,
          id: "bar3",
          title: "城市TOP10",
          data: res.data ? res.data.map((v) => v.cityName) : [],
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 厂商销量
    chartsManf() {
      chartsManf(this.requestParams).then((res) => {
        this.initChartsBar({
          isRotate: true,
          id: "bar4",
          title: "厂商TOP10",
          data: res.data ? res.data.map((v) => v.manfName) : [],
          seriesData: res.data ? res.data.map((v) => v.salesQty) : [],
        });
      });
    },
    // 省份销量
    chartsProvince() {
      chartsProvince({ ...this.requestParams, provinceName: "" }).then(
        (res) => {
          this.initChartsGeo(
            res.data
              ? res.data.map((v) => ({
                  name: v.provinceName,
                  value: v.salesQty || 0,
                }))
              : []
          );
        }
      );
    },
    // 柱状图
    initChartsBar({
      isRotate,
      id,
      title,
      data,
      seriesData,
      lastTitle,
      lastData,
    }) {
      document.getElementById(id).setAttribute("_echarts_instance_", null);
      const chart = echarts.init(document.getElementById(id));
      if (!chart) return;
      chart.innerHTML = "";
      const series = [
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
      ];
      if (lastData) {
        series.unshift({
          xAxisIndex: 0,
          yAxisIndex: 0,
          itemStyle: {
            color: "#8fd9f3",
          },
          barMaxWidth: 20,
          z: 3,
          name: "单位（辆）",
          type: "bar",
          data: lastData,
          barWidth: "12%",
        });
      }
      const tooltip = lastData
        ? {
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
            formatter: function (e) {
              let str = "";
              const index = e[0].dataIndex;
              if (!isNaN(lastData[index])) {
                str +=
                  lastTitle[index] +
                  ": " +
                  formatNum(e[0].value) +
                  " 单位（辆）";
                if (!isNaN(seriesData[index])) {
                  str += "<br/>";
                }
              }
              if (!isNaN(seriesData[index])) {
                str +=
                  data[index] + ": " + formatNum(e[1].value) + " 单位（辆）";
              }
              return str;
            },
          }
        : {
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
          };
      this.$nextTick(() => {
        setTimeout(() => {
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
            tooltip,
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
                  interval: 0,
                  rotate: isRotate ? -45 : 0,
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
            series,
          });
        }, 100);
      });
    },
    // 饼图
    initChartsPie({ id, title, data, total }) {
      const chartPie = echarts.init(document.getElementById(id));
      if (!chartPie) return;
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
        chartPie.setOption({
          dataset: {
            source: [
              ["name", "value"],
              ...data.map((v) => [v.name, v.showVal, v.value]),
            ],
          },
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
              dataView: {
                show: true,
                readOnly: false,
              },
              restore: {
                show: true,
              },
              saveAsImage: {
                show: true,
              },
            },
          },
          tooltip: {
            trigger: "item",
            formatter: function (p) {
              return p.name + "：" + formatNum(p.value[2]) + "（辆）";
            },
          },
          series: [
            {
              name: "半径模式",
              type: "pie",
              clockWise: false,
              center: ["50%", "60%"],
              radius: ["45%", "60%"],
              roseType: "area",
              encode: {
                itemName: "name",
                value: "value",
              },
              label: {
                show: true,
                position: "outside",
                formatter: function (p) {
                  return (
                    p.name +
                    "：" +
                    ((p.value[2] * 100) / total || 0).toFixed(2) +
                    "%"
                  );
                },
                // formatter: "{b}：{d}%",
                height: 50,
              },
              labelLine: {
                normal: {
                  length: 10,
                  length2: 10,
                  lineStyle: {
                    width: 1,
                  },
                },
              },
            },
          ],
        });
      });
    },
    initChartsGeo(data) {
      const chartGeo = echarts.init(document.getElementById("geo"));
      const chartBar = echarts.init(document.getElementById("geo-bar"));
      if (!chartGeo) return;
      var provinceData = provinceList.map(({ name, key }) => ({
        name,
        value: data.find((v) => v.name === key)
          ? data.find((v) => v.name === key).value
          : 0,
      }));

      provinceData.sort(function (o1, o2) {
        if (isNaN(o1.value) || o1.value == null) return -1;
        if (isNaN(o2.value) || o2.value == null) return 1;
        return o1.value - o2.value;
      });

      const yData = provinceData.map((v) => v.name);

      this.$nextTick(() => {
        chartGeo.setOption({
          title: {
            text: "全国销量分布",
          },
          tooltip: {
            show: true,
          },
          visualMap: {
            type: "continuous",
            text: ["", ""],
            showLabel: true,
            seriesIndex: [0],
            min: 0,
            max: provinceData.length
              ? provinceData[provinceData.length - 1].value
              : 1,
            inRange: {
              color: [
                "#f3f3f3",
                "#edfbfb",
                "#b7d6f3",
                "#40a9ed",
                "#3598c1",
                "#215096",
              ],
            },
            textStyle: {
              color: "#000",
            },
            left: "left",
          },
          geo: {
            roam: false,
            map: "china",
            layoutSize: "90%",
            label: {
              emphasis: {
                show: false,
              },
            },
            itemStyle: {
              emphasis: {
                areaColor: "#fff464",
              },
            },
          },
          series: [
            {
              name: "销量",
              type: "map",
              roam: false,
              geoIndex: 0,
              label: {
                show: false,
              },
              data: provinceData,
            },
          ],
        });
        const xMax = parseInt(
          provinceData[provinceData.length - 1]
            ? provinceData[provinceData.length - 1].value
            : 0
        );
        chartBar.setOption({
          tooltip: {
            show: true,
          },
          grid: {
            right: 100,
            top: 50,
            bottom: 50,
            left: 100,
          },
          yAxis: {
            type: "category",
            nameGap: 16,
            axisLine: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: "#ddd",
              },
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: "#999",
              },
            },
            data: yData,
          },
          xAxis: {
            type: "value",
            scale: true,
            position: "top",
            splitNumber: 1,
            boundaryGap: false,
            splitLine: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              showMinLabel: true,
              showMaxLabel: true,
              margin: 2,
              textStyle: {
                color: "#aaa",
              },
            },
            max: xMax,
          },
          series: [
            {
              name: "销量",
              type: "bar",
              roam: false,
              visualMap: false,
              zlevel: 2,
              barMaxWidth: 20,
              itemStyle: {
                normal: {
                  color: "#40a9ed",
                },
                emphasis: {
                  color: "#fff464",
                },
              },
              label: {
                normal: {
                  show: false,
                  position: "right",
                  offset: [0, 10],
                },
                emphasis: {
                  show: true,
                  position: "right",
                  offset: [10, 0],
                },
              },
              data: provinceData,
            },
          ],
        });

        chartGeo.off("mouseover");
        chartGeo.off("mousemove");
        chartGeo.off("mouseout");
        chartBar.off("mouseover");
        chartBar.off("mousemove");
        chartBar.off("mouseout");
        chartGeo.on("mouseover", function (target) {
          chartBar.dispatchAction({
            type: "highlight",
            name: target.name,
          });
        });
        chartGeo.on("mouseout", function (target) {
          chartBar.dispatchAction({
            type: "downplay",
            name: target.name,
          });
        });
        chartBar.on("mouseover", function (target) {
          chartGeo.dispatchAction({
            type: "highlight",
            name: target.name,
          });
        });
        chartBar.on("mouseout", function (target) {
          chartGeo.dispatchAction({
            type: "downplay",
            name: target.name,
          });
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
    timeData(data) {
      if (data) {
        this.endDateYear = new Date(data.slice(0, 4)).getTime();
        this.endDateMonth = new Date(data).getTime();
      }
    },
    stockTime(data) {
      if (data) {
        this.endDateStock = new Date(data).getTime();
      }
    },
  },
};
</script>

<style scoped>
.center_box {
  position: relative;
  width: 100%;
  height: 100%;
}
.date_type {
  height: 60px;
  margin-bottom: 10px;
  padding: 12px 10px 0;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.date_type >>> .el-radio-group {
  vertical-align: top;
  margin-top: 10px;
  margin-right: 24px;
}
.date_type >>> .el-radio {
  margin-right: 12px;
}
.date_picker {
  position: absolute;
  top: 12px;
  left: 160px;
  z-index: 100;
}
.date_picker_2 {
  position: absolute;
  top: 12px;
  left: 20px;
  z-index: 100;
}
.dataBtn {
  padding-bottom: 10px;
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
  width: 50%;
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
.echart-box {
  margin-bottom: 12px;
  width: 100%;
  overflow: hidden;
}
.echart-item {
  float: left;
  width: calc(50% - 10px);
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.echart-item:last-child {
  float: right;
}
.ecahrt-div {
  width: 100%;
  height: 300px;
  padding: 10px;
  background: #fff;
}
#geo {
  float: left;
  width: 60%;
  height: 500px;
}
#geo-bar {
  float: left;
  width: 40%;
  height: 500px;
}
</style>
