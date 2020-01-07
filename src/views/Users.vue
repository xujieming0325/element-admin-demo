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
					<el-button type="primary" @click="addUsersFun">添加用户</el-button>
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
				<el-table-column prop="mg_state" label="操作" width="180">
					<el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
					<el-button type="primary" icon="el-icon-delete" size="mini"></el-button>
					<el-button type="primary" icon="el-icon-s-tools" size="mini"></el-button>
				</el-table-column>
			</el-table>
			<el-pagination :hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
			 :current-page="UsersData.pagenum" :page-sizes="[1, 3, 5, 7, 10]" :page-size="queryUsers.pagesize" layout="total, sizes, prev, pager, next, jumper"
			 :total="UsersData.total">
			</el-pagination>
		</el-card>
		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form   label-width="100px" class="demo-dynamic">
				<el-form-item  label="用户名">
					<el-input v-model="addUsers.username"></el-input>
				</el-form-item>
				<el-form-item  label="密码">
					<el-input v-model="addUsers.password"></el-input>
				</el-form-item>
				<el-form-item  label="邮箱">
					<el-input v-model="addUsers.email"></el-input>
				</el-form-item>
				<el-form-item  label="手机号码">
					<el-input v-model="addUsers.mobile"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="dialogVisible = false">确 定</el-button>
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
					pagesize: 5
				},
				UsersData: "",
				SearchVal: "",
				count: true,
				dialogVisible: false,
				addUsers:{
					username:"",
					password:"",
					email:"",
					mobile:""
				}

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
				} else if (rowIndex === 3) {
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
					this.$message({
						message: data.meta.msg,
						type: 'success'
					});
				} else {
					this.$message({
						message: data.meta.msg,
						type: 'warning'
					});
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
				this.dialogVisible = !this.dialogVisible
			},
			// 触发右上角关闭窗口
			handleClose() {
				this.dialogVisible = false
			},


		},
		created() {
			this.getUsers();
		}

	}
</script>

<style>
	.el-table .warning-row {
		background: oldlace;
	}

	.el-table .success-row {
		background: #f0f9eb;
	}

	.el-pagination {
		margin-top: 15px;
	}
</style>
