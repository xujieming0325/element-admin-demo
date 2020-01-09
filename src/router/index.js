import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Mian from '../views/Main.vue'
import Welcome from '../views/Welcome.vue'
import Users from '../views/users/Users.vue'
import Roles from '../views/roles/Roles.vue'
import Rights from '../views/roles/Rights.vue'
import Categories from '../views/commodity/categories.vue'
import Goods from '../views/commodity/goods.vue'
import Params from '../views/commodity/params.vue'
import Orders from '../views/order/orders.vue'
import Reports from '../views/reports/reports.vue'
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
				name: '首页',
				meta: {
					title: '首页'
				},
			}, {
				path: '/users',
				component: Users,
				name: '用户列表',
				meta: {
					title: '用户列表'
				},
			}, {
				path: '/roles',
				component: Roles,
				name: '角色列表',
				meta: {
					title: '角色列表'
				},
			},
			{
				path: '/rights',
				component: Rights,
				name: '权限列表',
				meta: {
					title: '权限列表'
				},
			},

			{
				path: '/goods',
				component: Goods,
				name: '商品列表',
				meta: {
					title: '商品列表'
				},
			},
			{
				path: '/params',
				component: Params,
				name: '分类参数',
				meta: {
					title: '分类参数'
				},
			},
			{
				path: '/categories',
				component: Categories,
				name: '商品分类',
				meta: {
					title: '商品分类'
				},
			},

			{
				path: '/orders',
				component: Orders,
				name: '订单列表',
				meta: {
					title: '订单列表'
				},
			},
			{
				path: '/reports',
				component: Reports,
				name: '数据报表',
				meta: {
					title: '数据报表'
				},
			}

		]
	}
]

const router = new VueRouter({
	mode: 'history',
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
