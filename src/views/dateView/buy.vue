<template>
  <div class="container">
    <div class="container-left">
      <div class="container-left-tab">
        <el-tabs
          tab-position="left"
          v-model="noticeType"
          @tab-click="handleClick"
        >
          <el-tab-pane label="购买查询账号" name="0"></el-tab-pane>
          <el-tab-pane label="购买数据包" name="1"></el-tab-pane>
        </el-tabs>
      </div>
    </div>
    <div class="container-center">
      <div class="buy_center">
        <div v-show="noticeType == '0'">
          <div class="item_radio">
            <el-radio v-model="radio1" label="0">开通账号</el-radio>
            <p>（按年购买，开通后可查询以下数据，不可下载）</p>
          </div>
          <div class="ctr">
            <div class="price-tree">
              <div
                class="price-option"
                v-for="(option, idx) of priceData"
                :key="idx"
              >
                <el-checkbox
                  class="price-option-title"
                  :value="option.checked"
                  @input="() => valueChange(option.id, 1)"
                >
                  {{ option.text }}
                </el-checkbox>
                <div class="price-children">
                  <div
                    class="price-item"
                    v-for="(item, ndx) of option.children"
                    :key="ndx"
                  >
                    <el-checkbox
                      class="price-item-title"
                      :value="item.checked"
                      @input="() => valueChange(item.id, 2)"
                    >
                      {{ item.text }}
                    </el-checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div class="btn">
              <div class="price" v-show="checkId">
                <div class="price_new">
                  {{
                    `价格：${
                      Number.isNaN(Number(payAmount)) ? "—" : payAmount
                    }元/年`
                  }}
                </div>
              </div>
              <el-checkbox-group
                v-model="readAgreement"
                style="width: 20px; float: left;"
              >
                <el-checkbox label=" "></el-checkbox>
              </el-checkbox-group>
              <span>
                我已阅读
                <span class="protocol" style="color: red;">
                  《数觉平台用户服务协议》
                </span>
                并确认开通账号
              </span>
            </div>
            <div style="text-align: center; padding: 20px 0;">
              <el-button
                type="primary"
                :disabled="!(readAgreement && checkId)"
                @click="aliPayPc"
              >
                提交申请
              </el-button>
            </div>
          </div>
        </div>
        <div v-show="noticeType == '1'">
          <div class="item_radio">
            <el-radio v-model="radio2" label="1">购买数据包</el-radio>
            <p>（按次购买，以源数据Excel表格形式交付）</p>
          </div>
          <div class="item_list">
            <el-form
              ref="buyFormRef"
              :model="buyForm"
              :rules="formRules"
              label-width="120px"
              class="buy-form"
            >
              <el-form-item label="时间：" prop="ymId">
                <el-input
                  v-model="buyForm.ymId"
                  placeholder="例子：2020年1月-2020年12月"
                />
              </el-form-item>
              <el-form-item label="品牌车型：" prop="brand">
                <el-input v-model="buyForm.brand" placeholder="例子：奥迪A6" />
              </el-form-item>
              <el-form-item label="省份城市：" prop="city">
                <el-input
                  v-model="buyForm.city"
                  placeholder="例子：广东省广州市"
                />
              </el-form-item>
              <el-form-item label="其它需求：">
                <el-input v-model="buyForm.remark" placeholder="" />
              </el-form-item>
            </el-form>
          </div>
          <div class="ctr">
            <div style="text-align: center; padding: 20px 0;">
              <el-button type="primary" @click="dataPack">提交申请</el-button>
            </div>
          </div>
        </div>
      </div>
      <!-- <el-dialog
        title="支付"
        :visible.sync="dialogVisible"
        :before-close="handleClose"
      >
        <iframe :src="payUrl" width="1080px" height="860px" />
        <div class="pay-button">
          <el-button type="primary" @click="handleClose">
            支付完成
          </el-button>
        </div>
      </el-dialog> -->
    </div>
    <div class="container-right">
      <div
        v-if="posterImg"
        class="poster"
        :style="`background-image:url( ${posterImg})`"
      ></div>
    </div>
  </div>
</template>

<script>
import { aliPayPc, dataPack, poster, price, getAmount } from "@/api/data";

export default {
  name: "buy",
  data() {
    return {
      loading: false,
      noticeType: "0",
      radio1: "0",
      radio2: "1",
      priceData: [],
      checkId: "",
      payAmount: "",
      posterImg: "",
      readAgreement: "",
      ymId: "",
      brand: "",
      city: "",
      remark: "",
      buyForm: {
        ymId: "",
        brand: "",
        city: "",
        remark: "",
      },
      formRules: {
        ymId: [{ required: true, trigger: "blur", message: "时间不能为空" }],
        // brand: [{ required: true, trigger: "blur", message: "品牌不能为空" }],
        // city: [{ required: true, trigger: "blur", message: "城市不能为空" }],
      },
      dialogVisible: false,
      payUrl: "",
    };
  },
  mounted() {
    document.title = "申请购买- 数觉 DataVision";
    poster()
      .then((res) => {
        if (res.data[0] && res.data[0].noticeTitleImg) {
          this.posterImg =
            process.env.VUE_APP_BASE_API + res.data[0].noticeTitleImg;
        }
      })
      .catch((err) => {});
    price().then((res) => {
      if (res.data[0]) {
        this.priceData = res.data;
      }
    });
  },
  methods: {
    handleClick(tab) {
      this.$refs.buyFormRef && this.$refs.buyFormRef.resetFields();
      this.buyForm.remark = "";
    },
    aliPayPc() {
      this.loading = true;
      aliPayPc({ salesId: this.checkId }).then((res) => {
        if (res.code === 200) {
          // this.dialogVisible = true;
          // this.payUrl = res.data.url;
          window.location.href = res.data.url;
          // window.open(res.data.url);
        }
      });
    },
    dataPack() {
      this.$refs.buyFormRef.validate((valid) => {
        if (valid) {
          dataPack({ ...this.buyForm })
            .then((res) => {
              if (res.code === 200) {
                this.$message.success(res.msg);
              } else {
                this.$message.error(res.msg);
              }
            })
            .catch((err) => {
              this.$message.error(err);
            });
        }
      });
    },
    valueChange(val, level) {
      this.priceData = this.priceData.map((option) => {
        if (option.id === val) {
          const checked = !option.checked;
          const children = option.children.map((v) => ({ ...v, checked }));
          return {
            ...option,
            checked,
            children,
          };
        } else if (option.children.some((v) => v.id === val)) {
          option.children.map((item) => {
            if (item.id === val) {
              item.checked = !item.checked;
            }
          });
          option.checked = option.children.every((item) => item.checked);
        }
        return option;
      });
      this.getAmount();
    },
    getAmount() {
      let checkArr = [];
      if (this.priceData.every((v) => v.checked)) {
        checkArr = ["-1"];
      } else {
        checkArr = this.priceData.reduce((arr, option) => {
          if (option.checked) {
            arr.push(option.id);
          } else {
            option.children.map((item) => {
              if (item.checked) arr.push(item.id);
            });
          }
          return arr;
        }, []);
      }
      if (checkArr.length === 0) {
        this.payAmount = "0";
        this.checkId = "";
      } else {
        this.loading = true;
        this.checkId = checkArr.join(",");
        getAmount({ id: this.checkId }).then((res) => {
          if (res.code === 200) {
            this.loading = false;
            this.payAmount = res.data.amount;
          }
        });
      }
    },
    handleClose() {
      this.dialogVisible = false;
      this.payUrl = "";
    },
  },
  computed: {
    userId: function () {
      return this.$store.getters.user.userId || "";
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.container-left {
  width: 260px;
  height: 100%;
}
.container-left-tab {
  position: fixed;
  top: 100px;
  left: 20px;
  bottom: 50px;
}
.container-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left::after {
  width: 0;
}
.container-left >>> .el-tabs--left .el-tabs__nav-wrap.is-left .el-tabs__item {
  padding-right: 60px;
  line-height: 60px;
  height: 60px;
  font-size: 20px;
  font-weight: bold;
}
.container-left
  >>> .el-tabs--left
  .el-tabs__nav-wrap.is-left
  .el-tabs__active-bar {
  width: 3px;
  height: 40px !important;
  margin-top: 10px;
}
.container-center {
  flex: 1;
  padding: 30px 4px 20px 150px;
}
.buy_center {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  padding-top: 20px;
}
.buy_center >>> .expanded.el-tree-node__expand-icon.el-icon-caret-right {
  display: none;
}
.item_radio p {
  font-size: 16px;
  color: #333;
}
.item_radio >>> .el-radio__label {
  font-size: 22px;
}
.item_radio >>> .el-radio__inner {
  width: 20px;
  height: 20px;
}
.item_radio >>> .el-radio__inner::after {
  width: 8px;
  height: 8px;
}
.ctr {
  padding: 10px 0 10px 20px;
}
.ctr_item {
  padding: 10px 0;
  height: 60px;
  position: relative;
}
.ctr_item >>> p {
  line-height: 1;
  height: 30px;
  width: 100%;
  position: absolute;
  color: #bcbcbc;
  z-index: 99;
}
.price {
  display: flex;
  width: 100%;
  padding: 20px 0;
}
.price_old {
  width: 50%;
  color: #bcbcbc;
}
.price_new {
  width: 50%;
  color: red;
}
.price-tree {
  padding-bottom: 12px;
  overflow: hidden;
}
.price-option {
  width: 50%;
  float: left;
  padding: 8px 0;
}
.price-option-title {
  padding-bottom: 8px;
}
.price-option-title >>> .el-checkbox__label {
  font-size: 18px;
  color: #333;
  text-decoration: underline;
  font-weight: bold;
}
.price-item {
  padding: 4px 0 4px 24px;
}
.price-item-title >>> .el-checkbox__label {
  font-size: 16px;
  color: #333;
}
.item_list .item {
  padding: 10px 0;
  padding-left: 100px;
  position: relative;
}
.item_list .item span {
  position: absolute;
  width: 100px;
  height: 36px;
  line-height: 36px;
  left: 0;
  text-align: left;
}
.container-right {
  width: 400px;
  height: 100%;
}
.poster {
  display: block;
  position: fixed;
  top: 100px;
  right: 50px;
  bottom: 50px;
  width: 300px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}
.container .container-center >>> .el-dialog {
  width: 1140px;
  margin-top: 100px !important;
}
.pay-button {
  padding: 16px 0;
  text-align: center;
}
</style>
