import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("@/components/v-todo")
  },
  {
    path: "/:page",
    component: () => import("@/components/v-todo")
  },
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
