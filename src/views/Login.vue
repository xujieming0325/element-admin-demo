<template>
	<div class="Login">
		<div class="Login-box">
			<transition name="el-zoom-in-top">
			<div class="Login-box-photo transition-box" v-show="show1" ><img src="../assets/logo.png" alt=""></div>
			</transition>
			<transition name="el-zoom-in-center">
				<el-form v-show="show2" class="transition-box" label-width="60px" ref="form" :model="form" :rules="rules">
					<!-- 账号 -->
					<el-form-item label="账号" prop="username">
						<el-input placeholder="请输入账号" v-model="form.username" prefix-icon="el-icon-user-solid"></el-input>
					</el-form-item>
					<!-- 密码 -->
					<el-form-item label="密码" prop="password">
						<el-input placeholder="请输入密码" v-model="form.password" prefix-icon="el-icon-lock" show-password></el-input>
					</el-form-item>
					<el-form-item>
						<el-button type="primary" @click="postLogin">提交</el-button>
						<el-button type="warning" @click="resetForm">重置</el-button>
					</el-form-item>
				</el-form>
			</transition>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import {
		setToken,
	} from '@/utils/auth'
	export default {
		name: 'Login',
		data() {
			return {
				form: {
					username: "admin",
					password: "123456",
				},
				rules: {
					username: [{
							required: true,
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 12,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							max: 12,
							message: '长度在 3 到 5 个字符',
							trigger: 'blur'
						}
					],
				},
				data: "",
				show1:false,
				show2:false,
			}
		},
		created() {
			setTimeout(()=>{
				this.show1=true
			},1300)
			setTimeout(()=>{
				this.show2=true
			},1000)
		},
		methods: {
			resetForm() {
				this.$refs.form.resetFields();
			},
			postLogin() {
				this.$refs.form.validate(async (res) => {
					if (!res) {
						// this.$message.error('登录失败！请检查您的输入是否有误！');
						return;
					}
					await this.$http.post('/login', this.form).then(res => {
						var data = res.data
						if (data.meta.status != 200) {
							this.$message.error(`登录失败！${data.meta.msg}`);
							return;
						} else {
							this.$message.success(`${data.meta.msg}`);
							this.data = data.data;
							// this.$Cookies.set("token",this.data.token);
							setToken(this.data.token)
							console.log(this.$router.push("/mian"))
						}
					})

				});
			}
		}
	}
</script>
<style scoped lang="less">
	.Login {
		width: 100%;
		height: 100%;
		background-color: #2d3a4b;

		.Login-box {
			width: 450px;
			height: 350px;
			border-radius: 3px;
			position: absolute;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			background-color: #FFFFFF;

			.Login-box-photo {
				border-radius: 50%;
				width: 130px;
				border: 2px solid #41b883;
				padding: 10px;
				box-sizing: border-box;
				position: absolute;
				top: -20%;
				right: 35%;
				box-shadow: 0 0 10px #ddd;

				img {
					width: 100%;
					height: 100%;
					border-radius: 50%;
					background-color: #eee;
				}
			}

			.el-form {
				position: absolute;
				top: 28%;
				left: 20%;
			}
		}
	}
</style>
