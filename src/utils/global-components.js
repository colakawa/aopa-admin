import LayoutHeader from '../components/Layout/LayoutHeader.vue';
import LayoutSideNav from '../components/Layout/LayoutSideNav.vue';
import LayoutCrumbs from '../components/Layout/LayoutCrumbs.vue';

export default function (Vue) {
    Vue.component('LayoutHeader', LayoutHeader);
    Vue.component('LayoutSideNav', LayoutSideNav);
    Vue.component('LayoutCrumbs', LayoutCrumbs);
}