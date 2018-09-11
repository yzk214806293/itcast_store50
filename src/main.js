// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/css/index.css';
import MyHttp from '@/plugins/MyHttp';
import moment from 'moment';
import MyBreadcrumb from '@/components/MyBreadcrumb';

// 演示es6模块化的语法
// 1. export default 只能导出一个对象，导入的时候要使用import o from ...
// import o from './test';
// o.obj1.say();

// 2. 按需导出， 导出 export { .. }  导入 import { ... } from ...
// 按需导入的时候，变量的名字必须跟到处是一致的
// import { obj1 } from './test';
// obj1.say();

// 过滤器，格式化日期字符串
Vue.filter('fmtDate', (value, fmtStr) => {
  return moment(value).format(fmtStr);
});
// 全局注册面包屑组件
Vue.component(MyBreadcrumb.name, MyBreadcrumb);

// 注册MyHttp插件
Vue.use(MyHttp);

// 注册插件ElementUI
Vue.use(ElementUI);

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});
