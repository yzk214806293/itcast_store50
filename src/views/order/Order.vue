<template>
  <el-card class="card">
    <my-breadcrumb level1="权限管理" level2="权限列表"></my-breadcrumb>
    <el-table
      border
      stripe
      :data="tableData"
      style="width: 100%; margin-top: 10px">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column
        prop="order_number"
        label="订单编号"
        width="300">
      </el-table-column>
      <el-table-column
        prop="order_price"
        label="订单价格"
        width="80">
      </el-table-column>
      <el-table-column
        prop="order_pay"
        label="是否付款"
        width="100">
      </el-table-column>
      <el-table-column
        prop="is_send"
        label="是否发货"
        width="80">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="下单时间"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain icon="el-icon-edit"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    };
  }
};
</script>

<style>

</style>
