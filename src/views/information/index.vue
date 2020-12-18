<template>
  <div class="container">
    <div class="container-left">
      <div class="container-left-tab">
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
    <div class="container-center">
      <div
        class="content-box"
        v-for="(item, idx) in data"
        :key="idx"
        @click="() => toDetail(item)"
        v-if="showMain"
      >
        <img
          class="content-icon"
          v-if="item.noticeTitleImg"
          :src="item.noticeTitleImg"
        />
        <div class="content-title">
          {{ item.noticeTitle }}
        </div>
        <div class="content-summary">{{ item.noticeSynopsis }}</div>
        <div class="content-bottom">
          <div class="content-tab" v-if="item.noticeType">
            {{ item.noticeType }}
          </div>
          <div class="content-orign" v-if="item.createBy">
            {{ item.createBy }}
          </div>
          <div class="content-date" v-if="item.createTime">
            {{ item.createTime }}
          </div>
          <div class="content-num" v-if="item.searchValue">
            {{ item.searchValue }}
          </div>
          <div />
        </div>
      </div>
      <div class="content-onload" v-if="showMain && showBtn">
        <el-button type="success" @click="onload" round>加载更多</el-button>
      </div>
      <div class="content-detail" v-if="!showMain">
        <div class="detail-back" @click="onBack" />
        <div class="content-title">
          {{ detail.noticeTitle }}
        </div>
        <div class="detail-top">
          <div class="content-tab" v-if="detail.noticeType">
            {{ detail.noticeType }}
          </div>
          <div class="content-orign" v-if="detail.createBy">
            {{ detail.createBy }}
          </div>
          <div class="content-date" v-if="detail.createTime">
            {{ detail.createTime }}
          </div>
          <div class="content-num" v-if="detail.searchValue">
            {{ detail.searchValue }}
          </div>
        </div>
        <div class="detail-content">
          {{ detail.noticeSynopsis }}
        </div>
        <div class="detail-bottom" v-html="detail.noticeContent"></div>
      </div>
    </div>
    <div class="container-right">
      <div class="poster" :style="`background-image:url( ${posterImg})`"></div>
    </div>
  </div>
</template>

<script>
import { info, poster } from "@/api/data";

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
      posterImg: "",
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
    poster()
      .then((res) => {
        if (res.data[0] && res.data[0].noticeTitleImg) {
          this.posterImg =
            process.env.VUE_APP_BASE_API + res.data[0].noticeTitleImg;
        }
      })
      .catch((err) => {});
  },
  methods: {
    getData() {
      info({
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
  left: 60px;
  bottom: 50px;
  width: 200px;
}
.container-left-tab >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  width: 0;
}
.container-left-tab
  >>> .el-tabs--left
  .el-tabs__nav-wrap.is-left
  .el-tabs__item {
  padding-right: 60px;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.container-left-tab
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
  width: 100%;
  padding: 16px 0;
  border-bottom: 1px solid #dfdfdf;
}
.content-icon {
  display: block;
  position: absolute;
  top: 30px;
  right: 8px;
  width: 150px;
  height: 100px;
}
.content-title {
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
.content-summary {
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
.content-bottom {
  display: flex;
  margin-top: 16px;
  align-content: center;
  align-items: center;
}
.content-tab {
  margin-right: 30px;
  padding: 0px 10px;
  font-size: 12px;
  line-height: 22px;
  color: #999;
  border: 1px solid #999;
  border-radius: 5px;
}
.content-orign {
  margin-right: 30px;
  padding: 0px 10px 0px 24px;
  font-size: 14px;
  line-height: 24px;
  color: #999;
  background: url("./user.png") 0 2px no-repeat;
  background-size: 20px 20px;
}
.content-date {
  margin-right: 30px;
  padding: 0px 10px 0px 24px;
  font-size: 14px;
  line-height: 24px;
  color: #999;
  background: url("./time.png") 0 2px no-repeat;
  background-size: 20px 20px;
}
.content-num {
  flex: 1;
  padding: 4px 10px;
  font-size: 12px;
  color: #999;
}
.content-onload {
  padding: 20px;
  text-align: center;
}
.content-detail {
  position: relative;
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
.container-right {
  width: 400px;
  height: 100%;
}
.poster {
  display: block;
  position: fixed;
  top: 100px;
  right: 50px;
  bottom: 50px;
  width: 300px;
  // background-image: url("../../assets/image/haibao.jpg");
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}
</style>
