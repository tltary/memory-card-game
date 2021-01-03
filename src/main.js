import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false

Vue.prototype.api_key = '1ba1cf12-49be-44c6-b6a4-8f3fb547444d';

new Vue({
  render: h => h(App),
}).$mount('#app')
