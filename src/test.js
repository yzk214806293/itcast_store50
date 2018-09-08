// 演示es6的模块化语法
// 模块
const obj1 = {
  name: 'zs',
  age: 18,
  say: function () {
    console.log(this.name);
  }
};

const obj2 = {
  name: 'ww',
  say: function () {
    console.log(this.name);
  }
};

// export default 只能导出一个成员
export default { obj1, obj2 };

// 导出多个成员
export { obj2, obj1 };
