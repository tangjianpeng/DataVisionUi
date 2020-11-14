<template>
  <div class="checkbox">
    <el-checkbox-group :value="value" @input="valChange">
      <el-checkbox
        v-for="item in options"
        :key="item.id"
        :label="item.id"
        :disabled="item.disabled"
      >
        {{ item.name }}
      </el-checkbox>
      <!-- <el-checkbox disabled label="ym_id">年月</el-checkbox>
      <el-checkbox label="manf_name">厂商</el-checkbox>
      <el-checkbox label="brand_name">品牌</el-checkbox>
      <el-checkbox label="sub_model_name">车型</el-checkbox>
      <el-checkbox label="tran_type_name">排挡</el-checkbox>
      <el-checkbox label="engine_type_name">排量</el-checkbox>
      <el-checkbox label="fuel_type_name">燃料类型</el-checkbox>
      <el-checkbox label="manf_prop_name">厂商属性</el-checkbox>
      <el-checkbox label="brand_orig_name">品牌血统</el-checkbox>
      <el-checkbox label="vehicle_func_name">汽车类别</el-checkbox>
      <el-checkbox label="segment_name">汽车类型</el-checkbox>
      <el-checkbox label="segment_full_name">细分市场</el-checkbox>
      <el-checkbox label="province_name">省份</el-checkbox>
      <el-checkbox label="city_name">城市</el-checkbox> -->
    </el-checkbox-group>
  </div>
</template>

<script>
export default {
  name: "checkbox",
  props: {
    options: {
      type: Array,
      default: [],
    },
    value: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      checkList: this.value,
    };
  },
  methods: {
    valChange: function (value) {
      this.$emit("input", value);
    },
  },
};
</script>

<style scoped>
.checkbox {
  padding-top: 15px;
}
.checkbox >>> .el-checkbox__input.is-checked .el-checkbox__inner {
  border-color: #24a2a1;
  background-color: #24a2a1;
}
.checkbox >>> .el-checkbox__input.is-checked + .el-checkbox__label {
  color: #24a2a1;
}
.checkbox >>> .el-checkbox {
  margin-right: 15px;
  padding-bottom: 10px;
}
</style>
