<template>
  <div class="center">
    <div class="center_l">
      <div class="itemBox_">
        <span class="sp" @click="tabId = 'car1'" :class="color('car1')"
          >汽车销量排行榜</span
        >
        <p @click="tabId = 'car2'" :class="color('car2')">
          轿车销量排行榜
        </p>
        <p @click="tabId = 'car3'" :class="color('car3')">
          SUV销量排行榜
        </p>
        <p @click="tabId = 'car4'" :class="color('car4')">
          MPV销量排行榜
        </p>
      </div>
      <div class="itemBox_">
        <span class="sp" @click="tabId = 'energy1'" :class="color('energy1')"
          >新能源销量排行榜</span
        >
        <p @click="tabId = 'energy2'" :class="color('energy2')">
          新能源轿车销量排行榜
        </p>
        <p @click="tabId = 'energy3'" :class="color('energy3')">
          新能源SUV销量排行榜
        </p>
        <p @click="tabId = 'energy4'" :class="color('energy4')">
          新能源MPV销量排行榜
        </p>
      </div>
      <div class="itemBox_">
        <span class="sp" @click="tabId = 'stock'" :class="color('stock')"
          >汽车保有量排行榜</span
        >
      </div>
    </div>
    <div class="center_r">
      <car ref="car" :timeData="timeData" :stockTime="stockTime"></car>
    </div>
  </div>
</template>

<script>
import { dvIndustry } from "@/api/data";
import car from "@/components/dataVision/leaderBoard/car";
export default {
  name: "leaderBoard",
  components: {
    car,
  },
  data() {
    return {
      authority: false, //权限
      tabId: "car1",
      timeData: "",
      stockTime: "",
    };
  },
  mounted() {
    document.title =
      "汽车排行榜查询_中国汽车销量排行榜_保有量- 数觉 DataVision";
    this.dvIndustry();
  },
  methods: {
    dvIndustry() {
      dvIndustry().then((res) => {
        let data = res.data || [];
        if (data.length > 0) {
          this.timeData = data[3].dateName;
          this.stockTime = data[4].dateName;
          this.$refs.car.init(this.tabId);
        }
      });
    },
  },
  watch: {
    tabId(data) {
      if (this.timeData && this.stockTime) {
        this.$refs.car.init(data);
      }
    },
  },
  computed: {
    color: function (data) {
      return function (data) {
        if (this.tabId === data) return "color_";
        return "";
      };
    },
  },
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
.center {
  width: 100%;
  height: 100%;
  display: flex;
  padding-top: 50px;
}
.center_l {
  width: 220px;
  height: 100%;
  background-color: #343c48;
  padding-top: 16px;
}
.center_l .itemBox_ {
  padding-bottom: 20px;
  text-align: center;
}
.center_l .itemBox_ .sp {
  font-size: 22px;
  color: #fff;
  line-height: 40px;
  display: inline-block;
}
.center_l .itemBox_ p {
  font-size: 15px;
  font-weight: 400;
  color: #efefef;
  line-height: 32px;
  margin: 0;
  padding: 0;
  cursor: pointer;
}
.center_l .itemBox_ p:hover {
  color: #24a2a1;
}
.center_r {
  width: calc(100% - 160px);
  height: 100%;
  overflow: auto;
  background-color: #e7eaf2;
  padding: 0 12px;
}
.center_l .itemBox_ .color_ {
  color: #24a2a1;
}
</style>
