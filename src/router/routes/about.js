export default [
  {
    path: '/',
    name: 'About',
    component: () => import(/* webpackChunkName: "About" */ '@/views/About.vue'),
  },
];
