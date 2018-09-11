<template>
  <el-card class="card">
    <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>

    <div ref="div" style="width: 800px; height: 600px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts';

export default {
  mounted() {
    // 1 初始化echarts的实例
    const myChart = echarts.init(this.$refs.div);
    // 2 准备option
    // const option = {
    //   title: {
    //     text: 'ECharts Hello'
    //   },
    //   tooltip: {},
    //   legend: {
    //     data:['销量']
    //   },
    //   xAxis: {
    //     data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
    //   },
    //   yAxis: {},
    //   series: [{
    //     name: '销量',
    //     type: 'bar',
    //     data: [1000, 20, 36, 10, 10, 20]
    //   }]
    // };
    const option = {
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line'
        }]
    };

    // 3 设置option
    myChart.setOption(option)
  }
};
</script>

<style>

</style>
