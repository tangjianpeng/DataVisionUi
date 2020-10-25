<template>
  <div class="box">
    <div class="title_s">
      <img src="@/assets/image/about2 1920x600.jpg" alt="" />
      <div class="text_title">
        <p style="color: #fff;">致力于推动汽车产业</p>
        <p style="color: #000;">建立以数据为基础的决策飞轮</p>
      </div>
    </div>
    <div class="item_box">
      <div class="item_">
        <div class="item_t item_text">
          <div
            ref="textRef"
            style="
              float: right;
              width: 90%;
              padding: 12px 0;
              background-color: rgb(35, 162, 161);
              display: flex;
              flex-flow: column;
              justify-content: center;
            "
          >
            <p>数觉 Data Vision</p>
            <p>汽车数据服务平台</p>
            <p>
              汇聚全国、省份、城市维度的汽车销量数据，为主机厂、经销商、金融保险机构、大学院校、广告营销机构、媒体等提供完整的汽车产业数据，为汽车产业用户提供专业的数据查询、数据分析等在线数据服务
            </p>
          </div>
        </div>
        <div class="item_i">
          <img
            ref="imgRef"
            :onload="(imgFinish = true)"
            class="img"
            src="@/assets/image/about 2 900x600.jpg"
            alt=""
          />
        </div>
      </div>
      <div class="item_">
        <div class="item_t box2">
          <img
            class="img"
            style="float: right;"
            src="@/assets/image/about900x600.jpg"
            alt=""
          />
        </div>
        <div class="item_i box1">
          <h1>我们的愿景</h1>
          <p>让数据成为决策基础</p>
          <h1>我们的使命</h1>
          <p>为用户提供稳定的数据服务</p>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
import foot from "./footer";
export default {
  mounted() {
    document.title = "关于我们- 数觉 DataVision";
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  },
  components: {
    foot,
  },
  data() {
    return {
      imgFinish: false,
    };
  },
  methods: {
    onResize() {
      if (this.$refs && this.$refs.textRef && this.$refs.imgRef) {
        if (this.$refs.textRef.clientWidth >= 630) {
          this.$refs.textRef.style.height = `${
            this.$refs.imgRef.clientHeight - 110
          }px`;
        } else {
          this.$refs.textRef.style.height = "auto";
        }
      }
    },
  },
  watch: {
    imgFinish(val) {
      if (val) {
        setTimeout(() => {
          this.onResize();
          window.addEventListener("resize", this.onResize);
        }, 100);
      }
    },
  },
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  padding-top: 54px;
}
.title_s {
  position: relative;
  width: 100%;
}
.title_s img {
  width: 100%;
}
.item_box {
  padding-top: 150px;
  padding-bottom: 120px;
  overflow: hidden;
}
.text_title {
  width: 680px;
  height: 140px;
  position: absolute;
  left: 50%;
  margin-left: -340px;
  bottom: -80px;
}
.text_title p {
  color: #fff;
  font-size: 50px;
  line-height: 1.2;
  padding: 0;
  margin: 0;
  font-weight: 700;
}
.item_ {
  width: 100%;
  position: relative;
  float: left;
}
.item_t {
  width: 50%;
  font-size: 22px;
  float: left;
  margin-top: 50px;
}
.item_text {
  color: #fff;
}
.item_t p {
  margin: 0;
  line-height: 1.5;
  padding: 12px 8% 12px 10%;
}
.item_t p:first-child {
  font-size: 32px;
  line-height: 1.2;
  padding-top: 20px;
  padding-bottom: 20px;
}
.item_i {
  width: 50%;
  float: right;
}
.img {
  width: 90%;
}
.box2 {
  z-index: 999;
}
.box1 {
  height: 100%;
  background-color: #1a1a1a;
  margin-top: 80px;
  position: absolute;
  right: 10%;
  color: #fff;
  padding-left: 15%;
  z-index: -1;
  padding-top: 50px;
}
.box1 h1 {
  font-size: 50px;
}
</style>
