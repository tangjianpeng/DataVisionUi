<template>
  <div class="center_">
    <h5 class="title">{{dataVal.textData[this.onClickData]}}
      <span>覆盖全市场销量数据，每月15日更新</span>
    </h5>
    <div class="selectionBox">
      <el-tabs lazy v-model="activeName" @tab-click="handleClick">
        <el-tab-pane v-for="(item, index) in tableData" :key="index" 
        :label="item.lable"
        :name="item.name"
        ></el-tab-pane>
      </el-tabs>
      <carData
      ref="carData"
      :timeData="timeData"
      :stockTime='stockTime'
      ></carData>
    </div>
  </div>
</template>

<script>
import { dvIndustry } from "@/api/data";
import dataVal from '../../../store/dataVal'
import carData from '@/components/dataVision/table/car'
export default {
  name: 'car',
  data() {
    return {
      loading: false,
      activeName: '',
      dataVal,
      tableData: [],
      sourceType: '',
      onClickData: '',
    }
  },
  props: ['timeData','stockTime'],
  components: {
    carData
  },
  methods: {
    init(data){
      this.onClickData = data;
      this.sourceType = dataVal.sourceType[data];
      this.tabChange();
      this.$refs.carData.init(this.activeName,this.sourceType);
    },
    handleClick(data) {
      this.$refs.carData.init(this.activeName,this.sourceType);
    },
    tabChange() {
      this.tableData = this.dataVal.tabData[this.onClickData];
      this.activeName = this.tableData[0].name; 
    }
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
.selectionBox >>> .el-tabs__nav-scroll{
  padding-left: 20px;
}
</style>

