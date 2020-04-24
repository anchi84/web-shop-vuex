import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '@/views/Home.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/submit',
    name: 'SubmitCart',
    props: true,
    component: () => import(/* webpackChunkName: "submit" */ '@/views/SubmitCart.vue'),
    beforeEnter: (to, from, next) => {
      if (!to.params.approvePath) {
        next({ path: '/' });
      } else {
        next();
      }
    },
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import(/* webpackChunkName: "404" */ '@/views/NotFound.vue'),
  },
  {
    path: '*',
    redirect: '/404',
  },
];

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes,
});

export default router;
