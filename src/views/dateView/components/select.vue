<template>
  <div class="selecItem">
    <div class="selecItem_l">{{ selectItem.name }}</div>
    <div class="selecItem_r">
      <el-date-picker
        v-if="selectItem.name === '年月'"
        :value="valueVbl"
        @input="valChange"
        type="monthrange"
        :picker-options="dateValidate"
        :clearable="false"
        value-format="yyyy-M"
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        style="width: 240px;"
      >
      </el-date-picker>
      <div v-else-if="selectItem.name === '年度'">
        <el-date-picker
          :value="valueVbl[0]"
          @input="valBeginChange"
          type="year"
          :picker-options="dateValidate"
          :clearable="false"
          value-format="yyyy"
          placeholder="选择年"
          style="width: 112px;"
        >
        </el-date-picker>
        <span> - </span>
        <el-date-picker
          :value="valueVbl[1]"
          @input="valEndChange"
          type="year"
          :picker-options="dateValidate"
          :clearable="false"
          value-format="yyyy"
          placeholder="选择年"
          style="width: 112px;"
        >
        </el-date-picker>
      </div>
      <el-select
        v-else
        :value="valueVbl"
        @input="valChange"
        multiple
        collapse-tags
        filterable
        :placeholder="'选择' + selectItem.name"
        style="width: 240px;"
        ref="select"
        :disabled="disabled"
      >
        <el-option
          v-for="item in options"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        >
        </el-option>
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  name: "asdfasdf",
  props: ["selectItem", "options", "value", "beginDate", "endDate", "disabled"],
  data() {
    return {
      valueVbl: [],
    };
  },
  methods: {
    valChange: function (val) {
      this.$emit("input", val);
    },
    valBeginChange: function (val) {
      this.$emit("input", [val, this.valueVbl[1]]);
    },
    valEndChange: function (val) {
      this.$emit("input", [this.valueVbl[0], val]);
    },
  },
  watch: {
    value(v) {
      this.valueVbl = this.value;
    },
  },
  computed: {
    dateValidate() {
      return {
        disabledDate: (time) => {
          if (
            this.beginDate &&
            this.endDate &&
            time.getTime() >= new Date(this.beginDate).getTime() &&
            time.getTime() <= new Date(this.endDate).getTime()
          ) {
            return false;
          }
          return true;
        },
      };
    },
  },
};
</script>

<style scoped>
.selecItem {
  float: left;
  width: 50%;
  height: 52px;
  display: flex;
  border-top: solid 1px #efefef;
  border-right: solid 1px #efefef;
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
</style>
