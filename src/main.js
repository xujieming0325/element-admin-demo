import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import {getToken}from './utils/auth.js'
// 全局样式
import './assets/css/global.css'

import axios from 'axios'
//请求路径的根路径
axios.defaults.baseURL='http://127.0.0.1:8888/api/private/v1/'
// 拦截请求
axios.interceptors.request.use(config=>{
	// 将拦截到的请求添加Authorization字段,并将Token赋值
	config.headers.Authorization=getToken();
	// 在最后必须要返回这个值
	return config;
})
Vue.prototype.$http=axios

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
