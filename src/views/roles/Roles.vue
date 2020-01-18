<template>
	<el-card class="box-card">
		<el-button type="primary" @click="dialogVisible=true">添加角色</el-button>
		<!-- 树状展现 -->
		<el-table :data="rolesList" style="width: 100%" :row-class-name="tableRowClassName">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-row v-for="(item1,index1) in props.row.children" class="el-row1" :key="item1.id">
						<el-col :span="5">
							<el-row class="el-row2">
								<el-col :span="24">
									<el-tag closable @close="delRoles(props.row,item1.id)">{{item1.authName}}</el-tag>
									<i class="el-icon-caret-right"></i>
								</el-col>
							</el-row>
						</el-col>
						<el-col :span="20">
							<el-row v-for="(item2,index2) in item1.children" :key="item2.id" class="el-row2">
								<el-col :span="5">
									<el-row>
										<el-col :span="24">
											<el-tag type="success" closable @close="delRoles(props.row,item2.id)">{{item2.authName}}</el-tag>
											<i class="el-icon-caret-right"></i>
										</el-col>
									</el-row>
								</el-col>
								<el-col :span="19" class="last-el-row">
									<el-row>
										<el-col :span="24" style="width: 120px;" v-for="(item3,index3) in item2.children" :key="item3.id">
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
					<el-button type="danger" icon="el-icon-delete" size="mini" @click="delRolesFun(scope.row.id)"></el-button>
					<el-button type="warning" icon="el-icon-s-tools" size="mini" @click="dkRolesFun(scope.row)"></el-button>
				</template>
			</el-table-column>
		</el-table>
		<!-- 添加角色 -->
		<el-dialog title="添加角色" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
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
		<!-- 修改角色信息 -->
		<el-dialog title="修改角色信息" :visible.sync="dialogVisible2" width="30%" :before-close="handleClose">
			<el-form label-width="100px" :rules="rules" ref="xgRoles" :model="xgRoles" class="demo-dynamic">
				<el-form-item label="角色名称" prop="roleName">
					<el-input v-model="xgRoles.roleName"></el-input>
				</el-form-item>
				<el-form-item label="角色描述" prop="roleDesc">
					<el-input v-model="xgRoles.roleDesc"></el-input>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible2 = false">取 消</el-button>
				<el-button type="primary" @click="EditorRolesFun">确 定</el-button>
			</span>
		</el-dialog>
		<!-- 修改角色权限 -->
		<el-dialog title="修改角色权限" :visible.sync="dialogVisible3" width="40%" :before-close="handleClose">
			<el-tree ref="treeRef" :props="RolesProps" :data="RolesloadNode" node-key="id" default-expand-all
			 :default-checked-keys="defKeys" show-checkbox>
			</el-tree>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible3 = false">取 消</el-button>
				<el-button type="primary" @click="SetRolesFun">确 定</el-button>
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
				dialogVisible3: false,
				addRoles: {
					roleName: "",
					roleDesc: ""
				},
				xgRoles: {
					roleId: "",
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
					roleDesc: []
				},
				RolesProps: {
					label: 'authName',
					children: 'children'
				},
				RolesloadNode: [],
				defKeys: [],
				row: ""
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
			// 获取角色列表
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
			// 添加角色
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
			// 获取需要修改的角色信息
			async hqXgRolesFun(id) {
				const {
					data: res
				} = await this.$http.get(`roles/${id}`)
				this.xgRoles = res.data
				this.dialogVisible2 = true
			},
			// 修改角色信息
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
			// 删除角色
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
			// 删除指定权限
			delRoles(row, rightId) {
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
						row.children = res.data;
					}
				}).catch(() => {
					this.$message.info('已取消删除')
				});
			},
			// 使用递归获取权限id
			getDefKeys(node, arr) {
				if (!node.children) {
					return arr.push(node.id)
				}
				node.children.forEach(item => {
					this.getDefKeys(item, arr)
				})
			},
			// 打开设置权限框
			async dkRolesFun(row) {
				this.row = row
				this.dialogVisible3 = true
				this.defKeys = []
				this.getDefKeys(row, this.defKeys);
				await this.$http.get('rights/tree').then(res => {
					this.RolesloadNode = res.data.data
					if (res.data.meta.status == 200) {
						this.$message.success(`${res.data.meta.msg}`);
					} else {
						this.$message.error(`${res.data.meta.msg}`);
					}
				})
			},
			// 分配角色权限
			SetRolesFun() {
				const keys = [
					...this.$refs.treeRef.getCheckedKeys(),
					...this.$refs.treeRef.getHalfCheckedKeys(),
				]
				const idStr = keys.join(',')
				this.$confirm('此操作将保存该权限设置, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
				}).then(async () => {
					const {
						data: res
					} = await this.$http.post(`roles/${this.row.id}/rights`, {
						rids: idStr
					})
					if (res.meta.status != 200) {
						this.$message.error(`${res.meta.msg}`);
						return;
					} else {
						this.$message.success(`${res.meta.msg}`);
						this.dialogVisible3 = false
						this.rolesFun();
					}
				}).catch(() => {
					this.$message.info('已取消删除')
				});


			},
			// 触发右上角关闭窗口
			handleClose() {
				this.dialogVisible = this.dialogVisible2 = this.dialogVisible3 = false
			},
		},
		watch: {
			// 判断添加角色窗口是否关闭而清空
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
