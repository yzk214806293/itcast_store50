<template>
  <el-card class="card">
    <my-breadcrumb level1="数据统计" level2="数据报表"></my-breadcrumb>

    <div ref="div" style="width: 800px; height: 600px"></div>
  </el-card>
</template>

<script>
import echarts from 'echarts';

export default {
  async mounted() {
    // 发送异步请求，获取图片数据
    // reports/type/1
    const response = await this.$http.get('reports/type/1');

    // 2 准备option
    let option = response.data.data;

    const data = {
      title: {
        text: 'xxx'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        }
      },
      toolbox: {
        feature: {
          saveAsImage: {}
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    };

    option = { ...option, ...data };

    // 设置xAxis 中的 boundaryGap : false,
    option.xAxis[0].boundaryGap = false;

    // 1 初始化echarts的实例
    const myChart = echarts.init(this.$refs.div);
    // 3 设置option
    myChart.setOption(option);
  }
};
</script>

<style>

</style>
