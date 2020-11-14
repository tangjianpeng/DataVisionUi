<template>
  <div class="table">
    <el-table
      v-loading="loading"
      :data="data"
      height="calc(100vh - 110px)"
      style="width: 100%;"
    >
      <el-table-column
        v-for="item in columns"
        :key="item.key"
        :prop="item.key"
        :label="item.name"
        :width="item.width"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Array,
      default: [],
    },
    columnOptions: {
      type: Array,
      default: [],
    },
    columnList: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      columns: this.columnOptions,
    };
  },
  watch: {
    columnList: function (val) {
      this.columns = this.columnOptions.filter(function (v) {
        return !v.isCheck || val.includes(v.id);
      });
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
  margin-bottom: 12px;
  padding: 10px;
  width: 100%;
  background: #fff;
  box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12),
    0px 0px 6px 0px rgba(0, 0, 0, 0.04);
}
.selecItem {
  float: left;
  width: 50%;
  height: 52px;
  display: flex;
  border-top: solid 1px #efefef;
  border-right: solid 1px #efefef;
}
.selectionBody {
  overflow: hidden;
  border-bottom: solid 1px #efefef;
}
.selecItem_l {
  width: 120px;
  height: 100%;
  font-size: 14px;
  line-height: 52px;
  text-align: right;
  padding-right: 20px;
  background-color: #f2f3f5;
}
.selecItem_r {
  height: 100%;
  width: calc(100% - 120px);
  padding-left: 20px;
  line-height: 52px;
}
.selecItem_date {
  width: 160px;
}
.selectionFooter {
  padding-top: 10px;
  display: flex;
  justify-content: center;
}
.table {
  width: 100%;
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
.center_ >>> .pagination-container {
  padding: 0 !important;
  height: 32px;
  margin-bottom: 10px;
  margin-top: 10px;
}
.table >>> .el-table .el-table__header-wrapper th {
  background-color: #f2f3f5;
}
.table >>> .el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #24a2a1;
}
</style>
