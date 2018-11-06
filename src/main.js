import Vue from 'vue';
import iView from 'iview';
import layer from 'vue-layer';
import stores from '@/utils/store';
import 'iview/dist/styles/iview.css';
import App from './App.vue';
import router from './router';
import './styles/index.scss';
import Http from './utils/http';

Vue.use(iView);
// vue 原型上添加 layer
Vue.prototype.$layer = layer(Vue);

// vue 原型上添加 http 方法
Vue.prototype.$fetch = Http;

// vue 原型上添加 http 方法
Vue.prototype.$stores = stores;

Vue.config.productionTip = false;

// 这里讲 vue 实例导出，是为了在 http.js 中使用。
export default new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
