import Vue from 'vue';
import Router from 'vue-router';
import AppLayout from './components/framework/AppLayout.vue';
import RouterView from './views/router-view/router-view.vue';

// 二级路由
const UserTablelist = () =>
  import(/* webpackChunkName: "UserTablelist" */ '@/views/manage-user/TableList.vue');

const AirportTablelist = () =>
  import(/* webpackChunkName: "AirportTablelist" */ '@/views/manage-airport/TableList.vue');

const EvidenceTablelist = () =>
  import(/* webpackChunkName: "EvidenceTablelist" */ '@/views/manage-evidence/TableList.vue');

const QuestionTablelist = () =>
  import(/* webpackChunkName: "QuestionTablelist" */ '@/views/manage-question/TableList.vue');

const NoticeTablelist = () =>
  import(/* webpackChunkName: "NoticeTablelist" */ '@/views/manage-notice/TableList.vue');

const UrlTablelist = () =>
  import(/* webpackChunkName: "UrlTablelist" */ '@/views/manage-url/TableList.vue');

const DownloadTablelist = () =>
  import(/* webpackChunkName: "DownloadTablelist" */ '@/views/manage-download/TableList.vue');

const NavTablelist = () =>
  import(/* webpackChunkName: "NavTablelist" */ '@/views/manage-nav/TableList.vue');

const CarouselTablelist = () =>
  import(/* webpackChunkName: "CarouselTablelist" */ '@/views/manage-carousel/TableList.vue');

// 三级路由

const CarouselDeatail = () =>
  import(/* webpackChunkName: "CarouselDeatail" */ '@/views/manage-carousel/details/carouselDetail.vue');

const NavDeatail = () =>
  import(/* webpackChunkName: "NavDeatail" */ '@/views/manage-nav/details/navDetail.vue');

const DownloadDeatail = () =>
  import(/* webpackChunkName: "DownloadDeatail" */ '@/views/manage-download/details/downloadDetail.vue');

const UrlDeatail = () =>
  import(/* webpackChunkName: "UrlDeatail" */ '@/views/manage-url/details/urlDetail.vue');

const AirportDeatail = () =>
  import(/* webpackChunkName: "AirportDeatail" */ '@/views/manage-airport/details/airportDetail.vue');

const EvidenceDeatail = () =>
  import(/* webpackChunkName: "EvidenceDeatail" */ '@/views/manage-evidence/details/evidenceDetail.vue');

const Login = () =>
  import(/* webpackChunkName: "Login" */ '@/views/user/login.vue');

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: '',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: 'UserTablelist',
          component: UserTablelist,
        },
        {
          path: 'airportManage',
          name: '机场管理',
          redirect: '/airportManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: AirportTablelist,
            },
            {
              path: 'airportDeatail',
              name: '机场详情',
              component: AirportDeatail,
            },
          ],
        },
        {
          path: 'evidenceManage',
          name: '取证机场管理',
          redirect: '/evidenceManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: EvidenceTablelist,
            },
            {
              path: 'evidenceDeatail',
              name: '取证机场详情',
              component: EvidenceDeatail,
            },
          ],
        },
        {
          path: 'questionManage',
          name: 'QuestionTablelist',
          component: QuestionTablelist,
        },
        {
          path: 'noticeManage',
          name: 'NoticeTablelist',
          component: NoticeTablelist,
        },
        {
          path: 'urlManage',
          name: 'url管理',
          redirect: '/urlManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: UrlTablelist,
            },
            {
              path: 'urlDeatail',
              name: 'url详情',
              component: UrlDeatail,
            },
          ],
        },
        {
          path: 'downloadManage',
          name: '下载管理',
          redirect: '/downloadManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: DownloadTablelist,
            },
            {
              path: 'downloadDeatail',
              name: '下载详情',
              component: DownloadDeatail,
            },
          ],
        },
        {
          path: 'navManage',
          name: '导航管理',
          redirect: '/navManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: NavTablelist,
            },
            {
              path: 'navDeatail',
              name: '导航详情',
              component: NavDeatail,
            },
          ],
        },
        {
          path: 'carouselManage',
          name: '轮播管理',
          redirect: '/carouselManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: CarouselTablelist,
            },
            {
              path: 'carouselDeatail',
              name: '轮播详情',
              component: CarouselDeatail,
            },
          ],
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '*',
      name: '',
      component: AppLayout,
      children: [
        {
          path: '/',
          name: '404',
          component: Login,
        },
      ],
    },
  ],
});
