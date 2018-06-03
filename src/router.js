import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import Register from './views/Register.vue';
import Login from './views/Login.vue';
import Articles from './views/Articles.vue';
import Article from './views/Article.vue';
import Create from './views/Create.vue';
// import store from './store';

Vue.use(Router);

// function loggedIn(to, from, next) {
//   store.dispatch('auth/authenticate')
//     .then(() => next())
//     .catch(() => next('/login'));
// }

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: Home,
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/articles',
      name: 'articles',
      component: Articles,
    },
    {
      path: '/articles/:id',
      name: 'articleView',
      component: Article,
    },
    {
      path: '/admin/create',
      name: 'create',
      component: Create,
    },
  ],
});
