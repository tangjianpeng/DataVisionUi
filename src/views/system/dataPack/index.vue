<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
      <el-form-item label="账号" prop="userName">
        <el-input
          v-model="queryParams.userName"
          placeholder="请输入账号"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
<!--      <el-form-item label="岗位名称" prop="postName">-->
<!--        <el-input-->
<!--          v-model="queryParams.postName"-->
<!--          placeholder="请输入岗位名称"-->
<!--          clearable-->
<!--          size="small"-->
<!--          @keyup.enter.native="handleQuery"-->
<!--        />-->
<!--      </el-form-item>-->

      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-table v-loading="loading" :data="packList" >

      <el-table-column label="账号" align="center" prop="userName" />
      <el-table-column label="电话号码" align="center" prop="phonenumber" />
      <el-table-column label="公司" align="center" prop="company" />
      <el-table-column label="时间" align="center" prop="ymId" />
      <el-table-column label="品牌车型" align="center" prop="brand" />
      <el-table-column label="省份城市" align="center" prop="city" />
      <el-table-column label="其他需求" align="center" prop="remark" />
      <el-table-column label="申请时间" align="center" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />


  </div>
</template>

<script>
import { listDataPack } from "@/api/system/dataPack";

export default {
  name: "DataPack",
  data() {
    return {
      // 遮罩层
      loading: true,

      // 总条数
      total: 0,
      // 表格数据
      packList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,

      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userName: undefined
        //postName: undefined,
      },
      // 表单参数
      form: {}

    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      this.loading = true;
      listDataPack(this.queryParams).then(response => {
        this.packList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 表单重置
    reset() {
      this.form = {
        userName: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    }
  }
};
</script>
