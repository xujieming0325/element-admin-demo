<template>
	<el-card class="box-card">
		<el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
		<!-- 树状展现 -->
		<el-table :data="rolesList" style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-row v-for="(item1,index1) in props.row.children" class="el-row1">
						<el-col :span="5">
							<el-row class="el-row2">
								<el-col :span="24">
									<el-tag >{{item1.authName}}</el-tag>
									<i class="el-icon-caret-right"></i>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="20">
							<el-row v-for="(item2,index2) in item1.children" class="el-row2">
								<el-col :span="5">
									<el-row>
										<el-col :span="24">
											<el-tag type="success" >{{item2.authName}}</el-tag>
											<i class="el-icon-caret-right"></i>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="19" class="last-el-row">
									<el-row>
										<el-col :span="24" style="width: 120px;" v-for="(item3,index3) in item2.children">
											<el-tag type="warning" closable @close="delRoles(props.row,item3.id)">{{item3.authName}}</el-tag>
										</el-col>
									</el-row>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column type="index" label="#">
			</el-table-column>
			<el-table-column prop="roleName" label="角色名称" width="">
			</el-table-column>
			<el-table-column prop="roleDesc" label="角色描述" width="">
			</el-table-column>
			<el-table-column label="操作" width="">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini" @click="hqXgRolesFun(scope.row.id)"></el-button>
					<el-button type="primary" icon="el-icon-delete" size="mini" @click="delRolesFun(scope.row.id)"></el-button>
					<el-button type="primary" icon="el-icon-s-tools" size="mini" @click="fpRolesFun(scope)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加用户 -->
		<el-dialog title="添加用户" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<el-form label-width="100px" :rules="rules" ref="addRoles" :model="addRoles" class="demo-dynamic">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="addRoles.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="addRoles.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="addRolesFun">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改用户信息 -->
		<el-dialog title="修改用户信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form label-width="100px" :rules="rules" ref="xgRoles" :model="xgRoles" class="demo-dynamic">
				<el-form-item label="用户名" prop="roleName">
					<el-input v-model="xgRoles.roleName"></el-input>
				</el-form-item>
				<el-form-item label="邮箱" prop="roleDesc">
					<el-input v-model="xgRoles.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="EditorRolesFun">确 定</el-button>
			</span>
		</el-dialog>
	</el-card>

</template>

<script>
	export default {
		data() {
			return {
				rolesList: [],
				dialogVisible: false,
				dialogVisible2: false,
				addRoles: {
					roleName: "",
					roleDesc: ""
				},
				xgRoles:{
					roleId:"",
					roleName: "",
					roleDesc: ""
				},
				rules: {
					roleName: [{
							required: true,
							message: '请输入角色名称',
							trigger: 'blur'
						},
						{
							min: 1,
							max: 12,
							message: '长度在 1 到 12 个字符',
							trigger: 'blur'
						}
					],
					roleDesc:[]
					
				},
			}
		},
		methods: {
			tableRowClassName({
				row,
				rowIndex
			}) {
				if (rowIndex === 1) {
					return 'warning-row';
				} else if (rowIndex % 2 == 1) {
					return 'success-row';
				}
				return '';
			},
			indexMethod(index) {
				return index + 1;
			},
			async rolesFun() {
				await this.$http.get('roles').then(res => {
					this.rolesList = res.data.data
					if (res.data.meta.status == 200) {
						this.$message.success(`${res.data.meta.msg}`);
					} else {
						this.$message.error(`${res.data.meta.msg}`);
					}
				})
			},
			addRolesFun() {
				this.$refs.addRoles.validate(async (res) => {
					if (!res) {
						return;
					}
					await this.$http.post('roles', this.addRoles).then(res => {
						var data = res.data
						if (data.meta.status != 201) {
							this.$message.error(`${data.meta.msg}`);
							return;
						} else {
							this.$message.success(`${data.meta.msg}`);
							this.rolesFun();
							this.dialogVisible = false
						}
				
					})
				
				});
			},
			// 获取需要修改的用户信息
			async hqXgRolesFun(id) {
				const {
					data: res
				} = await this.$http.get(`roles/${id}`)
				this.xgRoles = res.data
				console.log(this.xgRoles)
				this.dialogVisible2 = true
			},
			EditorRolesFun() {
				this.$refs.xgRoles.validate(async (res) => {
					if (!res) {
						return;
					}
					await this.$http.put(`roles/${this.xgRoles.roleId}`, {
						roleName: this.xgRoles.roleName,
						roleDesc: this.xgRoles.roleDesc
					}).then(res => {
						let data = res.data;
						if (data.meta.status != 200) {
							this.$message.error(`${data.meta.msg}`);
							return;
						} else {
							this.$message.success(`${data.meta.msg}`);
							// this.data = data.data;
							this.rolesFun();
							this.dialogVisible2 = false;
						}
					})
				
				
				})
			},
			delRolesFun(id) {
				this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const {
						data: res
					} = await this.$http.delete(`roles/${id}`)
					if (res.meta.status != 200) {
						this.$message.error(`${res.meta.msg}`);
						return;
					} else {
						this.$message.success(`${res.meta.msg}`);
						this.rolesFun();
					}
				}).catch(() => {
					this.$message.info('已取消删除')
				});
			},
			delRoles(row,rightId){
				this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const {
						data: res
					} = await this.$http.delete(`roles/${row.id}/rights/${rightId}`)
					if (res.meta.status != 200) {
						this.$message.error(`${res.meta.msg}`);
						return;
					} else {
						this.$message.success(`${res.meta.msg}`);
						row.children=res.data;
					}
				}).catch(() => {
					this.$message.info('已取消删除')
				});
			},
			fpRolesFun() {
				console.log(123)
			},
			// 触发右上角关闭窗口
			handleClose() {
				this.dialogVisible = this.dialogVisible2 = false
			},
		},
		watch: {
			// 判断添加用户窗口是否关闭而清空
			dialogVisible(a, b) {
				if (a == false) {
					this.$refs.addRoles.resetFields();
				}
			},
		},
		created() {
			this.rolesFun();
		}


	}
</script>

<style scoped lang="less">
	.el-table {
		.el-row1:nth-child(2n-2) {
			background: #e9edf1;
		}

		.el-row1 {
			display: flex;
			align-items: center;
			line-height: 45px;
		}

		.el-row2 {
			display: flex;
			align-items: center;
			line-height: 45px;
		}

		.last-el-row {
			display: flex;
		}
	}
</style>
