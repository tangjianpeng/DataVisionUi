<template>
  <div class="buy">
    <div class="poster">
      <img src="@/assets/image/haibao.jpg" alt="">
    </div>
    <div class="buy_center">
      <div class="item_radio">
        <el-radio v-model="radio" label="1">开通账号</el-radio>
        <p>（按年购买，开通后可查询以下数据，不可下载）</p>
      </div>
      <div class="ctr" v-show="radio=='1'">
        <el-checkbox-group v-model="checkList">
          <div class="ctr_item">
            <el-checkbox label="1" disabled>
              城市汽车销量
              <p>（包含2016年至今的全国、省份、城市汽车销量）</p>
            </el-checkbox>
          </div>
          <div class="ctr_item">
            <el-checkbox label="2" disabled>
              新能源汽车销量
              <p>（包含2016年至今的全国、省份、城市新能源汽车销量）</p>
            </el-checkbox>

          </div>
          <div class="ctr_item">
            <el-checkbox label="3" disabled>
              商用车销量
              <p>（包含2016年至今的全国、省份、城市商用车销量）</p>
            </el-checkbox>

          </div>
          <div class="ctr_item">
            <el-checkbox label="4" disabled>
              城市保有量
              <p>（包含2016年至今的全国、省份、城市汽车保有量）</p>
            </el-checkbox>
          </div>
        </el-checkbox-group>
        <div v-if="status =='0'" class="btn">
          <el-checkbox-group v-model="checkListdata" style="width:20px;float:left">
            <el-checkbox label=" "></el-checkbox>
          </el-checkbox-group>
          <span>我已阅读<span class="protocol" style="color:red;">《数觉平台用户服务协议》</span>并确认开通账号</span>
        </div>
        <div class="price" v-show="checkListdata">
          <div class="price_new">{{`价格：${payAmount}元/年`}}</div>
        </div>
        <div style="text-align: center;padding:20px 0;">
          <el-button  type="primary" disabled>请通过邮箱联系购买,支付开发中敬请期待...</el-button>
<!--          <el-button  v-if="status =='0'" type="primary" :disabled="checkListdata!=true" @click="aliPayPc">支付宝支付</el-button>-->
<!--          <el-button  v-if="status =='1'" type="primary" disabled>已支付</el-button>-->
        </div>
      </div>

      <div class="item_radio">
        <el-radio v-model="radio" label="2">购买数据包</el-radio>
        <p>（按次购买，以源数据Excel表格形式交付）</p>
      </div>
      <div class="item_list" v-show="radio=='2'">
        <div class="item">
          <span>时间：</span>
          <el-input v-model="input" placeholder="例子：2020年1月-2020年12月"></el-input>
        </div>
        <div class="item">
          <span>品牌车型：</span>
          <el-input v-model="input1" placeholder="例子：奥迪A6"></el-input>
        </div>
        <div class="item">
          <span>省份城市：</span>
          <el-input v-model="input2" placeholder="例子：广东省广州市"></el-input>
        </div>
        <div class="item">
          <span>其它需求：</span>
          <el-input v-model="input3" placeholder=""></el-input>
        </div>
      </div>
      <div class="ctr" v-show="radio=='2'">
        <div style="text-align: center;padding:20px 0;">
          <el-button type="primary" disabled>提交申请</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { payInfo, aliPayPc} from "@/api/data";
export default {
  name: 'buy',
  data() {
    return {
      radio: '1',
      checkList: ['1','2','3','4'],
      checkListdata: '',
      value: '',
      input: '',
      input1: '',
      input2: '',
      input3: '',
      options: [
        {
          label: '',
        },
        {
          label: '',
        },
        {
          label: '',
        },
        {
          label: '',
        },
      ],
      orderNo: '',
      payAmount: '',
      status: '',
    }
  },
  methods: {
    payInfo() {
      payInfo().then(res=>{
        if(res.code === 200){
          this.orderNo = res.data.orderNo;
          this.payAmount = res.data.payAmount;
          this.status = res.data.status;
        }
      })
    },
    aliPayPc() {
      let {orderNo, payAmount, userId} = this;
      aliPayPc({orderNo, payAmount, userId}).then(res=>{
        if(res.code === 200){
          let msg = res.msg;
          window.open(msg);
        }
      })
    }
  },
  mounted() {
    this.payInfo();
    document.title="申请购买- 数觉 DataVision";
  },
  computed: {
    userId: function() {
      return this.$store.getters.user.userId || ''
    },
  }
}
</script>

<style  scoped>
.item_list .item{
  padding: 10px 0;
  padding-left: 100px;
  position: relative;
}
.item_list .item span{
  position: absolute;
  width: 100px;
  height: 36px;
  line-height: 36px;
  left: 0;
  text-align: left;
}
.buy{
  height: 100%;
  width: 100%;
  padding-top: 50px;
  display: flex;
}
.poster{
  height: 100%;
}
.poster img{
  height: 100%;
}
.buy_center{
  width: 500px;
  height: 100%;
  margin: 0 auto;
  padding-top: 100px;
}
.item_radio p{
  color: #BCBCBC;
}
.ctr{
  padding: 10px 0;
}
.ctr_item{
  padding: 10px 0;
  height: 60px;
  position: relative;
}
.ctr_item >>> p {
  line-height: 1;
  height: 30px;
  width: 100%;
  position: absolute;
  color: #BCBCBC;
  z-index: 99;
}
.price{
  display: flex;
  width: 100%;
  padding: 20px 0;
}
.price_old{
  width: 50%;
  color: #BCBCBC;
}
.price_new{
  width: 50%;
  color: red;
}
</style>
