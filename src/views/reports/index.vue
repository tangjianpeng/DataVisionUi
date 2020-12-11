<template>
  <div class="reports">
    <div class="reports-left">
      <div class="reports-tab">
        <el-tabs tab-position="left">
          <el-tab-pane label="最新报告"></el-tab-pane>
          <el-tab-pane label="热门报告"></el-tab-pane>
          <el-tab-pane label="整体市场报告"></el-tab-pane>
          <el-tab-pane label="SUV市场报告"></el-tab-pane>
          <el-tab-pane label="轿车市场报告"></el-tab-pane>
          <el-tab-pane label="新能源市场报告"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="reports-center">
      <div
        class="info-box"
        v-for="(item, idx) in data"
        :key="idx"
        @click="() => toDetail(item)"
        v-if="showList"
      >
        <img class="info-icon" :src="item.bg" />
        <h3>
          {{ item.title }}
        </h3>
        <div class="info-money">
          <span>售价</span>
          <img src="./renminbi.png" />
          <span>{{ item.money }}</span>
        </div>
      </div>
      <div class="info-onload" v-if="showList">
        <el-button type="success" @click="onload" round>加载更多</el-button>
      </div>
      <div class="info-detail" v-if="!showList">
        <div class="detail-back" @click="onBack" />
        <h2>{{ detail.title }}</h2>
        <img class="detail-img" :src="detail.bg" />
        <div class="detail-bottom">
          <div>页数：{{ detail.pageSize }}</div>
          <div>文档大型：{{ detail.fileSize }}</div>
          <div class="detail-bottom-money">¥{{ detail.money }}立即购买</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let data = [];
while (data.length < 6) {
  data.push({
    title: "2020年8月乘用车整体市场销量报告",
    bg: require("./bg.jpg"),
    money: 999,
    pageSize: 10,
    fileSize: "10M",
  });
}

export default {
  name: "reports",
  data() {
    return {
      data,
      showList: true,
      detail: {},
    };
  },
  mounted() {},
  methods: {
    toDetail(item) {
      this.detail = item;
      this.showList = false;
    },
    onBack() {
      this.showList = true;
    },
    onload() {
      this.data = this.data.concat(this.data.slice(-3));
    },
  },
};
</script>

<style lang="scss" scoped>
.reports {
  display: flex;
}

.reports {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.reports-left {
  width: 400px;
  height: 100%;
  // padding-top: 60px;
  // padding-left: 100px;
}
.reports-tab {
  position: fixed;
  top: 100px;
  left: 150px;
  bottom: 50px;
  width: 200px;
}
.reports-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  width: 0;
}
.reports-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__item {
  padding-right: 60px;
  line-height: 60px;
  height: 60px;
  font-size: 16px;
  font-weight: bold;
}
.reports-left
  >>> .el-tabs--left
  .el-tabs__nav-wrap.is-left
  .el-tabs__active-bar {
  width: 3px;
  height: 40px !important;
  margin-top: 10px;
}
.reports-center {
  flex: 1;
  padding: 30px 100px 50px 0px;
}
.info-box {
  position: relative;
  float: left;
  width: 33%;
  padding: 20px;
}
.info-icon {
  width: 100%;
}
.info-icon + h3 {
  border-top: 1px solid #dfdfdf;
  line-height: 40px;
  font-size: 16px;
  margin: 10px 0 0;
}
.info-money {
  line-height: 16px;
}
.info-money span {
  color: red;
  vertical-align: top;
  line-height: 16px;
}
.info-money img {
  width: 16px;
  height: 16px;
  vertical-align: bottom;
}
.info-content {
  padding-right: 200px;
  color: #999;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 8px;
}
.info-bottom {
  display: flex;
}
.info-tab {
  margin-right: 30px;
  padding: 4px 10px;
  font-size: 12px;
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
}
.info-orign {
  padding: 4px 10px;
  margin-right: 30px;
  font-size: 12px;
  color: #999;
}
.info-date {
  padding: 4px 10px;
  margin-right: 30px;
  font-size: 12px;
  color: #999;
}
.info-num {
  flex: 1;
  padding: 4px 10px;
  font-size: 12px;
  color: #999;
}
.info-onload {
  padding: 20px;
  text-align: center;
}
.info-detail {
  position: relative;
}
.detail-bottom {
  overflow: hidden;
  padding: 10px 0;
}
.detail-bottom div {
  float: left;
  font-size: 16px;
  line-height: 18px;
  color: #333;
  padding: 4px 24px 4px 0;
}
.detail-bottom .detail-bottom-money {
  float: right;
  font-size: 12px;
  padding: 4px 12px;
  color: #f1f1f1;
  background: #d33;
  border-radius: 4px;
}
.detail-back {
  position: absolute;
  top: 0;
  right: 0;
  width: 48px;
  height: 48px;
  cursor: pointer;
  background: url("./back.png") 0 0 no-repeat;
  background-size: 100% 100%;
}
.detail-top {
  display: flex;
}
.detail-content {
  margin: 30px 0;
  padding: 30px;
  background: #f6f6f6;
  color: #999;
  font-size: 16px;
  line-height: 32px;
  border-radius: 12px;
}
.detail-img {
  width: 100%;
  border-radius: 20px;
}
.detail-bottom {
  padding-bottom: 20px;
}
</style>
