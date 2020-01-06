import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Mian from '../views/Main.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/users/index.vue'
import {
	getToken
} from '@/utils/auth'
Vue.use(VueRouter)
const routes = [{
		path: '/',
		redirect: '/login'
	},
	{
		path: '/login',
		component: Login
	},
	{
		path: '/mian',
		component: Mian,
		redirect: '/welcome',
		children: [{
			path: '/welcome',
			component: Welcome,
		}, {
			path: '/users',
			component: Users,
		}]
	}
]

const router = new VueRouter({
	routes
})
// 挂载路由导航卫士
router.beforeEach((to, from, next) => {
	// to 即将要访问的路径
	// from 从哪来的路径
	// next 一个放行函数,也可以强制跳到 next('地址')

	// 如果将要访问的地址是登陆页面,即放行
	if (to.path === '/login') return next();
	// 获取token
	const token = getToken();
	if (token) {
		next();
	} else {
		next('/login')
	}


})
export default router
