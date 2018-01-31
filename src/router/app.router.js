import Vue from 'vue';
import Router from 'vue-router';

import Post from '../components/Post.vue';
import Home from '../components/Home.vue';

Vue.use(Router);

export default new Router({
  routes: [
    { 
      path: '/',
      redirect: '/home'
    },
    {
      path: '/post',
      name: 'post',
      component: Post
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    }
  ]
});
