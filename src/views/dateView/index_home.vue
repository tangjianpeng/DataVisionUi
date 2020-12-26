<template>
  <div class="center_">
    <div class="carousel">
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <!--          <div class="swiper-slide">-->
          <!--            <img style="width:100%;" src="@/assets/image/index0.jpg" alt="">-->
          <!--          </div>-->
          <div class="swiper-slide">
            <img style="width: 100%;" src="@/assets/image/index3.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="@/assets/image/index2.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="@/assets/image/index1.jpg" alt />
          </div>
          <div class="swiper-slide">
            <img style="width: 100%;" src="@/assets/image/index4.jpg" alt />
          </div>
        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="box">
      <div class="echarts">
        <div class="echarts_item">
          <p class="p">乘用车整体市场销量数据</p>
          <div class="item_text">
            <div class="text_t_flex">
              <div class="flex_">
                <countTo
                  :startVal="0"
                  :endVal="Number(type2.industryQty) || 0"
                  :duration="2000"
                ></countTo>
                <p>{{ type2.dateName }}</p>
              </div>
              <div class="flex_">
                <span>
                  {{ type2.yearOnYear ? `${type2.yearOnYear}%` : "" }}
                </span>
                <p>{{ type2.yearOnYear ? `同比` : "" }}</p>
              </div>
              <div class="flex_">
                <span>
                  {{ type2.monthOnMonth ? `${type2.monthOnMonth}%` : "" }}
                </span>
                <p>{{ type2.monthOnMonth ? `环比` : "" }}</p>
              </div>
            </div>
            <img src="@/assets/image/v1.jpg" alt />
          </div>
          <span
            class="btn"
            @click="$router.push({ path: '/dashboard', query: { item: '1' } })"
            >查看详情</span
          >
        </div>
        <div class="echarts_item">
          <p class="p">城市汽车销量数据</p>
          <div class="item_text">
            <div class="text_t_flex">
              <div class="flex_">
                <countTo
                  :startVal="0"
                  :endVal="Number(type1.industryQty) || 0"
                  :duration="2000"
                ></countTo>
                <p v-show="type1.dateName">{{ type1.dateName }}城市销量</p>
                <p>{{ type1.cityName }}</p>
              </div>
            </div>
            <img src="@/assets/image/v2.jpg" alt />
          </div>
          <span
            class="btn"
            @click="$router.push({ path: '/dashboard', query: { item: '2' } })"
            >查看详情</span
          >
        </div>
        <div class="echarts_item">
          <p class="p">汽车保有量数据</p>
          <div class="item_text">
            <div class="text_t_flex">
              <div class="flex_">
                <countTo
                  :startVal="0"
                  :endVal="Number(type3.industryQty) || 0"
                  :duration="2000"
                ></countTo>
                <p v-show="type3.dateName">
                  全国狭义乘用车保有量{{ type3.dateName }}
                </p>
              </div>
            </div>
            <img src="@/assets/image/v3.jpg" alt />
          </div>
          <span
            class="btn"
            @click="$router.push({ path: '/dashboard', query: { item: '3' } })"
            >查看详情</span
          >
        </div>
      </div>
      <div :class="isMobile ? 'item_box_mobile' : 'item_box_pc'">
        <div class="item_list">
          <img src="@/assets/image/cyc.jpg" alt />
          <span class="title_">乘用车销量</span>
          <p class="text_">
            采用上险口径统计，覆盖全国、省份、城市维度，细分至品牌、车型、排挡、排量、燃料类型、细分市场等字段，每月15日左右更新
          </p>
          <span class="a" @click="$router.push({ path: '/dataQuery' })"
            >查看</span
          >
        </div>
        <div class="item_list">
          <img src="@/assets/image/xny.jpg" alt />
          <span class="title_">新能源销量</span>
          <p class="text_">
            采用上险口径统计，覆盖全国、省份、城市维度，细分至品牌、车型、排挡、排量、燃料类型、细分市场等字段，每月15日左右更新
          </p>
          <span
            class="a"
            @click="$router.push({ path: '/dataQuery', query: { item: '1' } })"
            >查看</span
          >
        </div>
        <div class="item_list">
          <img src="@/assets/image/syc.jpg" alt />
          <span class="title_">商用车销量</span>
          <p class="text_">
            商用车销量覆盖全国、省份、城市维度，细分至车辆型号、品牌、底盘型号、发动机型号、排量、使用性质等字段，每月15日左右更新
          </p>
          <span
            class="a"
            @click="$router.push({ path: '/dataQuery', query: { item: '2' } })"
            >查看</span
          >
        </div>
        <div class="item_list">
          <img src="@/assets/image/byl.jpg" alt />
          <span class="title_">汽车保有量</span>
          <p class="text_">
            根据统计多年的上险数统计分析得到细分至车型的城市保有量数据，每年1月份左右更新
          </p>
          <span
            class="a"
            @click="$router.push({ path: '/dataQuery', query: { item: '3' } })"
            >查看</span
          >
        </div>
      </div>
    </div>
    <div>
      <foot></foot>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
import { dvIndustry } from "@/api/data";
import foot from "./footer";
import "@/assets/swipe/swiper.min.css";
import "@/assets/swipe/swiper.min.js";

const isMobile =
  window.navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  ) !== null;
export default {
  name: "",
  components: {
    countTo,
    foot,
  },
  data() {
    return {
      data: "",
      type1: {},
      type2: {},
      type3: {},
      isMobile,
    };
  },
  mounted() {
    document.title = "数觉 DataVision - 汽车销量查询_汽车保有量";
    this.dvIndustry();
    this.init();
  },
  methods: {
    init() {
      new Swiper(".swiper-container", {
        autoplay: 3000,
        loop: true,
        pagination: ".swiper-pagination",
      });
    },
    // 获取数据
    dvIndustry() {
      dvIndustry().then((res) => {
        let data = res.data || [];
        this.type1 = data[0] || {};
        this.type2 = data[1] || {};
        this.type3 = data[2] || {};
      });
    },
  },
};
</script>

<style scoped>
p {
  margin: 0;
  padding: 0;
}
.center_ {
  width: 100%;
  height: 100%;
  overflow: auto;
  padding-top: 50px;
  /* background-color: #f2f2f2; */
}
.carousel {
  width: 100%;
  /* height: 500px; */
  margin-bottom: 50px;
  justify-content: center;
  align-items: center;
  display: flex;
  background-color: #f2f2f2;
  /* background-color: #021033; */
  /* overflow: hidden; */
}
.box {
  width: 1224px;
  margin: 0 auto;
}
.echarts {
  width: 100%;
  display: flex;
}
.echarts {
  width: 100%;
  display: flex;
}
.echarts_item {
  height: 500px;
  flex: 1;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  /* border: solid 1px #E5E5E5; */
  padding-bottom: 50px;
  position: relative;
  border-radius: 10px;
  margin-bottom: 50px;
}
.echarts .echarts_item:nth-child(2) {
  margin: 0 50px;
}
.item_text {
  width: 100%;
  padding-top: 15px;
  height: calc(100% - 50px);
  text-align: center;
}
.item_text .text_t_flex {
  display: flex;
  width: 100%;
  padding: 10px 20px;
  text-align: center;
}
.flex_ {
  flex: 1;
}
.flex_ span {
  font-size: 20px;
  display: inline-block;
  margin-bottom: 5px;
  font-weight: 600;
}
.flex_ p {
  font-size: 12px;
  margin-top: 5px;
}
.echarts_item .p {
  line-height: 50px;
  padding: 0;
  margin: 0;
  text-align: center;
  border-bottom: solid 1px #e5e5e5;
}
.echarts_item .btn {
  width: 100px;
  height: 30px;
  line-height: 30px;
  position: absolute;
  bottom: 20px;
  background-color: #24a2a1;
  color: #fff;
  font-size: 16px;
  text-align: center;
  border-radius: 10px;
  left: 50%;
  margin-left: -50px;
  cursor: pointer;
}
.item_box_pc,
.item_box_mobile {
  width: 100%;
  overflow: hidden;
  padding: 5px 2px;
}
.item_list {
  width: 550px;
  height: 160px;
  padding-left: 220px;
  position: relative;
  /* border: solid 1px #f5f5f5; */
  box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
  margin-bottom: 50px;
  cursor: pointer;
  padding-top: 20px;
}
.item_box_pc .item_list:nth-child(odd) {
  float: left;
}
.item_box_pc .item_list:nth-child(even) {
  float: right;
}

.item_list .a {
  color: #fff;
  width: 60px;
  height: 30px;
  position: absolute;
  right: 20px;
  bottom: 10px;
  background-color: #24a2a1;
  text-align: center;
  border-radius: 15px;
  line-height: 30px;
  font-size: 16px;
}
.title_ {
  font-size: 20px;
}
.text_ {
  color: #9ba8c2;
  font-size: 14px;
  line-height: 1.4;
  padding-top: 15px;
}
.item_list img {
  height: 160px;
  width: 200px;
  position: absolute;
  top: 0;
  left: 0;
}

.item_box_mobile .item_list {
  width: 1224px;
  height: 320px;
  padding-left: 440px;
}

.item_box_mobile .item_list img {
  width: 400px;
  height: 320px;
  position: absolute;
  top: 0;
  left: 0;
}

.swiper-container {
  width: 100%;
  /* height: 100%; */
}
.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: -webkit-box;
  display: -ms-flexbox;
  display: -webkit-flex;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  -webkit-justify-content: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  -webkit-align-items: center;
  align-items: center;
}

.center_ >>> .swiper-pagination-bullet-active {
  background-color: #24a2a1;
}
</style>
