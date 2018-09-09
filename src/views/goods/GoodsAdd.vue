<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品添加"></my-breadcrumb>
    <!-- alert -->
    <el-alert
      style="margin-top: 10px; margin-bottom: 10px"
      :closable="false"
      title="添加商品信息"
      type="info"
      center
      show-icon>
    </el-alert>
    <!-- 步骤条 -->
    <el-steps
      :active="active"
      align-center
      finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品内容"></el-step>
    </el-steps>
    <!-- tab栏 -->
    <el-form
      label-position="top"
      label-width="80px"
      :model="formData">
      <el-tabs
        @tab-click="handleTabClick"
        tab-position="left"
        style="margin-top: 15px">
        <el-tab-pane label="基本信息">
          <!-- 基本信息 -->
          <el-form-item label="商品名称">
            <el-input v-model="formData.goods_name"></el-input>
          </el-form-item>
          <el-form-item label="商品价格">
            <el-input v-model="formData.goods_price"></el-input>
          </el-form-item>
          <el-form-item label="商品重量">
            <el-input v-model="formData.goods_weight"></el-input>
          </el-form-item>
          <el-form-item label="商品数量">
            <el-input v-model="formData.goods_number"></el-input>
          </el-form-item>
          <el-form-item label="商品分类">
            <!-- 多级下拉框 -->
            {{ selectedOptions }}
            <el-cascader
              clearable
              expand-trigger="hover"
              :options="options"
              :props="{ label: 'cat_name', value: 'cat_id', children: 'children' }"
              v-model="selectedOptions">
            </el-cascader>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      formData: {
        goods_name: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        // 用,分割的分类id列表
        goods_cat: ''
      },
      // 绑定多级下拉的数据
      options: [],
      // 绑定下拉框中的option
      selectedOptions: []
    };
  },
  methods: {
    // 点击tab标签页的时候执行
    handleTabClick(tab) {
      // 被选中的标签 tab 实例
      // console.log(tab);
      // tab.index  当前tab页的索引-字符串类型
      this.active = tab.index - 0;
    }
  }
};
</script>

<style>
.el-step__title {
  /* 这个是step组件的样式，如果加上scoped之后不起作用，可以放到全局样式中 */
  font-size: 12px;
}
</style>
