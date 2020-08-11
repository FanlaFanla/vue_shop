<template>
    <div>
        <!-- 面包屑导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>数据统计</el-breadcrumb-item>
        <el-breadcrumb-item>数据报表</el-breadcrumb-item>
        </el-breadcrumb>

        <!-- 卡片视图区域 -->
        <el-card>
            <!-- 2.为echarts准备一个具备大小的容器 -->
            <div id="main" style="width: 700px;height: 400px;"></div>
        </el-card>
    </div>

</template>

<script>
// 1.导入数据可视化组件
import echarts from 'echarts'
import _ from 'lodash'

export default {
  data () {
    return {
      // options数据是echarts需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {},
        legend: {
          data: ['销量']
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      }
    }
  },
  created () {},
  // mounted 此时，页面上的元素，已经被渲染完毕了
  async mounted () {
    // 3.基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }

    // 4.准备数据和配置项
    // 使用lodash的merge方法进行数据合并，返回新数据对象
    const result = _.merge(res.data, this.options)

    // 5.展示数据
    myChart.setOption(result)

    console.log(res.data)
  },
  methods: {}
}
</script>

<style lang="less" scoped>

</style>
