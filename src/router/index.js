import Vue from 'vue';
import Router from 'vue-router';
import { Message } from 'element-ui';

// 改造路由懒加载
// 路由对应的组件
const Login = () => import('@/views/Login');
const Home = () => import('@/views/Home');
const Users = () => import('@/views/users/List');
const Rights = () => import('@/views/rights/Rights');
const Roles = () => import('@/views/rights/Roles');
const Categories = () => import('@/views/goods/Categories');
const Goods = () => import('@/views/goods/Goods');
const GoodsAdd = () => import('@/views/goods/GoodsAdd');
const Params = () => import('@/views/goods/Params');
const Order = () => import('@/views/order/Order');
const Reports = () => import('@/views/reports/Reports');

Vue.use(Router);

const router = new Router({
  routes: [
    { name: 'login', path: '/login', component: Login },
    {
      name: 'home',
      path: '/',
      component: Home,
      children: [
        {
          name: 'users',
          path: '/users',
          component: Users
        },
        {
          name: 'rights',
          path: '/rights',
          component: Rights
        },
        {
          name: 'roles',
          path: '/roles',
          component: Roles
        },
        {
          name: 'categories',
          path: '/categories',
          component: Categories
        },
        {
          name: 'goods',
          path: '/goods',
          component: Goods
        },
        {
          name: 'goodsadd',
          path: '/goods/add',
          component: GoodsAdd
        },
        {
          name: 'params',
          path: '/params',
          component: Params
        },
        {
          name: 'order',
          path: '/orders',
          component: Order
        },
        {
          name: 'reports',
          path: '/reports',
          component: Reports
        }
      ]
    }
  ]
});

// 设置路由的前置守卫（路由跳转之前）
router.beforeEach((to, from, next) => {
  // 判断有没有token
  if (to.name === 'login') {
    next();
  } else {
    // 判断有没有token
    const token = sessionStorage.getItem('token');
    if (token) {
      next();
    } else {
      // 没有token，跳转到登录
      // this不是vue的实例
      // this.$router.push('/login');
      router.push('/login');
      // 提示
      // this不是vue的实例
      // this.$message.warning('请先登录');
      Message.warning('请先登录');
    }
  }
});

export default router;
