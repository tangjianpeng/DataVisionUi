<template>
  <div id="app" class="ctr">
    <div class="nav_ navbar">
      <img class="imgBox" src="@/assets/image/logo4.png" alt />
      <el-tabs
        class="nav_top"
        v-model="activeName"
        style="height: 50px;"
        @tab-click="handleClick"
      >
        <el-tab-pane label="首页" name="index_home"></el-tab-pane>
        <el-tab-pane label="数据查询" name="dataQuery"></el-tab-pane>
        <el-tab-pane label="排行榜" name="leaderBoard"></el-tab-pane>
        <el-tab-pane label="仪表盘" name="dashboard"></el-tab-pane>
        <el-tab-pane label="申请购买" name="buy"></el-tab-pane>
        <el-tab-pane label="关于我们" name="about"></el-tab-pane>
      </el-tabs>
      <div class="registered" v-show="!userName">
        <span @click="$router.push({ path: '/registered' })">注册</span>
        <span @click="$router.push({ path: '/login' })">登录</span>
      </div>
      <el-dropdown
        v-show="userName"
        class="avatar-container right-menu-item hover-effect"
        trigger="click"
      >
        <div class="avatar-wrapper">
          <!-- <img :src="avatar" class="user-avatar"> -->
          <span>{{ userName }}</span>
          <!-- <i class="el-icon-caret-bottom" /> -->
        </div>
        <el-dropdown-menu slot="dropdown">
          <!--          <router-link to="/user/profile" >-->
          <!--            <el-dropdown-item >  </el-dropdown-item>-->
          <!--          </router-link>-->
          <!--            <el-dropdown-item @click.native="setting = true">-->
          <!--             <span>布局设置</span>-->
          <!--           </el-dropdown-item>-->
          <router-link to="/user/personalInfo">
            <el-dropdown-item>个人中心</el-dropdown-item>
          </router-link>
          <router-link
            to="/dataVision_home"
            v-if="permissions.includes('car:data:admin')"
          >
            <el-dropdown-item>
              <span>后台管理</span>
            </el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click.native="logout">
            <span>退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <router-view />
    <el-dialog
      title="友情提示"
      :visible.sync="dialogVisible"
      width="400px"
      :show-close="false"
    >
      <p style="text-align: center;">
        请先
        <span style="color: red;" @click="to('login')">登陆</span>后购买数据
      </p>
      <p style="text-align: center;">
        如还没有账号请
        <span style="color: red;" @click="to('registered')">注册</span>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          style="background-color: #24a2a1; border-color: #24a2a1;"
          @click="dialogVisible = false"
          >取消</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import store from "@/store";
import Cookies from "js-cookie";
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      activeName: "index_home",
      show: true,
      dataName: "index_home",
      dialogVisible: false,
    };
  },
  created() {
    document.querySelector("meta[name=viewport]").content =
      "width=1280px, user-scalable=no";
    document.body.style.minWidth = "1280px";
  },
  methods: {
    to(data) {
      this.dialogVisible = false;
      this.$router.push({ path: "/" + data });
    },
    handleClick(data) {
      if (data.name === "buy") {
        // if(this.permissions.includes(authority))
        // this.permissions
        if (this.userName) {
          this.$router.push({ path: "/" + data.name });
          return;
        }
        this.dialogVisible = true;

        // this.activeName = this.dataName;
        return false;
      }
      // this.dataName = data.name;
      if (data.name === "index_home") {
        this.$router.push({ path: "/index" });
      } else {
        this.$router.push({ path: "/" + data.name });
      }
    },
    async logout() {
      this.$confirm("确定注销并退出系统吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          location.reload();
        });
      });
    },
  },
  watch: {
    $route: {
      handler: function (val, oldVal) {
        let authority = "car:data:admin";
        this.show = true;
        this.activeName = val.name;
        if (!val.name) this.show = false;
        if (val.name === "index") {
          if (!this.permissions.includes(authority)) {
            //console.log(this.permissions.includes(authority))
            this.$router.push({ path: "/index" });
          }
        }
        // if(val.name != 'index_home' || val.name != 'dataQuery' || val.name != 'about'){
        //   this.show = false;
        // }else{
        //   this.show = true;
        // }
      },
      // 深度观察监听
      deep: true,
    },
    permissions: function (data) {},
  },
  computed: {
    ...mapGetters(["sidebar", "avatar", "device"]),
    userName: function () {
      return this.$store.getters.user.name || "";
    },
    company: function () {
      return this.$store.getters.user.company || "";
    },
    permissions: function () {
      return this.$store.getters.user.permissions || [];
    },
  },
};
</script>

<style scoped>
.nav_ {
  width: 100%;
  position: fixed;
  background-color: #343c48;
  top: 0;
  z-index: 999;
}
.nav_ >>> .el-tabs__header {
  margin: 0;
}
.nav_ >>> .el-tabs__nav-scroll {
  padding-left: 280px;
}
.nav_ .imgBox {
  position: absolute;
  top: 5px;
  left: 20px;
  width: 160px;
  height: 40px;
}
.registered {
  position: absolute;
  right: 12px;
  top: 0;
  line-height: 50px;
}
.registered span {
  color: #f8f8f8;
  cursor: pointer;
  padding-right: 20px;
}
.avatar-container {
  position: absolute;
  right: 10px;
  top: 0;
}
.avatar-container img {
  width: 36px;
  height: 36px;
}
.avatar-container .avatar-wrapper span {
  color: #f8f8f8;
}
.nav_ >>> .el-tabs__item {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  padding: 0 32px;
}
.nav_ >>> .el-tabs__nav-wrap::after {
  /* height: 0px; */
  display: none;
}
#app .nav_top >>> .el-tabs__item {
  color: #f8f8f8;
}
.registered span:hover,
#app >>> .el-tabs__item.is-active,
#app >>> .el-tabs__item:hover,
#app >>> .el-radio__input.is-checked + .el-radio__label,
.el-popper .el-year-table td.today .cell,
.el-popper .el-year-table td.current:not(.disabled) .cell {
  color: #24a2a1;
}
#app >>> .el-tabs__active-bar {
  background-color: #24a2a1;
}
#app >>> .el-radio__input.is-checked .el-radio__inner {
  border-color: #24a2a1;
  background: #24a2a1;
}
.avatar-wrapper {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  cursor: pointer;
  padding-right: 10px;
}
.ctr >>> .el-dialog:not(.is-fullscreen) {
  margin-top: 30vh !important;
}
.ctr >>> .el-dialog .el-dialog__body {
  padding: 0 20px;
}
.ctr >>> .el-dialog .el-dialog__body p {
  font-size: 16px;
  letter-spacing: 2px;
}
.ctr >>> .el-dialog .el-dialog__body p span {
  cursor: pointer;
}
</style>
