import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          path: "/",
          name: "tablelist",
          component: () => import("./views/airport-manage/TableList.vue")
        },
        {
          path: "userManage",
          name: "tablelist",
          component: () => import("./views/user-manage/TableList.vue")
        }
      ]
    },
    {
      path: "/login",
      name: "login",
      component: () => import("./views/login.vue")
    },
  ]
});
