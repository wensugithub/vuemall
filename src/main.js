import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
// 声明一个事件总线
Vue.prototype.$bus = new Vue();

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
