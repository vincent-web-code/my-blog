export default [
  {
    meta: { title: "首页" },
    name: "home",
    path: "/home",
    component: () => import("@/views/Home/index.vue")
  }
];
