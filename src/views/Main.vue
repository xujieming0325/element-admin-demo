<template>
	<el-container>
		<el-header>
			<el-row>
				<el-col :span="22">
					<div class="header-l">
						<img src="../assets/logo.png" alt="">
						<h2>电商后台管理</h2>
					</div>
				</el-col>
				<el-col :span="2">
					<el-button type="info" @click="tuichu">注销</el-button>
				</el-col>
			</el-row>

		</el-header>
		<el-container>
			<el-aside :width="OnOffWidth+'px'">
				<div class="OnOff" @click="isCollapseFun"><span :class="isCollapse?'el-icon-d-arrow-right':'el-icon-d-arrow-left'"></span></div>
				<el-menu :collapse-transition="false" :collapse="isCollapse" background-color="#545c64" text-color="#fff"
				 active-text-color="#409EFF" :default-active="this.$route.fullPath" router>
					<el-submenu :index="item.id+''" v-for="item in list" :key="item.id">
						<template slot="title">
							<i :class="listIcon[item.id]"></i>
							<span>{{item.authName}}</span>
						</template>
						<el-menu-item-group v-for="i in item.children">
							<el-menu-item :index="'/'+i.path">{{i.authName}}</el-menu-item>
						</el-menu-item-group>
					</el-submenu>
				</el-menu>
			</el-aside>
			<el-container>
				<el-main>
					<el-breadcrumb separator-class="el-icon-arrow-right">
						<el-breadcrumb-item v-for="item in levelList" :key="item.path" :to="item.path">{{item.meta.title}}</el-breadcrumb-item>
					</el-breadcrumb>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</el-container>
</template>

<script>
	import {
		removeToken,
	} from '@/utils/auth'
	export default {
		data() {
			return {
				isCollapse: false,
				OnOffWidth: 200,
				levelList: [],
				list: "",
				listIcon: {
					'101': "el-icon-s-shop",
					'102': "el-icon-s-custom",
					'103': "el-icon-s-cooperation",
					'125': "el-icon-s-order",
					'145': "el-icon-s-data"
				}
			}
		},
		methods: {
			// 退出
			tuichu() {
				removeToken();
				this.$router.push("/login")
			},
			isCollapseFun() {
				this.isCollapse = !this.isCollapse;
				if (this.isCollapse) {
					this.OnOffWidth = 64
				} else {
					this.OnOffWidth = 200
				}
			},
			async getList() {
				await this.$http.get('menus').then(res => {
					this.list = res.data.data
				})
			},
			getBreadcrumb() {
				let matched = this.$route.matched.filter(item => item.name)
				const first = matched[0];
				if (first && first.name.trim().toLocaleLowerCase() !== '首页'.toLocaleLowerCase()) {
					matched = [{
						path: '/welcome',
						meta: {
							title: '首页'
						}
					}].concat(matched)
				}
				this.levelList = matched
			}

		},
		watch: {
			$route() {
				this.getBreadcrumb()
			}
		},
		created() {
			this.getList();
			this.getBreadcrumb()
		},
		mounted() {

		}
	}
</script>

<style lang="less" scoped>
	.el-container {
		width: 100%;
		height: 100%;
	}

	.el-header {
		text-align: center;

		.el-button {
			height: 30px;
			line-height: 0px;
			margin-top: 15px;
		}
	}

	.header-l {
		display: flex;

		img {
			    width: 50px;
			    height: 50px;
			    background: #FFFFFF;
			    border-radius: 50%;
			    margin-right: 15px;
			    margin-top: 5px;
		}

		h2 {
			color: #FFFFFF;
			font-size: 20px;
			line-height: 26px;
		}
	}

	.el-header {
		background-color: #363d40;
	}

	.el-main {
		background-color: #e9edf1;

		.el-breadcrumb {
			margin-bottom: 10px;
		}
	}

	.el-aside {
		background-color: #313743;

		.OnOff {
			position: relative;
			width: 100%;
			height: 28px;
			background: #409eff;

			span {
				text-align: center;
				display: block;
				padding: 5px;
				font-size: 20px;
				color: #FFFFFF;
			}
		}

		.el-menu {
			background: none;
			border: none;
		}
	}
</style>
