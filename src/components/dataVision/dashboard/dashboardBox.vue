<template>
  <div class="center_box">
    <div class="top_box" v-show="all.includes(this.sourceType)">
      <dataEcharts
        ref="dataEcharts"
        :time="time"
        :times="times"
      ></dataEcharts>
    </div>
    <div class="dataTable" v-show="!all.includes(this.sourceType)">
      <div class="dataBtn">
        <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
          <el-tab-pane v-for="(item, index) in btnData" :key="index" :label="item" :name="item"></el-tab-pane>
          <el-select v-model="activeName_" filterable placeholder="请选择" @change="handleClicks">
            <el-option
              v-for="(item, index) in options"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-tabs>
      </div>
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
    </div>
    <div class="table_box">
      <p>{{province_.includes(sourceType)?`${times}年`:data_t.text}}厂商排名</p>
      <el-table
        :data="tableData_mn"
        height="500px"
        border
        v-loading="loading2"
        style="width: 100%">
        <el-table-column
          type="index"
          label="排名"
          width="100">
        </el-table-column>

        <el-table-column
          prop="manfName"
          label="厂商"
          >
        </el-table-column>
        <el-table-column
          prop="salesQty"
          label="销量（辆）"
          >
        </el-table-column>
        <el-table-column
          prop="morMonth"
          label="环比增速"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="yorYear"
          label="年累计同比"
          v-if="province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="yorYear"
          label="同比增速"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="totalShare"
          label="年累计份额"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
      </el-table>

      <p>{{province_.includes(sourceType)?`${times}年`:data_t.text}}车型排名</p>
      <el-table
        :data="tableData_sn"
        height="500px"
        border
        v-loading="loading1"
        style="width: 100%">
        <el-table-column
          type="index"
          label="排名"
          width="100">
        </el-table-column>

        <el-table-column
          prop="subModelName"
          label="车型"
          >
        </el-table-column>
        <el-table-column
          prop="salesQty"
          label="销量（辆）"
          >
        </el-table-column>
        <el-table-column
          prop="morMonth"
          label="环比增速"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="yorYear"
          label="年累计同比"
          v-if="province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="yorYear"
          label="同比增速"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
        <el-table-column
          prop="totalShare"
          label="年累计份额"
          v-if="!province_.includes(sourceType)"
          >
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { salesRatio, ranking, dvProvince, dvCity } from "@/api/data";
import dataEcharts from '@/components/dataVision/dashboard/dataEcharts'
export default {
  name: 'dashboard',
  components: {
    dataEcharts
  },
  data() {
    return {
      loading2: false,
      loading1: false,
      all: ['car2','energy2', 'ownership_2'],
      Sales: '',
      tableData_mn: [],
      tableData_sn: [],
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
      carData:{
        car3: 'provinceName',
        car4: 'cityName',
        energy3: 'provinceName',
        energy4: 'cityName',
        ownership_3: 'provinceName',
        ownership_4: 'cityName',
      },
      city:['car4','energy4','ownership_4'],
      province: ['car3','energy3','ownership_3'],
      province_: ['ownership_2','ownership_3','ownership_4'],
      cityData: ['北京市','上海市','广州市','深圳市'],
      cityName: '北京市',
      provinceName: '广东省',
      provinceData: ['广东省','江苏省','山东省'],
      cityDataSlt: [],//城市下拉选择数据
      provinceDataSlt: [],//省份下拉选择数据
      sourceType: 'car2',
      activeName: '',
      activeName_: '',
      btnData:[],
      selectData: [],
      options: [],
      data_t: {},
      dataAll: [],
      initData: [],
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
    //省份
    dvProvince({type:'0'}).then(res=>{
      this.provinceDataSlt = res.data || [];
      let name = this.$route.query.item || null;
      if(this.province.includes(this.initData) && name){
        this.options = this.provinceDataSlt || [];
      }
    });
    //城市
    dvCity({type:'0'}).then(res=>{
      this.cityDataSlt = res.data || [];
      let name = this.$route.query.item || null;
      if(this.city.includes(this.initData) && name){
        this.options = this.cityDataSlt || [];
      }
    });

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
    handleClick(){
      this.activeName_ = '';
      this.ranking();
      this.salesRatio();
    },
    handleClicks(){
      this.activeName = '';
      this.ranking();
      this.salesRatio();
    },
    init(data) {
      this.initData = data;
      if(this.city.includes(data)){
        this.btnData = this.cityData;
        this.options = this.cityDataSlt || [];
        this.activeName = '北京市';
      }else if(this.province.includes(data)){
        this.btnData = this.provinceData;
        this.options = this.provinceDataSlt || [];
        this.activeName = '广东省'
      }else{
        this.activeName = ''
      }
      this.sourceType = data;
      this.ranking();
      if(this.all.includes(data)){
        this.dataEchartsInit();
      }else{
        // this.salesRatio();
      }
      this.salesRatio();
    },
    dataEchartsInit(){
      this.$refs.dataEcharts.init(this.sourceType);
    },
    salesRatio(){
      let salesRatioData = {
        sourceType: this.car[this.sourceType],
      }
      let carData = this.carData[this.sourceType];
      salesRatioData[carData] = this.activeName || this.activeName_;
      if(this.province_.includes(this.sourceType)){
        salesRatioData.beginDate = this.times;
      }else{
        salesRatioData.beginDate = this.time;
      }
      salesRatio(salesRatioData).then(res =>{
        if(res.code === 200 && res.data.length> 0){
          this.dataAll = res.data;
          this.data_t = res.data[0];
        }
      });
    },
    ranking() {
      this.loading1 = true;
      this.loading2 = true;
      let data_mn = {
        sourceType: this.car[this.sourceType],
        type: 'MN',
      }
      let data_sn = {
        sourceType: this.car[this.sourceType],
        type: 'SN',
      }
      let carData = this.carData[this.sourceType];
      data_mn[carData] = this.activeName || this.activeName_;
      data_sn[carData] = this.activeName || this.activeName_;
      if(this.province_.includes(this.sourceType)){
        data_mn.beginDate = this.times;
        data_sn.beginDate = this.times;
      }else{
        data_mn.beginDate = this.time;
        data_sn.beginDate = this.time;
      }
      //厂商
      ranking(data_mn).then(res=>{
        this.loading1 = false;
        this.tableData_mn = res.data || [];
      })
      //车型

      ranking(data_sn).then(res=>{
        this.loading2 = false;
        this.tableData_sn = res.data || [];
      })
    }
  },
}
</script>

<style  scoped>
.center_box{
  width: 100%;
  height: 100%;
}
.top_box{
  width: 100%;
}
/* .top_Data{
  width: 100%;
  height: 300px;
} */
.table_box{
  width: 100%;
}
.dataBtn{
  height: 60px;
  padding-top: 20px;
}
.dataTable >>> .el-tabs__header{
  float: left;
  margin-right: 20px;
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
.green{
  color: #24A2A1 !important;
  margin: 0 20px;
}
.red{
  color: red !important;
  margin: 0 20px;
}
</style>
