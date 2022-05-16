import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Home from '@/ui/views/Home.vue';
import Custom from '@/ui/views/Custom.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/custom',
    name: 'Custom',
    component: Custom,
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/ui/views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
