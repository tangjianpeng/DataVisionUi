<template>
  <div class="center">
    <div class="center_l">
      <div class="itemBox_">
        <span class="sp">乘用车销量</span>
        <p @click="onClickData = 'dataAll'" :class="color('dataAll')">全国乘用车销量</p>
        <p @click="onClickData = 'dataProvince'" :class="color('dataProvince')">省份乘用车销量</p>
        <p @click="onClickData = 'dataCity'" :class="color('dataCity')">城市乘用车销量</p>
      </div>
      <div class="itemBox_">
        <span class="sp">新能源销量</span>
        <p @click="onClickData = 'newEnergy_a'" :class="color('newEnergy_a')">全国新能源销量</p>
        <p @click="onClickData = 'newEnergy_b'" :class="color('newEnergy_b')">省份新能源销量</p>
        <p @click="onClickData = 'newEnergy_c'" :class="color('newEnergy_c')">城市新能源销量</p>
      </div>
      <div class="itemBox_">
        <span class="sp">商用车销量</span>
        <p
          @click="onClickData = 'commercialVehicle_a'"
          :class="color('commercialVehicle_a')"
        >全国商用车销量</p>
        <p
          @click="onClickData = 'commercialVehicle_b'"
          :class="color('commercialVehicle_b')"
        >省份商用车销量</p>
        <p
          @click="onClickData = 'commercialVehicle_c'"
          :class="color('commercialVehicle_c')"
        >城市商用车销量</p>
      </div>
      <div class="itemBox_">
        <span class="sp">汽车保有量</span>
        <p @click="onClickData = 'ownership_a'" :class="color('ownership_a')">全国汽车保有量</p>
        <p @click="onClickData = 'ownership_b'" :class="color('ownership_b')">省份汽车保有量</p>
        <p @click="onClickData = 'ownership_c'" :class="color('ownership_c')">城市汽车保有量</p>
      </div>
    </div>
    <div class="center_r">
      <dataAll
        v-if="onClickData === 'dataAll'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></dataAll>
      <dataCity
        v-if="onClickData === 'dataCity'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></dataCity>
      <dataProvince
        v-if="onClickData === 'dataProvince'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></dataProvince>
      <newEnergyAll
        v-if="onClickData === 'newEnergy_a'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></newEnergyAll>
      <newEnergyCity
        v-if="onClickData === 'newEnergy_c'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></newEnergyCity>
      <newEnergyProvince
        v-if="onClickData === 'newEnergy_b'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></newEnergyProvince>
      <traderAll
        v-if="onClickData === 'commercialVehicle_a'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></traderAll>
      <traderProvince
        v-if="onClickData === 'commercialVehicle_b'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></traderProvince>
      <traderCity
        v-if="onClickData === 'commercialVehicle_c'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></traderCity>
      <stockAll
        v-if="onClickData === 'ownership_a'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></stockAll>
      <stockProvince
        v-if="onClickData === 'ownership_b'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></stockProvince>
      <stockCity
        v-if="onClickData === 'ownership_c'"
        :authority="authority"
        @messageBox="dialogVisible = true"
      ></stockCity>
    </div>
    <el-dialog title="友情提示" :visible.sync="dialogVisible" width="400px" :show-close="false">
      <p v-if="userId === '0'" style="text-align: center;">
        请先
        <span style="color: red;" @click="to('login')">登陆</span>后购买数据
      </p>
      <p v-if="userId === '0'" style="text-align: center;">
        如还没有账号请
        <span style="color: red;" @click="to('registered')">注册</span>
      </p>

      <p v-if="userId != '0'" style="text-align: center;">
        您的权限不足，请先
        <span style="color: red;" @click="to('buy')">购买</span>数据
      </p>

      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="background-color: #24a2a1; border-color: #24a2a1;"
          @click="dialogVisible = false"
        >取消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
const dataAll = () => import("./data/dataAll");
const dataCity = () => import("./data/dataCity");
const dataProvince = () => import("./data/dataProvince");
const newEnergyAll = () => import("./data/newEnergyAll");
const newEnergyCity = () => import("./data/newEnergyCity");
const newEnergyProvince = () => import("./data/newEnergyProvince");
const traderAll = () => import("./data/traderAll");
const traderCity = () => import("./data/traderCity");
const traderProvince = () => import("./data/traderProvince");
const stockAll = () => import("./data/stockAll");
const stockCity = () => import("./data/stockCity");
const stockProvince = () => import("./data/stockProvince");
export default {
  name: "",
  components: {
    dataAll,
    dataCity,
    dataProvince,
    newEnergyAll,
    newEnergyCity,
    newEnergyProvince,
    traderAll,
    traderCity,
    traderProvince,
    stockAll,
    stockCity,
    stockProvince
  },
  data() {
    return {
      onClickData: "dataAll",
      authority: false, //权限
      valData: {
        dataAll: "car:salesVolume:list",
        dataProvince: "car:salesVolumeProvince:list",
        dataCity: "car:salesVolumeCity:list",
        newEnergy_a: "car:energyNew:list",
        newEnergy_b: "car:energyNewProvince:list",
        newEnergy_c: "car:energyNewCity:list",
        commercialVehicle_a: "car:commer:list",
        commercialVehicle_b: "car:commerProvince:list",
        commercialVehicle_c: "car:commerCity:list",
        ownership_a: "car:stock:list",
        ownership_b: "car:stockProvince:list",
        ownership_c: "car:stockCity:list"
      },
      dialogVisible: false,
      userId: ""
    };
  },
  mounted() {
    document.title =
      "汽车销量查询_汽车销量数据分析_保有量数据分析等- 数觉 DataVision";
    this.userId = this.$store.getters.userId || "0";
    this.$nextTick(() => {
      // 禁用右键
      document.oncontextmenu = new Function("event.returnValue=false");
      // 禁用选择
      document.onselectstart = new Function("event.returnValue=false");
    });
    let name = this.$route.query.item || "";
    if (name === "1") this.onClickData = "newEnergy_a";
    if (name === "2") this.onClickData = "commercialVehicle_a";
    if (name === "3") this.onClickData = "ownership_a";
    this.authorityFun();
  },
  methods: {
    authorityFun() {
      if (this.permissions.length === 0) return;
      let authority = this.valData[this.onClickData] || "";
      this.authority = this.permissions.includes(authority);
    },
    to(data) {
      this.dialogVisible = false;
      this.$router.push({ path: "/" + data });
    }
  },
  watch: {
    permissions(data) {
      this.authorityFun();
    },
    onClickData(data) {
      this.authorityFun();
    }
  },
  computed: {
    color: function(data) {
      return function(data) {
        if (this.onClickData === data) return "color_";
        return "";
      };
    },
    permissions: function() {
      return this.$store.getters.user.permissions || [];
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
.center >>> .el-dialog:not(.is-fullscreen) {
  margin-top: 30vh !important;
}
.center >>> .el-dialog .el-dialog__body {
  padding: 0 20px;
}
.center >>> .el-dialog .el-dialog__body p {
  font-size: 16px;
  letter-spacing: 2px;
}
.center >>> .el-dialog .el-dialog__body p span {
  cursor: pointer;
}
</style>
