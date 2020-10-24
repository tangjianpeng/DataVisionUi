<template>
  <div class="dataEcharts">
    <div class="dataList">
      <div class="list_item" v-for="(item, index) in dataAll" :key="index">
        <span class="title">{{item.text}}</span>
        <p class="number">{{toLocaleString(item.salesQtyTotal)}}</p>
        <span v-show="item.morMonth">环比增速 </span>
        <span v-show="item.morMonth" :class="onClass(item.morMonth)">{{item.morMonth}}</span>
        <span v-show="item.yorYear">同比增速 </span>
        <span v-show="item.yorYear" :class="onClass(item.yorYear)">{{item.yorYear}}</span>
        <span v-show="item.yorYearTotal">年累计同比 </span>
        <span v-show="item.yorYearTotal" :class="onClass(item.yorYearTotal)">{{item.yorYearTotal}}</span>
      </div>
    </div>
    <div class="left" id="main"></div>
    <!-- <div class="right">
      <div class="top" v-for="(item, index) in dataAll" :key="index">
        <div class="top_t">
          <span>{{item.text}}</span>
          <p>{{toLocaleString(item.salesQtyTotal)}}</p>
        </div>
        <div class="top_b">
          <div class="top_b_l" v-if="item.morMonth">
            <span>环比</span>
            <p :class="onClass(item.morMonth)">{{item.morMonth}}</p>
          </div>
          <div class="top_b_l" v-if="item.yorYearTotal">
            <span>年累计同比</span>
            <p :class="onClass(item.yorYearTotal)">{{item.yorYearTotal}}</p>
          </div>
          <div class="top_b_r" v-if="item.yorYear">
            <span>同比</span>
            <p :class="onClass(item.yorYear)">{{item.yorYear}}</p>
          </div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import { salesRatio, carSales } from "@/api/data";
import echarts from 'echarts'
export default {
  name: 'dataEcharts',
  data() {
    return {
      series: [],
      data: [],
      seriesData: [],
      dataAll: [],
      car:{
        car2: '1',
        car3: '1',
        car4: '1',
        energy2: '2',
        energy3: '2',
        energy4: '2',
        ownership_2: '3',
        ownership_3: '3',
        ownership_4: '3',
      },
      maxHight: {
        car2: 10000000,
        energy2: 500000,
        ownership_2: 500000000,
      },
      ysalesQtyMap: [],
      msalesQtyMap: [],
      title: '',
      carName: '',
    }
  },
  props: {
    time: {
      type: String,
      default: '',
    },
    times: {
      type: String,
      default: '',
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initCharts()
    // })
  },
  methods: {
    onClass(data){
      if(!data) return;
      let data_ = data.replace('%','');
      if(data_ > 0) return 'green';
      else return 'red';
    },
    toLocaleString(data) {
      if(!Number(data)) return data;
      let d = Number(data).toLocaleString();
      return d;
    },
    init(data) {
      this.salesRatio(this.car[data]);
      this.carName = data || '';
    },
    salesRatio(data) {
      let beginDate = data==='3'?this.times:this.time;
      //销量走势图
      let carSalesData = {
        sourceType: data,
        beginDate: beginDate,
        cityName: '',
        provinceName: '',
      }
      carSales(carSalesData).then(res=>{
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
        this.ysalesQtyMap.forEach(element => {
          ysalesQtyMap_.push(element.replace('%',''))
        });
        this.ysalesQtyMap = ysalesQtyMap_;
        this.msalesQtyMap.forEach(element => {
          msalesQtyMap_.push(element.replace('%',''))
        });
        this.msalesQtyMap = msalesQtyMap_;
        this.seriesData = series;
        this.series = [
          {
          name: res.data.text,
          type: 'line',
          // stack: '总量',
          data: series
          }
        ]
        this.$nextTick(() => {
          this.initCharts()
        })
      });
      //右侧数据
      let salesRatioData = {
        sourceType: data,
        beginDate: beginDate,
        cityName: '',
        provinceName: '',
      }
      salesRatio(salesRatioData).then(res =>{
        if(res.code === 200 && res.data.length >0){
          this.dataAll = res.data || [];
        }
      });

    },
    //图表数据
    initCharts() {
      const colors = ['#5793f3', '#d14a61', '#24A2A1'];
      this.chart = echarts.init(document.getElementById('main'), 'macarons');

      this.chart.setOption(
        {
          title: {
            text: this.title
          },
          color: colors,

          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'cross'
            }
          },
          grid: {
            right: '8%'
          },
          toolbox: {
            feature: {
              dataView: {show: true, readOnly: false},
              restore: {show: true},
              saveAsImage: {show: true}
            }
          },
          legend: {
            data: ['单位（辆）', '同比', '环比']
          },
          xAxis: [
            {
              type: 'category',
              axisTick: {
                alignWithLabel: true
              },
              data: this.data
            }
          ],
          yAxis: [
            {
              type: 'value',
              name: '单位（辆）',
              min: 0,
              max: this.maxHight[this.carName] || 10000000,
              // max: this.carName === 'ownership_2'?500000000:10000000,
              position: 'left',
              axisLine: {
                lineStyle: {
                  color: colors[0]
                },
              },
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '百分比',
              position: 'right',
              // axisLine: {
              //   lineStyle: {
              //     color: colors[2]
              //   }
              // },
              axisLabel: {
                formatter: '{value}%'
              }
            }
          ],
          series: [
            {
              name: '单位（辆）',
              type: 'bar',
              data: this.seriesData,
              barWidth: '40%'
            },
            {
              name: '同比',
              type: 'line',
              yAxisIndex: 1,
              data: this.ysalesQtyMap
            },
            {
              name: '环比',
              type: 'line',
              yAxisIndex: 1,
              data: this.msalesQtyMap
            }
          ]
      })
    },
    //图表数据
    initChart() {
      this.chart = echarts.init(document.getElementById('main'), 'macarons')

      this.chart.setOption({
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.data
        // data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月','8月', '9月','10月','11月','12月']
      },
      yAxis: {
        type: 'value'
      },
      series: this.series
      // series: [
      //   {
      //     // name: '邮件营销',
      //     type: 'line',
      //     // stack: '总量',
      //     data: [120, 132, 101, 134, 90, 230, 2110]
      //   },
      //   {
      //     // name: '联盟广告',
      //     type: 'line',
      //     // stack: '总量',
      //     data: [220, 182, 191, 234, 290, 330, 310]
      //   }
      //   ]
      })
    }
  },
}
</script>
<style scoped>
.dataEcharts{
  width: 100%;
  /* height: 500px; */
}
.left{
  width: 100%;
  height: 500px;
  /* float: left; */
}
.right{
  width: 400px;
  height: 100%;
  float: left;
}
.right .top, .right .btm{
  width: 100%;
  height: 50%;
  color:  #889AA7;
  padding-top: 10px;
  padding-left: 10px;
  font-size: 16px;
  /* border: solid 1px #889AA7; */
}
.top_t{
  width: 100%;
  height: calc( 100% - 60px);
}
.top_t p{
  font-size: 38px;
  padding: 0;
  line-height: 100px;
  font-weight: 600;
  color: #000;
  text-align: center;
}
.top_b{
  height: 60px;
  display: flex;
}
.top_b p{
  padding: 0;
  color: #000;
}
.top_b_l, .top_b_r{
  flex: 1;
}
.green{
  color: #24A2A1 !important;
}
.red{
  color: red !important;
}
.dataList{
  width: 100%;
  height: 200px;
  display: flex;
}
.list_item{
  width: 50%;
  height: 100%;
  /* border: solid 1px #000; */
  padding: 20px 20px;
}
.list_item .titme{
  font-size: 16px;
}
.number{
  font-size: 38px;
}
</style>
