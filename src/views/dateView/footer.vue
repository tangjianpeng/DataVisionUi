<template>
  <div class="footer">
    <div class="foo1">
      <img src="@/assets/image/logo.png" alt="">
      <div class="fooText">
        <!-- <p>广州数觉信息科技有限公司</p> -->
        <p>Copyright 2020 DataVision. All rights reserved. Privacy Policy</p>
        <p style="font-size: 12px">粤ICP备20061743号 粤公网安备 44010602008362号</p>
      </div>
    </div>
    <div class="foo">
      <!-- <span class="nav">导航</span>
      <p>关于我们</p>
      <p>我们的业务</p>
      <p>投资者关系</p> -->
    </div>
    <div class="foo">
      <!-- <span class="nav">友情链接</span>
      <p>Yeebia</p> -->
    </div>
    <div class="foo foo2">
      <span class="nav">Contact Us</span>
      <!-- <p style="font-size: 22px">Cell 020-xxxxxxxx</p> -->
      <p style="font-size: 16px">Email info@dataisvision.com</p>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.footer{
  width: 100%;
  height: 200px;
  background-color: #1A1A1A;
  padding: 15px 30px 10px 30px;
}
.foo1{
  width: 40%;
  float: left;
  height: 100%;
  padding-left: 20px;
}
.foo1 img{
  width: 250px;
}
.foo{
  width: 15%;
  padding-top: 20px;
  float: left;
  cursor: pointer;
  color: #fff;
  font-size: 16px;
}
.foo2{
  width: 30%;
}
.nav{
  color: #9744FF;
  font-size: 20px;
  margin-bottom: 10px;
  display: inline-block;
}
.foo2 .nav{
  color: #fff;
  font-weight: 700;
  font-size: 16px;
}
.foo2 p {
  padding: 5px 0;
  margin: 0;
}
.fooText{
  padding-left: 30px;
}
.language{
  display: inline-block;
  width: 100px;
  height: 40px;
  line-height:40px;
  text-align: center;
  color: #fff;
  border: solid 1px #fff;
  margin-bottom: 20px;
}
.fooText p{
  color: #fff;
}
</style>
