import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home/index.vue")
  },
  {
    path: "/archives",
    name: "archives",
    component: () => import("@/views/archives/index.vue")
  },
  {
    path: "/tags",
    name: "tags",
    component: () => import("@/views/tags/index.vue")
  },
  {
    path: "/articles",
    name: "articles",
    component: () => import("@/views/article/index.vue"),
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
