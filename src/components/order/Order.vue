<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图 -->
        <el-card>
            <el-row>
                <el-col :span="8">
                    <el-input placeholder="请输入" >
                        <el-button slot="append" icon="el-icon-search"></el-button>
                    </el-input>
                </el-col>
            </el-row>

            <!-- 订单列表数据 -->
            <el-table :data="orderList" border stripe>
                <el-table-column type="index" label="#"></el-table-column>
                <el-table-column label="订单编号" prop="order_number"></el-table-column>
                <el-table-column label="订单价格" prop="order_price"></el-table-column>
                <el-table-column label="是否付款" prop="pay_status">
                    <template slot-scope="scope">
                        <el-tag type="primary" v-if="scope.row.pay_status === '1'">已付款</el-tag>
                        <el-tag type="danger" v-else>未付款</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="是否发货" prop="is_send"></el-table-column>
                <el-table-column label="下单时间" prop="create_time">
                    <template slot-scope="scope">
                        {{scope.row.create_time | dateFormat}}
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <!-- 省市地址编辑 -->
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="showBox"></el-button>
                    <!-- 物流进度 -->
                    <el-button size="mini" type="success" icon="el-icon-location" @click="showProgressBox"></el-button>
                </el-table-column>
            </el-table>

            <!-- 分页pagination -->
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryInfo.pagenum" :page-sizes="[5, 10, 15]" :page-size="queryInfo.pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </el-card>

        <!-- 修改地址的对话框 -->
        <el-dialog title="修改地址" :visible.sync="addressVisible" width="50%" @close="addressDialogClosed">
            <el-form ref="addressFormRef" :model="addressForm" :rules="addressFormRule" label-width="100px">
                <el-form-item label="省市区/县" prop="address1">
                    <el-cascader :options="cityData" v-model="addressForm.address1" :props="{ expandTrigger: 'hover' }"></el-cascader>
                </el-form-item>
                <el-form-item label="详细地址" prop="address2">
                    <el-input v-model="addressForm.address2"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="addressVisible = false">取 消</el-button>
                <el-button type="primary" @click="addressVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 展示物流进度的对话框 -->
        <el-dialog title="物流进度" :visible.sync="progressVisible" width="50%">
            <!-- 时间线 -->
            <el-timeline>
                <el-timeline-item v-for="(activity, index) in progressInfo" :key="index" :timestamp="activity.time"> {{activity.context}}</el-timeline-item>
            </el-timeline>
        </el-dialog>
    </div>
</template>

<script>
// 导入城市模块
import cityData from './citydata.js'

export default {
  data () {
    return {
      // 查询对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      total: 0,
      orderList: [],
      // 地址修改对话框显示隐藏
      addressVisible: false,
      // 物流进度对话框显示隐藏
      progressVisible: false,
      // 地址表单
      addressForm: {
        address1: [],
        address2: ''
      },
      addressFormRule: {
        address1: [
          { required: true, message: '请选择省市区县', trigger: 'blur' }
        ],
        address2: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ]
      },
      // 使用城市模块
      cityData: cityData,
      // 物流信息存储
      progressInfo: []
    }
  },
  created () {
    this.getOrderList()
  },
  methods: {
    async getOrderList () {
      const { data: res } = await this.$http.get('orders', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取列表失败！')
      }
      this.total = res.data.total
      this.orderList = res.data.goods
      console.log(res.data)
    },
    // 分页显示条数改变时触发函数
    handleSizeChange (newSize) {
      this.queryInfo.pagesize = newSize
      this.getOrderList()
    },
    // 页码值发生改变是时触发
    handleCurrentChange (newPage) {
      this.queryInfo.pagenum = newPage
      this.getOrderList()
    },
    // 展示修改地址的对话框
    showBox () {
      this.addressVisible = true
    },
    // 清空表单项
    addressDialogClosed () {
      // 关闭时清空Form
      this.$refs.addressFormRef.resetFields()
    },
    // 展示物流对话框
    async showProgressBox () {
      // 请求地址是 kuaidi/:id
      // 804909574412544580快单号是测试使用的
      const { data: res } = await this.$http.get('kuaidi/804909574412544580')
      if (res.meta.status !== 200) {
        return this.$message.error('物流信息获取失败！')
      }
      this.progressInfo = res.data
      this.progressVisible = true
      console.log(res.data)
    }
  }
}
</script>

<style lang="less" scoped>
.el-cascader {
    width: 100%
}
</style>
