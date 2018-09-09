<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="分类参数"></my-breadcrumb>
    <!-- alert -->
    <el-alert
      style="margin-top: 10px; margin-bottom: 10px"
      :closable="false"
      title="注意：只允许为第三级分类设置相关参数！"
      type="warning"
      show-icon>
    </el-alert>
    <!-- 层级下拉框 -->
    <el-row>
      <el-col :span="24">
        请选择商品分类：
        <el-cascader
          :show-all-levels="false"
          expand-trigger="hover"
          :options="options"
          :props="{}"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </el-col>
    </el-row>
    <!-- tab栏切换 -->
    <!-- {{ activeTab }} -->
    <el-tabs v-model="activeTab" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">用户管理</el-tab-pane>
      <el-tab-pane label="静态参数" name="only">配置管理</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      options: [],
      selectedOptions: [],
      activeTab: 'many'
    };
  },
  methods: {
    // 多级下拉发生改变的时候执行
    handleChange() {
    },
    // 点击tab的时候执行
    handleClick(tab) {
    }
  }
};
</script>

<style>

</style>
