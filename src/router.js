import Vue from "vue";
import Router from "vue-router";
import AppLayout from "./components/framework/AppLayout.vue";

const UserTablelist = () =>
    import(/* webpackChunkName: "Tablelist" */ "@/views/user-manage/TableList.vue");

const AirportTablelist = () =>
    import(/* webpackChunkName: "Tablelist" */ "@/views/airport-manage/TableList.vue");

const Login = () =>
    import(/* webpackChunkName: "Tablelist" */ "@/views/user/login.vue");

Vue.use(Router);

export default new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [
        {
            path: "/",
            name: "",
            component: AppLayout,
            children: [
                {
                    path: "/",
                    name: "AirportTablelist",
                    component: AirportTablelist
                },
                {
                    path: "userManage",
                    name: "UserTablelist",
                    component: UserTablelist
                }
            ]
        },
        {
            path: "/login",
            name: "login",
            component: Login
        }
    ]
});
