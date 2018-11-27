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

const OtherAirportTablelist = () =>
  import(/* webpackChunkName: "OtherAirportTablelist" */ '@/views/manage-otherairport/TableList.vue');

const CodeTablelist = () =>
  import(/* webpackChunkName: "CodeTablelist" */ '@/views/manage-invitationcode/TableList.vue');

// 三级路由

const CarouselDetail = () =>
  import(/* webpackChunkName: "CarouselDetail" */ '@/views/manage-carousel/details/carouselDetail.vue');

const NavDetail = () =>
  import(/* webpackChunkName: "NavDetail" */ '@/views/manage-nav/details/navDetail.vue');

const DownloadDetail = () =>
  import(/* webpackChunkName: "DownloadDetail" */ '@/views/manage-download/details/downloadDetail.vue');

const UrlDetail = () =>
  import(/* webpackChunkName: "UrlDetail" */ '@/views/manage-url/details/urlDetail.vue');

const QuestionDetail = () =>
  import(/* webpackChunkName: "QuestionDetail" */ '@/views/manage-question/details/questionDetail.vue');

const AirportDetail = () =>
  import(/* webpackChunkName: "AirportDetail" */ '@/views/manage-airport/details/airportDetail.vue');

const UserDetail = () =>
  import(/* webpackChunkName: "UserDetail" */ '@/views/manage-user/details/userDetail.vue');

const EvidenceDetail = () =>
  import(/* webpackChunkName: "EvidenceDetail" */ '@/views/manage-evidence/details/evidenceDetail.vue');

const OtherAirportDetail = () =>
  import( /* webpackChunkName: "OtherAirportDetail" */ '@/views/manage-otherairport/details/otherApplyDetail.vue');

const NoticeDetail = () =>
  import(/* webpackChunkName: "NoticeDetail" */ '@/views/manage-notice/details/noticeDetail.vue');

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
          name: '用户管理',
          redirect: '/userManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: UserTablelist,
            },
            {
              path: 'userDetail',
              name: '用户详情',
              component: UserDetail,
            },
          ],
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
              path: 'airportDetail',
              name: '机场详情',
              component: AirportDetail,
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
              path: 'evidenceDetail',
              name: '取证机场详情',
              component: EvidenceDetail,
            },
          ],
        },
        {
          path: 'otherAirportManage',
          name: '起降场发布审核',
          redirect: '/otherAirportManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: OtherAirportTablelist,
            },
            {
              path: 'otherApplyDetail',
              name: '申请详情',
              component: OtherAirportDetail,
            },
          ],
        },
        // 问题管理
        {
          path: 'questionManage',
          name: '问题管理',
          redirect: '/questionManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: QuestionTablelist,
            },
            {
              path: 'questionDetail',
              name: '问题详情',
              component: QuestionDetail,
            },
          ],
        },
        // 公告管理
        {
          path: 'noticeManage',
          name: '公告管理',
          redirect: 'noticeManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: NoticeTablelist,
            },
            {
              path: 'noticeDetail',
              name: '发布公告',
              component: NoticeDetail,
            },
          ],
        },
        // url管理
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
              path: 'urlDetail',
              name: 'url详情',
              component: UrlDetail,
            },
          ],
        },
        // 下载管理
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
              path: 'downloadDetail',
              name: '下载详情',
              component: DownloadDetail,
            },
          ],
        },
        // 导航管理
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
              path: 'navDetail',
              name: '导航详情',
              component: NavDetail,
            },
          ],
        },
        // 轮播图管理
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
              path: 'carouselDetail',
              name: '轮播详情',
              component: CarouselDetail,
            },
          ],
        },
        // 邀请码管理
        {
          path: 'codeManage',
          name: '邀请码管理',
          redirect: '/codeManage',
          component: RouterView,
          children: [
            {
              path: '/',
              name: '',
              component: CodeTablelist,
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
