<template>
  <div class="registered_">
    <div class="login-form">
      <h3 class="title">注 册</h3>
      <div class="ipt_box">
        <el-input v-model="loginForm.company" type="text" auto-complete="off" placeholder="企业/机构">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </div>
      <div class="ipt_box">
        <el-input v-model="loginForm.userName" type="text" auto-complete="off" placeholder="账号">
          <svg-icon slot="prefix" icon-class="user" class="el-input__icon input-icon" />
        </el-input>
      </div>
      <div class="ipt_box">
        <el-input
          v-model="loginForm.email"
          type="text"
          auto-complete="off"
          placeholder="邮箱"
          @keyup.enter.native="handleLoginData"
        >
          <svg-icon slot="prefix" icon-class="email" class="el-input__icon input-icon" />
        </el-input>
      </div>
      <div class="ipt_box">
        <el-input
          v-model="loginForm.phonenumber"
          type="text"
          auto-complete="off"
          placeholder="手机号"
          @keyup.enter.native="handleLoginData"
        >
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>

      </div>
      <div class="ipt_box">
        <el-input
          v-model="loginForm.msgCode"
          type="text"
          style="width:200px"
          auto-complete="off"
          placeholder="验证码"
          @keyup.enter.native="handleLoginData"
        >
          <svg-icon slot="prefix" icon-class="phone" class="el-input__icon input-icon" />
        </el-input>
        <el-button type="text" @click="getCode" :disabled="codeDisabled">{{codeMsg}}</el-button>
      </div>
      <div class="ipt_box">
        <el-input
          v-model="loginForm.password"
          type="password"
          auto-complete="off"
          placeholder="密码"
          @keyup.enter.native="handleLoginData"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </div>
      <div class="ipt_box">
        <el-input
          v-model="password"
          type="password"
          auto-complete="off"
          placeholder="确认密码"
          @keyup.enter.native="handleLoginData"
        >
          <svg-icon slot="prefix" icon-class="password" class="el-input__icon input-icon" />
        </el-input>
      </div>

      <el-button
          :loading="loading"
          size="medium"
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleLoginData"
        >
          <span v-if="!loading">注 册</span>
          <span v-else>注 册...</span>
        </el-button>
    </div>
  </div>
</template>

<script>
import { dvRegister, sendCode } from "@/api/data";
export default {
  name: "registered",
  mounted() {
    document.title="注册- 数觉 DataVision";
  },
  data() {
    return {
      loginForm: {
        company: '',
        userName: '',
        password: '',
        phonenumber: '',
        msgCode: '',
        email: '',
      },
      password: '',
      loading: false,
      timer: null,
      errorTxt:'',
      countdown:60,
      codeMsg:'获取验证码',
      codeDisabled: true,
    };
  },
  created() {
    this.loading = false;
  },
  methods: {

    handleLoginData() {
      if(this.loginForm.password !== this.password && this.loginForm.password !== ''){
        this.$message({
          message: '密码输入不一致',
          type:'error'
        })
        return
      }

      dvRegister(this.loginForm).then( res=>{
        if(res.code === 200){
          this.$router.push({ path: '/login' })
        }
      })
    },
    getCode(){
      if(this.loginForm.phonenumber !=='' ){
        this.codeDisabled = true;
        let data = {
          phonenumber: this.loginForm.phonenumber,
          userName: '',
        }
        sendCode(data).then(res=>{
            if(res.code == 200){
              if(!this.timer){
                this.timer = setInterval(()=>{
                  if(this.countdown>0 && this.countdown<= 60){
                    this.countdown --;
                    if(this.countdown !== 0){
                      this.codeDisabled = true;
                      this.codeMsg = '重新发送('+this.countdown+')';
                    }else{
                      clearInterval(this.timer);
                      this.codeMsg  = "获取验证码";
                      this.countdown  = 60;
                      this.timer = null;
                      this.codeDisabled  = false;
                    }
                  }
                },1000)
              }
            }else{
            this.$message({
              message:res.message,
              type:'error'
            })
            this.codeDisabled  = false;
          }
        })
      }
    },

  },
  watch: {
    'loginForm.phonenumber': function(data) {
      if(data.length === 11){
        this.codeDisabled = false;
      }else{
        this.codeDisabled = true;
      }
    }
  },
  computed: {
    // userName: function() {
    //   return this.$store.getters.user.name || ''
    // },
  }
};
</script>

<style rel="stylesheet/scss" lang="scss">
.registered_{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  background-image: url("../../assets/image/banner_.jpg");
  background-size: cover;
}
.login-form {
  border-radius: 6px;
  background: #fff;
  width: 400px;
  // height: 388px;
  padding: 25px 25px 30px 25px;
  margin-left: 50%;
  position: relative;
  z-index: 1;
}
.ipt_box{
  margin-bottom: 20px;
}
.el-input__prefix{
  line-height: 36px;
}
</style>
