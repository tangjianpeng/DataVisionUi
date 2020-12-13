<template>
  <div class="information">
    <div class="information-left">
      <div class="information-tab">
        <el-tabs
          tab-position="left"
          v-model="noticeType"
          @tab-click="handleClick"
        >
          <el-tab-pane label="最新发布" name="0"></el-tab-pane>
          <el-tab-pane label="行业政策" name="1"></el-tab-pane>
          <el-tab-pane label="厂商动态" name="2"></el-tab-pane>
          <el-tab-pane label="车市行情" name="3"></el-tab-pane>
          <el-tab-pane label="新能源车" name="4"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="information-center">
      <div
        class="info-box"
        v-for="(item, idx) in data"
        :key="idx"
        @click="() => toDetail(item)"
        v-if="showMain"
      >
        <img
          class="info-icon"
          v-if="item.noticeTitleImg"
          :src="item.noticeTitleImg"
        />
        <div class="info-title">
          {{ item.noticeTitle }}
        </div>
        <div class="info-summary">{{ item.summary }}</div>
        <div class="info-bottom">
          <div class="info-tab" v-if="item.noticeType">
            {{ item.noticeType }}
          </div>
          <div class="info-orign" v-if="item.createBy">
            {{ item.createBy }}
          </div>
          <div class="info-date" v-if="item.createTime">
            {{ item.createTime }}
          </div>
          <div class="info-num" v-if="item.searchValue">
            {{ item.searchValue }}
          </div>
          <div />
        </div>
      </div>
      <div class="info-onload" v-if="showMain && showBtn">
        <el-button type="success" @click="onload" round>加载更多</el-button>
      </div>
      <div class="info-detail" v-if="!showMain">
        <div class="detail-back" @click="onBack" />
        <div class="info-title">
          {{ detail.noticeTitle }}
        </div>
        <div class="detail-top">
          <div class="info-tab" v-if="detail.noticeType">
            {{ detail.noticeType }}
          </div>
          <div class="info-orign" v-if="detail.createBy">
            {{ detail.createBy }}
          </div>
          <div class="info-date" v-if="detail.createTime">
            {{ detail.createTime }}
          </div>
          <div class="info-num" v-if="detail.searchValue">
            {{ detail.searchValue }}
          </div>
        </div>
        <div class="detail-content">
          {{ detail.summary }}
        </div>
        <div class="detail-bottom" v-html="detail.noticeContent"></div>
      </div>
    </div>
    <div class="information-right">
      <div class="poster"></div>
    </div>
  </div>
</template>

<script>
import { info } from "@/api/data";

const tabType = {
  "1": "行业政策",
  "2": "厂商动态",
  "3": "车市行情",
  "4": "新能源车",
};

export default {
  name: "information",
  data() {
    return {
      showMain: true,
      data: [],
      detail: {},
      noticeType: "0",
      pageNum: 1,
      pageSize: 10,
      showBtn: false,
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      info({
        pageNum: this.pageNum || 1,
        pageSize: this.pageSize || 10,
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
              summary:
                "此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，此处是简介，",
            }))
          );
        }
      });
    },
    handleClick(tab) {
      this.pageNum = 1;
      this.pageSize = 10;
      this.data = [];
      this.getData();
    },
    toDetail(item) {
      this.detail = item;
      this.showMain = false;
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
.information {
  display: flex;
}

.information {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.information-left {
  width: 300px;
  height: 100%;
}
.information-tab {
  position: fixed;
  top: 100px;
  left: 50px;
  bottom: 50px;
  width: 200px;
}
.information-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  width: 0;
}
.information-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__item {
  padding-right: 80px;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.information-left
  >>> .el-tabs--left
  .el-tabs__nav-wrap.is-left
  .el-tabs__active-bar {
  width: 3px;
  height: 40px !important;
  margin-top: 10px;
}
.information-center {
  flex: 1;
  padding: 30px 100px 50px;
}
.info-box {
  position: relative;
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #dfdfdf;
}
.info-icon {
  display: block;
  position: absolute;
  top: 40px;
  right: 8px;
  width: 160px;
  height: 100px;
}
.info-title {
  display: block;
  margin-bottom: 16px;
  font-size: 1.17em;
  font-weight: bold;
}
.info-summary {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  padding: 0px 200px 0px 0px;
  min-height: 60px;
  color: #999;
  font-size: 14px;
  line-height: 20px;
}
.info-bottom {
  display: flex;
  margin-top: 16px;
  align-content: center;
  align-items: center;
}
.info-tab {
  margin-right: 30px;
  padding: 0px 10px;
  font-size: 12px;
  line-height: 22px;
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
}
.info-orign {
  margin-right: 30px;
  padding: 0px 10px 0px 24px;
  font-size: 14px;
  line-height: 24px;
  color: #999;
  background: url("./user.png") 0 2px no-repeat;
  background-size: 20px 20px;
}
.info-date {
  margin-right: 30px;
  padding: 0px 10px 0px 24px;
  font-size: 14px;
  line-height: 24px;
  color: #999;
  background: url("./time.png") 0 2px no-repeat;
  background-size: 20px 20px;
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
  margin: 24px 0;
  padding: 16px 32px;
  background: #f6f6f6;
  color: #999;
  font-size: 16px;
  line-height: 32px;
  border-radius: 12px;
}
.detail-img {
  display: block;
  width: 100%;
  border-radius: 20px;
}
.detail-bottom {
  padding-bottom: 20px;
}
.information-right {
  width: 400px;
  height: 100%;
}
.poster {
  position: fixed;
  top: 100px;
  right: 50px;
  bottom: 50px;
  width: 300px;
  background-image: url("../../assets/image/haibao.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}
</style>
