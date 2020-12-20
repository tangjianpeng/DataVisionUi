<template>
  <div class="buy">
    <div class="buy_left"></div>
    <div class="buy_center">
      <div class="item_radio">
        <el-radio v-model="radio" label="1">开通账号</el-radio>
        <p>（按年购买，开通后可查询以下数据，不可下载）</p>
      </div>
      <div class="ctr" v-show="radio == '1'">
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
        <div v-if="status == '0'" class="btn">
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
            v-model="checkListdata"
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
            :disabled="!(checkListdata && checkId)"
            @click="aliPayPc"
          >
            请通过邮箱联系购买,支付开发中敬请期待...
          </el-button>
          <!--          <el-button  v-if="status =='0'" type="primary" :disabled="checkListdata!=true" @click="aliPayPc">支付宝支付</el-button>-->
          <!--          <el-button  v-if="status =='1'" type="primary" disabled>已支付</el-button>-->
        </div>
      </div>

      <div class="item_radio">
        <el-radio v-model="radio" label="2">购买数据包</el-radio>
        <p>（按次购买，以源数据Excel表格形式交付）</p>
      </div>
      <div class="item_list" v-show="radio == '2'">
        <div class="item">
          <span>时间：</span>
          <el-input
            v-model="ymId"
            placeholder="例子：2020年1月-2020年12月"
          ></el-input>
        </div>
        <div class="item">
          <span>品牌车型：</span>
          <el-input v-model="brand" placeholder="例子：奥迪A6"></el-input>
        </div>
        <div class="item">
          <span>省份城市：</span>
          <el-input v-model="city" placeholder="例子：广东省广州市"></el-input>
        </div>
        <div class="item">
          <span>其它需求：</span>
          <el-input v-model="remark" placeholder=""></el-input>
        </div>
      </div>

      <div class="ctr" v-show="radio == '2'">
        <div style="text-align: center; padding: 20px 0;">
          <el-button type="primary" @click="dataPack">提交申请</el-button>
        </div>
      </div>
    </div>
    <div class="buy_right">
      <div class="poster" :style="`background-image:url( ${posterImg})`"></div>
    </div>
  </div>
</template>

<script>
import {
  payInfo,
  aliPayPc,
  dataPack,
  poster,
  price,
  getAmount,
} from "@/api/data";
export default {
  name: "buy",
  data() {
    return {
      loading: false,
      priceData: [],
      checkId: "",
      checked: false,
      posterImg: "",
      radio: "1",
      checkList: ["1", "2", "3", "4"],
      checkListdata: "",
      value: "",
      ymId: "",
      brand: "",
      city: "",
      remark: "",
      option: [
        {
          label: "",
        },
        {
          label: "",
        },
        {
          label: "",
        },
        {
          label: "",
        },
      ],
      orderNo: "",
      payAmount: "",
      status: "",
    };
  },
  mounted() {
    this.payInfo();
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
    payInfo() {
      payInfo().then((res) => {
        if (res.code === 200) {
          this.orderNo = res.data.orderNo;
          this.payAmount = res.data.payAmount;
          this.status = res.data.status;
        }
      });
    },
    aliPayPc() {
      this.loading = true;
      aliPayPc({ salesId: this.checkId }).then((res) => {
        if (res.code === 200) {
          window.open(res.data.url);
        }
      });
    },
    dataPack() {
      const { ymId, brand, city, remark } = this;
      dataPack({ ymId, brand, city, remark })
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
  },
  computed: {
    userId: function () {
      return this.$store.getters.user.userId || "";
    },
  },
};
</script>

<style scoped>
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
.buy {
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.buy_left {
  width: 400px;
  height: 100%;
}
.buy_right {
  width: 400px;
  height: 100%;
}
.poster {
  position: fixed;
  top: 100px;
  right: 50px;
  bottom: 50px;
  width: 300px;
  background-repeat: no-repeat;
  background-position: 50% 50%;
  background-size: contain;
}
.buy_center {
  width: 500px;
  height: 100%;
  margin: 0 auto;
  padding-top: 100px;
}
.buy_center >>> .expanded.el-tree-node__expand-icon.el-icon-caret-right {
  display: none;
}
.item_radio p {
  color: #bcbcbc;
}
.ctr {
  padding: 10px 0;
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
}
.price-option {
  padding: 4px 0;
}
.price-option-title {
  padding-bottom: 8px;
}
.price-option-title .el-checkbox__label {
  font-size: 20px;
  color: #333;
}
.price-item {
  padding: 4px 0 4px 24px;
}
</style>
