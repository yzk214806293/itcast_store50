<template>
  <el-card class="card">
    <!-- 面包屑 -->
    <my-breadcrumb level1="商品管理" level2="商品分类"></my-breadcrumb>
    <!-- 添加按钮 -->
    <el-button
      style="margin-top: 10px; margin-bottom: 10px"
      type="success"
      @click="handleOpenAddDialog"
      plain>添加分类</el-button>
    <!-- 表格 -->
    <el-table
      :height="530"
      border
      stripe
      :data="tableData"
      style="width: 100%">
      <!--
        treeKey 作用是设置每一项的唯一标示
        parentKey 绑定到父id的属性
        levelKey  绑定到不同级别的属性
        indentSize 设置不同级别之间的缩进
        childKey： 默认值是children，标示子节点的属性
       -->
      <el-table-tree-column
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        :indentSize="20"
        prop="cat_name"
        label="分类名称"
        width="300">
      </el-table-tree-column>
      <el-table-column
        label="级别"
        width="180">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效' }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button @click="handleOpenEditDialog(scope.row)" size="mini" type="primary" icon="el-icon-edit" plain></el-button>
          <el-button @click="handleDelete(scope.row)" size="mini" type="danger" icon="el-icon-delete" plain></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页组件 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[9, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- 添加的弹出对话框 -->
    <el-dialog
      title="添加商品分类"
      :visible.sync="addDialogFormVisible">
      <el-form
        label-width="80px"
        :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <!-- 多级下拉框 -->
          <!--
            expand-trigger 触发（展开）的事件
            options：提供展示的数据，是数组
            v-model 双向绑定，多级下拉框，绑定上的是多个值，数组
            @change 选中项改变的时候执行
            change-on-select 选择任意一级菜单的选项
            ？还有一个属性呢
            props 对象，设置多级下拉框显示的属性，value对象的属性，子节点对应的属性
           -->
          {{ selectedOptions }}
          <el-cascader
            clearable
            change-on-select
            expand-trigger="hover"
            :options="options"
            :props="{label: 'cat_name', value: 'cat_id', children: 'children'}"
            v-model="selectedOptions">
          </el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAdd">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 编辑的对话框 -->
    <el-dialog
      title="修改商品分类"
      :visible.sync="editDialogFormVisible">
      <el-form
        label-width="80px"
        :model="form">
        <el-form-item label="分类名称">
          <el-input v-model="form.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 配置tree grid局部组件
import ElTreeGrid from 'element-tree-grid';

export default {
  // 注册局部组件
  components: {
    'el-table-tree-column': ElTreeGrid
  },
  data() {
    return {
      tableData: [],
      // 分页数据
      pagenum: 1,
      pagesize: 9,
      total: 0,
      // 控制添加对话框的显示隐藏
      addDialogFormVisible: false,
      // 控制编辑对话框的显示隐藏
      editDialogFormVisible: false,
      form: {
        cat_name: ''
      },
      // 绑定多级下拉框
      options: [],
      selectedOptions: [],
      // 点击编辑按钮的时候，记录当前编辑的 分类对象
      currentCat: null
    };
  },
  created() {
    this.loadData();
  },
  methods: {
    // 加载商品分类数据
    async loadData() {
      const response = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`);

      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        this.tableData = response.data.data.result;
        // 获取响应之后，设置total的值
        this.total = response.data.data.total;
      } else {
        this.$message.error(msg);
      }
    },
    // 分页方法
    handleSizeChange(val) {
      this.pagesize = val;
      this.loadData();
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.pagenum = val;
      this.loadData();
      console.log(`当前页: ${val}`);
    },
    // 点击添加按钮，弹出添加对话框，加载多级下拉框数据
    async handleOpenAddDialog() {
      this.addDialogFormVisible = true;
      const response = await this.$http.get('categories?type=2');
      this.options = response.data.data;
    },
    // 点击确定按钮，添加分类
    async handleAdd() {
      // post categories.
      // 参数
      // cat_pid 添加的分类的父id
      // cat_name 分类的名称  - 绑定的文本框
      // cat_level 分类的层级0, 1, 2

      // cat_level  0 1 2
      // cat_level  this.selectedOptions.length === 0 -- 0  一级
      // cat_level  this.selectedOptions.length === 1 -- 1  二级
      // cat_level  this.selectedOptions.length === 2 -- 2  三级
      this.form.cat_level = this.selectedOptions.length;

      // cat_pid  一级分类 0
      // cat_pid  二级分类 this.selectedOptions[0]
      // cat_pid  三级分类 this.selectedOptions[1]
      if (this.selectedOptions.length === 0) {
        // 要添加一级分类
        this.form.cat_pid = 0;
      } else if (this.selectedOptions.length === 1) {
        // 要添加二级分类
        this.form.cat_pid = this.selectedOptions[0];
      } else if (this.selectedOptions.length === 2) {
        // 要添加三级分类
        this.form.cat_pid = this.selectedOptions[1];
      }
      // 发送异步请求，添加商品分类
      const response = await this.$http.post('categories', this.form);
      const { meta: { msg, status } } = response.data;
      if (status === 201) {
        // 添加成功
        this.$message.success(msg);
        this.addDialogFormVisible = false;
        this.loadData();
      } else {
        this.$message.error(msg);
      }
    },
    // 点击删除按钮，删除分类
    async handleDelete(cat) {
      // cat 要删除的分类对象
      // 删除提示
      try {
        await this.$confirm('确认要删除当前商品分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        });

        // 在此处，就是promise对象的then的回调函数中执行的代码
        // 点击完确定按钮要执行的代码
        // alert('点了确定');
        const response = await this.$http.delete(`categories/${cat.cat_id}`);
        const { meta: { msg, status } } = response.data;
        if (status === 200) {
          // 删除成功
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
      } catch (err) {
        // 点击了取消按钮执行
        // alert('点击了取消按钮');
      }
    },
    // 点击编辑按钮，弹出对话框，给文本框赋值
    handleOpenEditDialog(cat) {
      // cat 当前编辑的分类对象
      this.editDialogFormVisible = true;
      this.form.cat_name = cat.cat_name;
      // 记录当前的分类对象
      this.currentCat = cat;
    },
    // 点击确定按钮，编辑分类数据
    async handleEdit() {
      // put categories/:id   cat_name
      const response = await this.$http.put(`categories/${this.currentCat.cat_id}`, this.form);
      const { meta: { msg, status } } = response.data;
      if (status === 200) {
        // 编辑成功
        this.$message.success(msg);
        this.editDialogFormVisible = false;
        // 更改了绑定的对象，界面不会刷新
        // this.currentCat = response.data.data;
        this.currentCat.cat_name = response.data.data.cat_name;
      } else {
        this.$message.error(msg);
      }
    }
  }
};
</script>

<style>

</style>
