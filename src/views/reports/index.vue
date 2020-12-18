<template>
  <div class="container">
    <div class="container-left">
      <div class="container-left-tab">
        <el-tabs
          tab-position="left"
          v-model="noticeType"
          @tab-click="handleClick"
        >
          <el-tab-pane label="最新报告" name="0"></el-tab-pane>
          <el-tab-pane label="热门报告" name="5"></el-tab-pane>
          <el-tab-pane label="整体市场报告" name="1"></el-tab-pane>
          <el-tab-pane label="SUV市场报告" name="2"></el-tab-pane>
          <el-tab-pane label="轿车市场报告" name="3"></el-tab-pane>
          <el-tab-pane label="新能源市场报告" name="4"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="container-center">
      <div
        v-if="showMain"
        v-for="(item, idx) in data"
        :key="idx"
        class="content-box"
      >
        <img
          class="content-icon"
          :src="item.noticeTitleImg"
          @click="() => toDetail(item)"
        />
        <div class="content-title">
          {{ item.noticeTitle }}
        </div>
        <div class="content-money" v-if="item.noticeMoney">
          <span class="content-money-btn" @click="toBuy">
            <span>售价</span>
            <img src="./renminbi.png" />
            <span>{{ item.noticeMoney }}</span>
          </span>
        </div>
      </div>
      <div class="content-onload" v-if="showMain && showBtn">
        <el-button type="success" @click="onload" round>加载更多</el-button>
      </div>
      <div class="content-detail" v-if="!showMain">
        <div class="detail-back" @click="onBack" />
        <div class="content-title2">
          {{ detail.noticeTitle }}
        </div>
        <img class="detail-img" :src="detail.bg" />
        <div class="detail-bottom">
          <div>页数：{{ detail.noticePage }}</div>
          <div>文档大型：{{ detail.noticeSize }}</div>
          <div
            class="detail-bottom-money"
            @click="toBuy"
            v-if="detail.noticeMoney"
          >
            ¥{{ detail.noticeMoney }}立即购买
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { report } from "@/api/data";

const tabType = {
  "5": "热门报告",
  "1": "整体市场报告",
  "2": "SUV市场报告",
  "3": "轿车市场报告",
  "4": "新能源市场报告",
};

export default {
  name: "reports",
  data() {
    return {
      showMain: true,
      data: [],
      detail: {},
      noticeType: "0",
      pageNum: 1,
      pageSize: 9,
      showBtn: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      report({
        pageNum: this.pageNum || 1,
        pageSize: this.pageSize,
        noticeType: this.noticeType === "0" ? "" : this.noticeType,
      }).then((res) => {
        if (Array.isArray(res.rows)) {
          this.showBtn = res.rows.length === this.pageSize;
          this.data = this.data.concat(
            res.rows.map((v) => ({
              ...v,
              noticeType: v.noticeType ? tabType[v.noticeType] : "",
              noticeTitleImg: v.noticeTitleImg
                ? process.env.VUE_APP_BASE_API + v.noticeTitleImg
                : "",
            }))
          );
        }
      });
    },
    handleClick(tab) {
      this.pageNum = 1;
      this.data = [];
      this.showMain = true;
      this.getData();
    },
    toDetail(item) {
      this.detail = item;
      this.showMain = false;
    },
    toBuy() {
      this.$message.info("敬请期待...");
    },
    onBack() {
      this.showMain = true;
    },
    onload() {
      this.data = this.data.concat(this.data.slice(-5));
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.container-left {
  width: 260px;
  height: 100%;
}
.container-left-tab {
  position: fixed;
  top: 100px;
  left: 0px;
  bottom: 50px;
  width: 260px;
}
.container-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  width: 0;
}
.container-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__item {
  padding-right: 60px;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.container-left
  >>> .el-tabs--left
  .el-tabs__nav-wrap.is-left
  .el-tabs__active-bar {
  width: 3px;
  height: 40px !important;
  margin-top: 10px;
}
.container-center {
  flex: 1;
  padding: 30px 60px 20px;
}
.content-box {
  position: relative;
  float: left;
  width: 33%;
  padding: 20px;
}
.content-icon {
  cursor: pointer;
  display: block;
  width: 100%;
  height: 200px;
}
.content-title {
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 10px 0 0;
  height: 32px;
  line-height: 32px;
  font-size: 20px;
  font-weight: bold;
  border-top: 1px solid #dfdfdf;
}
.content-title2 {
  width: calc(100% - 180px);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin-bottom: 16px;
  font-size: 20px;
  font-weight: bold;
  height: 32px;
  line-height: 32px;
}
.content-money {
  height: 24px;
}
.content-money-btn {
  padding: 4px 10px;
  display: inline-block;
  border-radius: 4px;
  background: #f1f1f1;
  cursor: pointer;
}
.content-money-btn span {
  line-height: 16px;
  color: red;
  vertical-align: top;
  vertical-align: bottom;
}
.content-money-btn img {
  width: 16px;
  height: 16px;
  vertical-align: bottom;
}
.content-content {
  padding-right: 200px;
  color: #999;
  font-size: 14px;
  line-height: 18px;
  padding-bottom: 8px;
}
.content-bottom {
  display: flex;
}
.content-tab {
  margin-right: 30px;
  padding: 4px 10px;
  font-size: 12px;
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
}
.content-orign {
  padding: 4px 10px;
  margin-right: 30px;
  font-size: 12px;
  color: #999;
}
.content-date {
  padding: 4px 10px;
  margin-right: 30px;
  font-size: 12px;
  color: #999;
}
.content-num {
  flex: 1;
  padding: 4px 10px;
  font-size: 12px;
  color: #999;
}
.content-onload {
  float: left;
  width: 100%;
  padding: 20px 100px 20px 0px;
  text-align: center;
}
.content-detail {
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
  cursor: pointer;
  float: right;
  font-size: 12px;
  padding: 4px 12px;
  color: #f1f1f1;
  background: #d33;
  border-radius: 4px;
}
.detail-back {
  position: absolute;
  top: -4px;
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
