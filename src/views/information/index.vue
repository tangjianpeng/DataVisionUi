<template>
  <div class="information">
    <div class="information-left">
      <div class="information-tab">
        <el-tabs tab-position="left">
          <el-tab-pane label="最新发布"></el-tab-pane>
          <el-tab-pane label="行业政策"></el-tab-pane>
          <el-tab-pane label="厂商动态"></el-tab-pane>
          <el-tab-pane label="车市行情"></el-tab-pane>
          <el-tab-pane label="新能源车"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="information-center">
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
        <div class="info-content">
          {{ item.content }}
        </div>
        <div class="info-bottom">
          <div class="info-tab">{{ item.tab }}</div>
          <div class="info-orign">{{ item.orign }}</div>
          <div class="info-date">{{ item.date }}</div>
          <div class="info-num">{{ item.num }}</div>
          <div />
        </div>
      </div>
      <div class="info-onload" v-if="showList">
        <el-button type="success" @click="onload" round>加载更多</el-button>
      </div>
      <div class="info-detail" v-if="!showList">
        <div class="detail-back" @click="onBack" />
        <h2>{{ detail.title }}</h2>
        <div class="detail-top">
          <div class="info-tab">{{ detail.tab }}</div>
          <div class="info-orign">{{ detail.orign }}</div>
          <div class="info-date">{{ detail.date }}</div>
          <div class="info-num">{{ detail.num }}</div>
        </div>
        <div class="detail-content">
          {{ detail.content }}
        </div>
        <img class="detail-img" :src="detail.bg" />
        <div class="detail-bottom" v-html="detail.detail">
          {{ detail.detail }}
        </div>
      </div>
    </div>
    <div class="information-right">
      <div class="poster"></div>
    </div>
  </div>
</template>

<script>
let data = [];
while (data.length < 6) {
  data.push({
    title: "产品经理都应规避的四大傲慢与偏见",
    content:
      "傲慢与偏见作为自然规律是一定会存在的，但每位产品人都应采取一定方法规避它，以免我们对用户需求、产品逻辑和商业市场做出错误判断。本文总结了产品经理常常陷入的四大认知误区，希望能帮助我们今后尽量规避。",
    detail:
      '<p>世界上有两样东西会让智商瞬间下降：<span>一个是爱情，一个是傲慢</span>。</p><p>今日话题来源于我的日常反思，因为我在工作中总是不经意间表现出“傲慢”，倒不是对其他人居高临下的傲慢，而是始终秉持某些认知偏见。比如坚信好产品的自然增长动力而对运营同事的工作不以为意，比如对明星产品的爆火简单归因于它背后的资本力量，等等。</p><p>本文总结了产品经理常常陷入的四大认知误区，希望能帮助我们今后尽量规避。脉络如下：</p><ul><li>口碑为王≠口碑唯一；</li><li>对下沉市场的傲慢；</li><li>标签式的以偏概全；</li><li>拥抱而非俯视用户。</li></ul><h2 id="toc-1">口碑为王≠口碑唯一</h2><p>15年前的2004年，中国的电商产业还犹如一片荒漠，静静等待开垦。今天的电商巨无霸阿里和京东彼时刚见雏形，比较冒尖的只有当当和卓越网。</p><p>贝索斯洞察先机，决定携亚马逊进入中国市场。他先对当当网抛出了并购的橄榄枝，又以7500万美元的高价收购卓越网。既具备先发优势和经济实力，又有美国市场电商的成功经验，当时几乎所有人都觉得亚马逊中国会占据电商市场的大半壁江山。</p><p>但2019年7月18日，亚马逊已宣布停止为亚马逊中国网站上的第三方卖家提供卖家服务。虽然这不代表亚马逊完全退出了中国市场，但事实告诉我们亚马逊确实错失了中国电商市场。</p><p>为什么是这样的结果？原因是多方面的，但我认为最重要的因素是亚马逊中国沿用了美国总部的决策：<span>坚决不打折促销，也坚决不做广告。</span></p><p>与我一直以来信奉的“产品口碑为王”相似，亚马逊认为低价促销不是持续经营之道，应该坚持为客户提供真正的价值。所以它将大部分精力都放在了消费者很难看见的地方，比如仓储、物流体系的铺设，建成了亚马逊除美国本土之外最大的运营网络。</p><p>反观当时阿里和京东在忙什么，他们都在乐此不疲的打造购物节、狂欢节等各种促销日，在秒杀、闪购、全场三折、一折专区，各种限时促销和折上折，店铺满减，减了再减，眼花缭乱却热闹非凡，效果很好。</p><p><span>可能这种促销手段在这家体面的国际大公司看来有些低俗粗暴，但在中国市场十分奏效</span>。亚马逊坚持注重用户价值和长期发展，所以无论如何他们都不认可甚至不屑于这种做法。</p><p>然而这是一项十分理想化的决策。所谓<span>长期发展也是建立在多个短周期里的，如果短期都活不下去了谈何长期，如果长期活不下去又谈何实现价值。企业的目的是实现商业和用户价值，而不是体面地死去。</span></p><p>想要活下去就需要尽快让消费者感知到产品价值，最终在产品内部实现用户价值。对中国当时的国情来说，价格便宜就是第一王道。不做任何促销活动的亚马逊在这场价格战中十分落寞，它就像一个孤傲的王者，不争不抢，静静的等着消费者发现它的好，只是它没弄清楚对于中国消费者而言，便宜就是好。</p><p>坚决不打广告和不做促销是同样的一个错误。不给电商业务打广告是亚马逊全球统一的规定，中国市场也不愿例外。</p><p>但<span>只靠口碑宣传获客的速度太慢了，需要经过很长时间才能达到临界点爆发</span>，所谓增长黑客也需要在口碑的基础上，建立传播增长模型才能实现规模裂变式影响。但在这块肥肉市场里的竞争向来都是这么激烈，竞争对手都在想着法变着花样的铺天盖地打广告，一旦占据了用户心智并且形成用户习惯，亚马逊也就等不到这个临界点了。</p><p>2004年的风光和高调似乎是用作和今日对比的，等到2012年中国电商大战拉开序幕的时候，亚马逊甚至连参战的资格都没有了。</p><p>广告教父大卫·奥格威曾说过：<span>在现代商业世界里，当一个才华横溢的创造者是没用的，除非你能同时把你创造的东西推销出去。</span></p><p>默默无闻的产品缺乏生命力。产品创造的初衷是为了创造用户价值，单价值提高得很大，但覆盖的用户量很小，乘出来的总价值不高。</p><p><span>作为产品的创造者，放下唯口碑论的傲慢，主动接纳和思考或低俗或高端、但管用有价值的推广方式</span>。口碑为王，但不是唯一的关键要素，产品将前面的1打牢，再继续配合运营人员实现1后面的一个个0，共同创造商业成功。</p>',
    bg: require("./bg.jpg"),
    tab: "最新发布",
    orign: "汽车之家",
    date: "2020/02/02",
    num: 1050,
  });
}

export default {
  name: "information",
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
  // padding-top: 60px;
  // padding-left: 100px;
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
  padding: 24px 0;
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
