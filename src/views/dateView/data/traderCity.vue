<template>
  <div class="center_">
    <h5 class="title">
      城市商用车销量
      <span>全品牌、地级市新车零售量，每月15日左右更新</span>
    </h5>
    <div class="selectionBox">
      <div class="checkboxBox">
        <div class="checkboxLabel">
          查询字段：
        </div>
        <checkbox :options="checkOptions" v-model="checkListVbl" />
      </div>
      <div class="selectionBody">
        <div v-for="(columns, i) in selectOptions" :key="i">
          <dataQuerySelect
            v-for="(item, ndx) in columns"
            :key="ndx"
            :beginDate="beginDate"
            :endDate="endDate"
            :selectItem="item"
            :options="selectData[item.key]"
            v-model="selectValue[item.key]"
            :disabled="!checkListVbl.includes(item.id)"
          />
        </div>
      </div>
      <div class="selectionFooter">
        <el-button type="primary" icon="el-icon-refresh-right" @click="reset">
          重 置
        </el-button>
        <el-button type="primary" icon="el-icon-search" @click="search">
          查 询
        </el-button>
      </div>
    </div>
    <div class="tableBox">
      <dataQueryTable
        :loading="loading"
        :data="tableList"
        :columnOptions="columnOptions"
        :columnList="checkedList"
      />
      <pagination
        v-show="total > 0"
        :total="total"
        :page.sync="queryParams.pageNum"
        :limit.sync="queryParams.pageSize"
        @pagination="getList"
        :disabled="!authority"
      />
    </div>
  </div>
</template>

<script>
const checkbox = () => import("../components/checkbox.vue");
const dataQueryTable = () => import("../components/table.vue");
const dataQuerySelect = () => import("../components/select.vue");

import {
  dateRanges,
  dvProvince,
  dvCity,
  dvCommerBrand,
  dvOrigEnterpriseName,
  dvCommerModel,
  dvBaseManf,
  dvBase,
  dvCommerFuelType,
  dvDisplacement,
  dvEmission,
  dvUseProp,
  dvVehicleType,
  commerList,
  carCommerList,
} from "@/api/data";
import { traderCity } from "../Config/index.js";

const checkOptions = traderCity.filter(function (item) {
  return item.isCheck;
});
const checkListVbl = checkOptions.map(function (item) {
  return item.id;
});
const columnOptions = traderCity.filter(function (item) {
  return item.isColumn;
});
const selectOptions = [];
const selectData = {};
const selectValue = {};
const isSelectList = traderCity.reduce(function (vs, v) {
  if (v.isSelect) {
    vs.push(v);
  } else if (v.id === "province_name" || v.id === "city_name") {
    vs.push({});
  }
  return vs;
}, []);
let i = -1;
while (++i < isSelectList.length || i % 3 !== 0) {
  const rows = parseInt(i / 3);
  const columns = i % 3;
  if (columns === 0) {
    selectOptions[rows] = [];
  }
  selectOptions[rows].push(i < isSelectList.length ? isSelectList[i] : {});
}
traderCity.map(function (item) {
  if (item.isSelect) {
    selectData[item.key] = [];
    selectValue[item.key] = [];
  }
});

export default {
  name: "",
  components: {
    checkbox,
    dataQueryTable,
    dataQuerySelect,
  },
  props: {
    authority: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      loading: false,
      checkOptions,
      checkListVbl,
      checkedList: [...checkListVbl],
      columnOptions,
      selectOptions,
      selectData,
      selectValue,
      beginDate: "", // 时间
      endDate: "", // 时间
      total: 1,
      queryParams: {
        pageNum: 1,
        pageSize: 20,
        userName: undefined,
        phonenumber: undefined,
        status: undefined,
        deptId: undefined,
      },
      tableList: [],
    };
  },
  computed: {
    userId: function () {
      return this.$store.getters.userId || "0";
    },
  },
  mounted() {
    for (let key in this.selectData) {
      this.selectData[key] = [];
      this.selectValue[key] = [];
    }
    dateRanges().then((res) => {
      if (res.code == 200) {
        this.beginDate = res.data[0].beginDate;
        this.endDate = res.data[0].endDate;
        this.selectValue.ymId = [res.data[0].endDate, res.data[0].endDate];
        this.salesVolumeList(false);
      }
    });
    dvProvince({}).then((res) => {
      this.selectData.provinceName = (res.data || []).map(({ name }) => ({
        name,
      }));
    });
    dvCity({ name: "" }).then((res) => {
      this.selectData.cityName = (res.data || []).map(({ name }) => ({
        name,
      }));
    });
    dvCommerBrand().then((res) => {
      this.selectData.brandName = (res.data || []).map((v) => ({
        name: v.commerBrand || v.name,
      }));
    });
    dvBaseManf().then((res) => {
      this.selectData.baseManfName = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
    // dvBase().then((res) => {
    //   this.selectData.baseName = (res.data || [])
    //     .filter((v) => v)
    //     .map(({ name }) => ({ name }));
    // });
    dvCommerFuelType().then((res) => {
      this.selectData.fuelTypeName = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
    dvDisplacement().then((res) => {
      this.selectData.displacement = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
    dvEmission().then((res) => {
      this.selectData.emissionStandards = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
    dvUseProp().then((res) => {
      this.selectData.useProp = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
    dvVehicleType().then((res) => {
      this.selectData.vehicleType = (res.data || [])
        .filter((v) => v)
        .map(({ name }) => ({ name }));
    });
  },
  methods: {
    //查询
    search() {
      if (this.authority) {
        this.salesVolumeList(true);
        return;
      }
      this.$emit("messageBox");
    },
    dvOrigEnterpriseName(bname = "") {
      dvOrigEnterpriseName({ bname }).then((res) => {
        this.selectData.origEnterpriseName = (res.data || []).map((v) => ({
          name: v.oname || v.name,
        }));
      });
    },
    dvCommerModel(bname = "", oname = "") {
      dvCommerModel({ bname, oname }).then((res) => {
        this.selectData.announceModelCode = (res.data || []).map((v) => ({
          name: v.model || v.name,
        }));
      });
    },
    // 获取数据
    salesVolumeList(type) {
      if (type) this.checkedList = [...this.checkListVbl];
      this.loading = true;
      let data = {
        pageNum: this.queryParams.pageNum,
        pageSize: this.queryParams.pageSize,
        columnName: this.checkedList.join(),
        beginDate: this.selectValue.ymId[0],
        endDate: this.selectValue.ymId[1],
        provinceName: this.checkedList.includes("province_name")
          ? this.selectValue.provinceName.join()
          : "",
        cityName: this.checkedList.includes("city_name")
          ? this.selectValue.cityName.join()
          : "",
        brandName: this.checkedList.includes("brand_name")
          ? this.selectValue.brandName.join()
          : "",
        origEnterpriseName: this.checkedList.includes("orig_enterprise_name")
          ? this.selectValue.origEnterpriseName.join()
          : "",
        announceModelCode: this.checkedList.includes("announce_model_code")
          ? this.selectValue.announceModelCode.join()
          : "",
        baseManfName: this.checkedList.includes("base_manf_name")
          ? this.selectValue.baseManfName.join()
          : "",
        // baseName: this.checkedList.includes("base_name")
        //   ? this.selectValue.baseName.join()
        //   : "",
        fuelTypeName: this.checkedList.includes("fuel_type_name")
          ? this.selectValue.fuelTypeName.join()
          : "",
        displacement: this.checkedList.includes("displacement")
          ? this.selectValue.displacement.join()
          : "",
        emissionStandards: this.checkedList.includes("emission_standards")
          ? this.selectValue.emissionStandards.join()
          : "",
        useProp: this.checkedList.includes("use_prop")
          ? this.selectValue.useProp.join()
          : "",
        vehicleType: this.checkedList.includes("vehicle_type")
          ? this.selectValue.vehicleType.join()
          : "",
      };
      const promise = this.authority ? carCommerList(data) : commerList(data);
      promise.then((res) => {
        this.loading = false;
        this.total = res.total || 1;
        this.tableList = res.rows || [];
      });
    },
    getList({ page, limit }) {
      this.queryParams.pageNum = page;
      this.queryParams.pageSize = limit;
      this.salesVolumeList(false);
    },
    reset() {
      this.checkListVbl = checkOptions.map(function (item) {
        return item.id;
      });
      for (let key in this.selectValue) {
        if (key === "ymId" || key === "yearId") {
          this.selectValue[key] = [this.endDate, this.endDate];
        } else {
          this.selectValue[key] = [];
        }
      }
    },
  },
  watch: {
    "selectValue.brandName": function (data) {
      this.selectValue.origEnterpriseName = [];
      if (data.length > 0) {
        this.dvOrigEnterpriseName(data.join(","));
      } else {
        this.selectData.origEnterpriseName = [];
      }
    },
    "selectValue.origEnterpriseName": function (data) {
      this.selectValue.announceModelCode = [];
      if (
        this.selectValue.brandName.length > 0 ||
        this.selectValue.origEnterpriseName.length > 0
      ) {
        this.dvCommerModel(selectValue.brandName.join(","), data.join(","));
      } else {
        this.selectData.announceModelCode = [];
      }
    },
  },
};
</script>

<style scoped>
.center_ {
  width: 100%;
  height: 100%;
}
.title {
  width: 100%;
  color: rgb(51, 51, 51);
  font-size: 18px;
  font-weight: 650;
  margin: 0;
  padding: 10px 0;
  line-height: 1.2;
  text-align: left;
}
.title span {
  font-weight: 400;
  font-size: 14px;
  margin-left: 10px;
}
.selectionBox {
  padding: 10px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.selectionBody {
  overflow: hidden;
  border-bottom: solid 1px #efefef;
}
.selectionFooter {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.checkboxBox {
  position: relative;
  padding-left: 120px;
  min-height: 40px;
  margin-bottom: 8px;
}
.checkboxLabel {
  position: absolute;
  left: 0px;
  top: 50%;
  width: 120px;
  height: 32px;
  margin-top: -16px;
  line-height: 32px;
  text-align: center;
}
.tableBox {
  width: 100%;
  padding: 10px 0px;
}
.center_ >>> .pagination-container {
  padding: 0 !important;
  height: 32px;
  margin-top: 10px;
  margin-bottom: 0px;
}
</style>
