<template>
  <div class="center_">
    <h5 class="title">城市汽车销量
      <span>全品牌、地级市新车零售量，每月15日左右更新</span>
    </h5>
    <div class="selectionBox">
      <div class="selecItem">
        <div class="selecItem_l">时间</div>
        <div class="selecItem_r">
          <el-date-picker
            v-model="itemData.beginDate"
            type="month"
            value-format="yyyy-M"
            placeholder="选择月"
            :picker-options="startTimePicker">
          </el-date-picker>
          <span> - </span>
          <el-date-picker
            v-model="itemData.endDate"
            type="month"
            value-format="yyyy-M"
            placeholder="选择月"
            :picker-options="endTimePicker">
          </el-date-picker>
        </div>
      </div>
      <div class="selecItem">
        <div class="selecItem_l">品牌车型</div>
        <div class="selecItem_r">
          <el-select v-model="itemData.brandName" multiple collapse-tags filterable style="width:240px" placeholder="选择品牌">
            <el-option
              v-for="item in carBrand"
              :key="item.bcode"
              :label="item.bname"
              :value="item.bname">
            </el-option>
          </el-select>
          <el-select v-model="itemData.subModelName" multiple collapse-tags filterable style="width:240px" placeholder="选择车型">
            <el-option
              v-for="item in carSeries"
              :key="item.scode"
              :label="item.sname"
              :value="item.sname">
            </el-option>
          </el-select>
        </div>
      </div>
      <div class="selecItem">
        <div class="selecItem_l">省份城市</div>
        <div class="selecItem_r">
          <el-select v-model="itemData.provinceName" multiple collapse-tags filterable class="el-select_box" style="width:240px" placeholder="选择省份">
            <el-option
              v-for="(item, index) in province"
              :key="index"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
          <el-select v-model="itemData.cityName"  multiple collapse-tags filterable  style="width:240px" placeholder="选择城市">
            <el-option
              v-for="item in cityName"
              :key="item.id"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
      <div class="checkboxBox">
        <div class="checkbox_l">
          <el-button type="primary"  @click="search">查 询</el-button>
        </div>

        <div class="checkbox_item">
          <el-checkbox-group v-model="checkList">
            <el-checkbox disabled label="ym_id">年月</el-checkbox>
            <el-checkbox label="province_name">省份</el-checkbox>
            <el-checkbox label="city_name">城市</el-checkbox>
            <el-checkbox label="manf_name">厂商</el-checkbox>
            <el-checkbox label="brand_name">品牌</el-checkbox>
            <el-checkbox label="sub_model_name">车型</el-checkbox>
            <el-checkbox label="tran_type_name">排挡</el-checkbox>
            <el-checkbox label="engine_type_name">排量</el-checkbox>
            <el-checkbox label="fuel_type_name">燃料类型</el-checkbox>
            <el-checkbox label="manf_prop_name" >厂商属性</el-checkbox>
            <el-checkbox label="brand_orig_name">品牌血统</el-checkbox>
            <el-checkbox label="vehicle_func_name">汽车类别</el-checkbox>
            <el-checkbox label="segment_name">汽车类型</el-checkbox>
            <el-checkbox label="segment_full_name">细分市场</el-checkbox>

          </el-checkbox-group>
        </div>
      </div>
      <div class="table">
        <el-table
          :data="volumeList"
          v-loading="loading"
          height="calc(100vh - 150px)"
          style="width: 100%">
          <el-table-column
            v-if="checkList.includes('ym_id')"
            prop="ymId"
            label="年月"
            width="100">
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('province_name')"
            prop="provinceName"
            label="省份"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('city_name')"
            prop="cityName"
            label="城市"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('manf_name')"
            prop="manfName"
            label="厂商"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('brand_name')"
            prop="brandName"
            label="品牌"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('sub_model_name')"
            prop="subModelName"
            label="车型"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('tran_type_name')"
            prop="tranTypeName"
            label="排挡"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('engine_type_name')"
            prop="engineTypeName"
            label="排量"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('fuel_type_name')"
            prop="fuelTypeName"
            label="燃料类型"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('manf_prop_name')"
            prop="manfPropName"
            label="厂商属性"
            width="80">
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('brand_orig_name')"
            prop="brandOrigName"
            label="品牌血统"
            width="80">
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('vehicle_func_name')"
            prop="vehicleFuncName"
            label="汽车类别"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('segment_name')"
            prop="segmentName"
            label="汽车类型"
            >
          </el-table-column>
          <el-table-column
            v-if="checkList.includes('segment_full_name')"
            prop="segmentFullName"
            label="细分市场"
            >
          </el-table-column>
          <el-table-column
            prop="salesQty"
            label="数量"
            width="100"
            >
          </el-table-column>
        </el-table>
        <pagination
          v-show="total>0"
          :total="total"
          :page.sync="queryParams.pageNum"
          :limit.sync="queryParams.pageSize"
          @pagination="getList"
          :disabled="!authority"
        />
      </div>
  </div>
</template>

<script>
import { dvIndustry, dvProvince, dvCity, dvCarBrand, salesVolumeList, volumeList, dvCarSeries,dateRanges } from "@/api/data";
export default {
  name: '',
  data() {
    return {
      loading: false,
      itemData: {
        beginDate: '',// 时间
        endDate: '', // 时间
        provinceName: [],
        cityName: [],
        brandName: [],
        subModelName: [],
      },
      checkList: ['ym_id', 'province_name', 'city_name', 'manf_name', 'brand_name', 'manf_prop_name', 'brand_orig_name', 'segment_name', 'sub_model_name', 'segment_full_name', 'fuel_type_name', 'vehicle_func_name', 'engine_type_name', 'tran_type_name'],
      tableData: [],
      province: [],
      cityName: [],
      carBrand: [],
      carSeries: [],//车型
      volumeList: [],
      total: 1,
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined
      },
    }
  },
  props: {
    authority: {
      type: Boolean,
      default: () => false,
    }
  },
  mounted() {
    this.dateRanges();
    this.dvProvince();
    this.dvCarBrand();
    // this.salesVolumeList()

  },
  methods: {
    //查询
    search(){
      if(this.authority){
        this.salesVolumeList();
        return;
      }
      this.$emit('messageBox')
    },

    //获取日历范围
    dateRanges() {
      dateRanges().then(res=>{
        if(res.code == 200){
          this.beginDate = res.data[0].beginDate;
          this.endDate = res.data[0].endDate;
          this.itemData.beginDate = res.data[0].endDate;
          this.itemData.endDate = res.data[0].endDate;
          this.salesVolumeList()
        }
      })
    },


    // 选择品牌
    dvCarBrand() {
      dvCarBrand().then( res => {
        this.carBrand = res.data || [];
      })
    },
    //选择车型
    dvCarSeries(data) {
      dvCarSeries({bname: data}).then( res => {
        this.carSeries = res.data || [];
      })
    },
    // 选择省份
    dvProvince() {
      dvProvince({}).then( res => {
        this.province = res.data || [];
      })
    },
    // 选择城市
    dvCity(name) {
      dvCity( {name: name} ).then( res => {
        this.cityName = res.data || [];
      })
    },
    // 获取数据
    salesVolumeList() {
      this.loading = true;
      let data = {
        beginDate:  this.itemData.beginDate,
        endDate: this.itemData.endDate,
        provinceName:  this.itemData.provinceName.join(),
        cityName: this.itemData.cityName.join(),
        brandName: this.itemData.brandName.join(),
        subModelName: this.itemData.subModelName.join(),
        columnName: this.checkList.join(),
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize
      }
      if(this.authority){
        salesVolumeList(data).then( res => {
          this.loading = false;
          this.total = res.total || 1 ;
          this.volumeList = res.rows || []
        })
        return;
      }
      volumeList(data).then( res => {
        this.loading = false;
        this.total = res.total || 1 ;
        this.volumeList = res.rows || []
      })
    },
    getList(data) {
      this.queryParams.pageNum = data.page;
      this.queryParams.pageSize = data.limit;
      this.salesVolumeList()
    }
  },
  watch: {
    'itemData.provinceName': function(data) {
      let res = data.join();
      if(res){
        this.dvCity(res)
      }
    },
    'itemData.brandName': function(data) {
      let res = data.join();
      if(res){
        this.dvCarSeries(res)
      }
    }
  },
  computed: {

    startTimePicker() {
      return {
        disabledDate: time => (
          this.beginDate ? time.getTime() > new Date(this.endDate).getTime() || time.getTime() < new Date(this.beginDate).getTime() : true),
      };
    },
    endTimePicker() {
      return {
        disabledDate: time => (
          this.endDate ? time.getTime() > new Date(this.endDate).getTime() || time.getTime() < new Date(this.beginDate).getTime() : true),
      };
    },

  },
}
</script>

<style scoped>
.center_{
  width: 100%;
  height: 100%;
}
.title{
  width: 100%;
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: 650;
  margin: 0;
  padding: 10px 0;
  line-height: 1.2;
  text-align: left;
}
.title span{
  font-weight: 400;
  font-size: 14px;
  margin-left: 10px;

}
.selecItem{
  height: 52px;
  width: 100%;
  display: flex;
  border-bottom: solid 1px #f5f5f5;
}
.selectionBox{
  width: 100%;
  /* border: solid 1px #f5f5f5; */
  box-shadow:0px 2px 4px 0px rgba(0,0,0,0.12),0px 0px 6px 0px rgba(0,0,0,0.04);
}
.selecItem_l{
  width: 120px;
  height: 100%;
  font-size: 14px;
  line-height: 52px;
  text-align: right;
  padding-right: 20px;
  background-color: #f2f3f5;
}
.selecItem_r{
  height: 100%;
  width: calc(100% - 120px);
  padding-left: 20px;
  line-height: 52px;
}
.table{
  width: 100%;
  /* height: 50%; */
}
.checkboxBox{
  /* padding-left: 140px; */
  position: relative;
  padding-left: 100px;
  min-height: 48px;
}
.checkbox_l{
  position: absolute;
  left: 10px;
  top: 50%;
  margin-top: -18px;
}
.checkbox_l >>> .el-button{
  background-color: #24A2A1;
  border-color: #24A2A1;
}
.checkbox_item >>>  .el-checkbox__input.is-checked .el-checkbox__inner {
  background-color: #24A2A1;
  border-color: #24A2A1;
}
.checkbox_item >>>  .el-checkbox__input.is-checked+.el-checkbox__label{
  color: #24A2A1;
}
.checkbox_item{
  /* height: 100px; */
  padding-top: 15px;
}
.checkbox_item >>> .el-checkbox{
  padding-bottom: 10px;
  margin-right: 15px;
}
.center_ >>> .pagination-container{
  padding: 0 !important;
  height: 32px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.table >>> .el-table .el-table__header-wrapper th{
  background-color: #f2f3f5;
}
.table >>> .el-pagination.is-background .el-pager li:not(.disabled).active{
  background-color: #24A2A1;
}
</style>

