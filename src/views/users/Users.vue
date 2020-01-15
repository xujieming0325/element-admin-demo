<template>
	<div>
		<el-card class="box-card">
			<el-row :gutter="20">
				<el-col :span="8">
					<el-input clearable placeholder="请输入姓名" v-model="queryUsers.query" class="input-with-select">
						<el-button slot="append" icon="el-icon-search" @click="getSearch"></el-button>
					</el-input>
				</el-col>
				<el-col :span="8">
					<el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
				</el-col>
			</el-row>
			<el-table :data="UsersData.users" :row-class-name="tableRowClassName" style="width: 100%">
				<el-table-column type="index" :index="indexMethod">
				</el-table-column>
				<el-table-column prop="username" label="姓名">
				</el-table-column>
				<el-table-column prop="email" label="邮箱">
				</el-table-column>
				<el-table-column prop="mobile" label="电话">
				</el-table-column>
				<el-table-column prop="role_name" label="角色">
				</el-table-column>
				<el-table-column label="状态">
					<template slot-scope="scope">
						<el-tooltip :content="scope.row.mg_state?'已开启':'已关闭'" placement="top" :enterable="false">
							<el-switch v-model="scope.row.mg_state" @change="putState(scope.row.id,scope.row.mg_state)">
							</el-switch>
						</el-tooltip>
					</template>
				</el-table-column>
				<el-table-column label="操作" width="180">
					<template slot-scope="scope">
						<el-button type="primary" icon="el-icon-edit" size="mini" @click="hqXgUsersFun(scope.row.id)"></el-button>
						<el-button type="primary" icon="el-icon-delete" size="mini" @click="delUsersFun(scope.row.id)"></el-button>
						<el-button type="primary" icon="el-icon-s-tools" size="mini" @click="fpUsersFun(scope)"></el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination :hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="UsersData.pagenum" :page-sizes="[1, 3, 5, 7, 10]" :page-size="queryUsers.pagesize" layout="total, sizes, prev, pager, next, jumper"
			 :total="UsersData.total">
			</el-pagination>
		</el-card>
		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-width="100px" :rules="rules" ref="addUsers" :model="addUsers" class="demo-dynamic">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="addUsers.username"></el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input v-model="addUsers.password"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="addUsers.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="mobile">
					<el-input v-model="addUsers.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addUsersFun">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改用户信息 -->
		<el-dialog title="修改用户信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form label-width="100px" :rules="rules" ref="xgUsers" :model="xgUsers" class="demo-dynamic">
				<el-form-item label="用户名" prop="username">
					<el-input v-model="xgUsers.username" disabled></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="email">
					<el-input v-model="xgUsers.email"></el-input>
				</el-form-item>
				<el-form-item label="手机号码" prop="mobile">
					<el-input v-model="xgUsers.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="xgUsersFun">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 分配角色的对话框 -->
		<el-dialog title="分配角色" :visible.sync="dialogVisible3" width="50%">
			<div>
				<p>当前的用户：</p>
				<p>当前的角色：</p>
				<p>分配新角色：
					<el-select placeholder="请选择">
						<el-option>
						</el-option>
					</el-select>
				</p>
			</div>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible3 = false">取 消</el-button>
				<el-button type="primary">确 定</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				queryUsers: {
					query: "",
					pagenum: 1,
					pagesize: 10
				},
				UsersData: "",
				SearchVal: "",
				count: true,
				dialogVisible: false,
				dialogVisible2: false,
				dialogVisible3: false,
				addUsers: {
					username: "",
					password: "",
					email: "",
					mobile: ""
				},
				xgUsers: "",
				rules: {
					username: [{
							required: true,
							message: '请输入账户',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 12,
							message: '长度在 1 到 12 个字符',
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
							message: '长度在 6 到 12 个字符',
							trigger: 'blur'
						}
					],
					email: [{
							required: true,
							message: '请输入邮箱地址',
							trigger: 'blur'
						},
						{
							type: 'email',
							message: '请输入正确的邮箱地址',
							trigger: ['blur', 'change']
						}
					],
					mobile: [{
						required: true,
						min: 11,
						max: 11,
						message: '请输入正确的手机号码',
						trigger: 'blur'
					}]
				},

			}
		},
		methods: {
			indexMethod(index) {
				return index + 1;
			},
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex%2==1) {
					return 'success-row';
				}
				return '';
			},
			// 获取用户列表
			async getUsers() {
				const {
					data: res
				} = await this.$http.get('users', {
					params: this.queryUsers
				});
				this.UsersData = res.data;
			},
			handleSizeChange(val) {
				this.queryUsers.pagesize = val;
				this.getUsers();
			},
			handleCurrentChange(val) {
				this.queryUsers.pagenum = val;
				this.getUsers();
			},
			// 修改用户启用权限
			async putState(id, type) {
				const {
					data
				} = await this.$http.put(`users/${id}/state/${type}`)
				if (data.meta.status == 200) {
					this.$message.success(`${data.meta.msg}`);
				} else {
					this.$message.error(`${data.meta.msg}`);
				}

			},
			// 搜索用户触发
			async getSearch() {
				if (this.queryUsers.query == "" && this.count == false) {
					return
				} else if (this.count) {
					this.count = false
				} else if (this.queryUsers.query != "") {
					this.count = true
				}
				this.getUsers();
			},
			// 添加用户
			addUsersFun() {
				this.$refs.addUsers.validate(async (res) => {
					if (!res) {
						return;
					}
					await this.$http.post('users', this.addUsers).then(res => {
						var data = res.data
						if (data.meta.status != 201) {
							this.$message.error(`${data.meta.msg}`);
							return;
						} else {
							this.$message.success(`${data.meta.msg}`);
							// this.data = data.data;
							console.log(data)
							this.getUsers();
							this.dialogVisible = false
						}

					})

				});
			},
			// 触发右上角关闭窗口
			handleClose() {
				this.dialogVisible = this.dialogVisible2 = false
			},
			// 获取需要修改的用户信息
			async hqXgUsersFun(id) {
				const {
					data: res
				} = await this.$http.get(`users/${id}`)
				this.xgUsers = res.data
				this.dialogVisible2 = true
			},
			// 修改用户信息
			xgUsersFun() {
				this.$refs.xgUsers.validate(async (res) => {
					if (!res) {
						return;
					}
					await this.$http.put(`users/${this.xgUsers.id}`, {
						email: this.xgUsers.email,
						mobile: this.xgUsers.mobile
					}).then(res => {
						let data = res.data;
						if (data.meta.status != 200) {
							this.$message.error(`${data.meta.msg}`);
							return;
						} else {
							this.$message.success(`${data.meta.msg}`);
							// this.data = data.data;
							this.getUsers();
							this.dialogVisible2 = false;
						}
					})


				})

			},
			// 删除用户
			delUsersFun(id) {
				this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const {
						data: res
					} = await this.$http.delete(`users/${id}`)
					console.log(res)
					this.getUsers();
					if (res.meta.status != 200) {
						this.$message.error(`${res.meta.msg}`);
						return;
					} else {
						this.$message.success(`${res.meta.msg}`);
						this.getUsers();
					}
				}).catch(() => {
					this.$message.info('已取消删除')
				});

			},
			// 分配用户角色
			fpUsersFun(scope) {
				this.dialogVisible3 = true;
				console.log(scope);
			}

		},
		watch: {
			// 判断添加用户窗口是否关闭而清空
			dialogVisible(a, b) {
				if (a == false) {
					this.$refs.addUsers.resetFields();
				}
			},
			dialogVisible2(a, b) {
				if (a == false) {
					this.$refs.xgUsers.resetFields();
				}
			},
		},
		created() {
			// 获取用户列表信息
			this.getUsers();
		}

	}
</script>

<style>

	.el-pagination {
		margin-top: 15px;
	}
</style>
