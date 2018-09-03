import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

// @是src目录，在build的配置文件中配置的
import Login from '@/views/Login.vue';

export default new Router({
  routes: [
    { name: 'login', path: '/login', component: Login }
  ]
});
