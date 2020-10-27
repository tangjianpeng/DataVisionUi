<template>
  <div class="center">
    <div class="center_l">
      <div class="itemBox_">
        <span class="sp">乘用车销量</span>
        <p @click="onClickData = 'car2'" :class="color('car2')">全国乘用车销量</p>
        <p @click="onClickData = 'car3'" :class="color('car3')">省份乘用车销量</p>
        <p @click="onClickData = 'car4'" :class="color('car4')">城市乘用车销量</p>
      </div>
      <div class="itemBox_">
        <span class="sp">新能源销量</span>
        <p @click="onClickData = 'energy2'" :class="color('energy2')">全国新能源销量</p>
        <p @click="onClickData = 'energy3'" :class="color('energy3')">省份新能源销量</p>
        <p @click="onClickData = 'energy4'" :class="color('energy4')">城市新能源销量</p>
      </div>
      <div class="itemBox_">
        <span class="sp">汽车保有量</span>
        <p @click="onClickData = 'ownership_2'" :class="color('ownership_2')">全国汽车保有量</p>
        <p @click="onClickData = 'ownership_3'" :class="color('ownership_3')">省份汽车保有量</p>
        <p @click="onClickData = 'ownership_4'" :class="color('ownership_4')">城市汽车保有量</p>
      </div>
    </div>
    <div class="center_r">
      <dashboardBox ref="dashboardBox" :time="time" :times="time_on"></dashboardBox>
    </div>
  </div>
</template>

<script>
import { dvIndustry } from "@/api/data";
import dashboardBox from "@/components/dataVision/dashboard/dashboardBox";

export default {
  name: "dashboard",
  components: {
    dashboardBox
  },
  data() {
    return {
      onClickData: "",
      time: "",
      time_on: ""
    };
  },
  mounted() {
    document.title =
      "汽车仪表盘查询_中国汽车销量仪表盘_保有量- 数觉 DataVision";
    this.dvIndustry();
  },
  methods: {
    dvIndustry() {
      dvIndustry().then(res => {
        let data = res.data || [];
        if (data.length > 0) {
          this.time = data[3].dateName;
          this.time_on = data[4].dateName;
        }
        this.init();
      });
    },
    init() {
      this.$nextTick(() => {
        // 禁用右键
        document.oncontextmenu = new Function("event.returnValue=false");
        // 禁用选择
        document.onselectstart = new Function("event.returnValue=false");
        let name = this.$route.query.item || "";
        if (name === "1" || !name) this.onClickData = "car2";
        if (name === "2") this.onClickData = "car4";
        if (name === "3") this.onClickData = "ownership_4";
        // this.$refs.dashboardBox.init(this.onClickData);
      });
    }
  },
  watch: {
    onClickData(data) {
      this.$refs.dashboardBox.init(data);
    }
  },
  computed: {
    color: function(data) {
      return function(data) {
        if (this.onClickData === data) return "color_";
        return "";
      };
    }
  }
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
  background-color: #fff;
  padding: 0 12px;
}
.center_l .itemBox_ .color_ {
  color: #24a2a1;
}
</style>
