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
        <dataQuerySelect
          v-for="(item, ndx) in selectOptions"
          :key="ndx"
          :beginDate="beginDate"
          :endDate="endDate"
          :selectItem="item"
          :options="selectData[item.key]"
          v-model="selectValue[item.key]"
          :disabled="!checkListVbl.includes(item.id)"
        />
      </div>
      <div class="selectionFooter">
        <el-button type="primary" @click="search">查 询</el-button>
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
  commerBrand,
  commerList,
  carCommerList,
} from "@/api/data";
import { traderProvince } from "../Config/index.js";

const checkOptions = traderProvince.filter(function (item) {
  return item.isCheck;
});
const checkListVbl = checkOptions.map(function (item) {
  return item.id;
});
const columnOptions = traderProvince.filter(function (item) {
  return item.isColumn;
});
const selectOptions = traderProvince.filter(function (item) {
  return item.isSelect;
});

const selectData = {};
const selectValue = {};
selectOptions.map(function (item) {
  selectData[item.key] = [];
  selectValue[item.key] = [];
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
    commerBrand().then((res) => {
      this.selectData.brandName = (res.data || []).map((v) => ({
        name: v.commerBrand || v.name,
      }));
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
    dvCity(name) {
      dvCity({ name }).then((res) => {
        this.selectData.cityName = (res.data || []).map(({ name }) => ({
          name,
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
  },
  watch: {
    "selectValue.provinceName": function (data) {
      this.selectValue.cityName = [];
      if (data.length > 0) {
        this.dvCity(data.join(","));
      } else {
        this.selectData.cityName = [];
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
