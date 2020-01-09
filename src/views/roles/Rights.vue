<template>
	<el-card class="box-card">
		<!-- 切换 -->
		<el-radio-group v-model="isCollapse" class="qh">
			<el-radio-button :label="true">列表</el-radio-button>
			<el-radio-button :label="false">树状</el-radio-button>
		</el-radio-group>
		<!-- 列表展现 -->
		<el-table :data="rightsList" style="width: 100%" v-if="isCollapse">
			<el-table-column type="index" :index="indexMethod" width="100">
			</el-table-column>
			<el-table-column prop="id" label="id名称" width="">
			</el-table-column>
			<el-table-column prop="authName" label="权限名称" width="">
			</el-table-column>
			<el-table-column prop="path" label="路径" width="">
			</el-table-column>
			<el-table-column prop="level" label="权限等级">
				<template slot-scope="scope">
					<el-tag effect="dark" v-if="scope.row.level=='0'">
						一级
					</el-tag>
					<el-tag type="success" effect="dark" v-else-if="scope.row.level=='1'">
						二级
					</el-tag>
					<el-tag type="warning" effect="dark" v-else-if="scope.row.level=='2'">
						三级
					</el-tag>
					<el-tag type="danger" effect="dark" v-else-if="scope.row.level=='3'">
						四级
					</el-tag>
				</template>
			</el-table-column>
		</el-table>
		<!-- 树状展现 -->
		<el-tabs v-if="!isCollapse" tab-position="top" class="tabs1">
			<el-tab-pane v-for="item in rightsList" :label="item.authName">
				<el-row class="row1">
					<el-col :span="3">id：{{item.id}}</el-col>
					<el-col :span="6">权限名称：{{item.authName}}</el-col>
					<el-col :span="6">路径：{{item.path}}</el-col>
					<el-col :span="6">pid：{{item.pid}}</el-col>
				</el-row>
				<el-tabs v-if="!isCollapse" tab-position="top" class="tabs tabs2">
					<el-tab-pane v-for="its in item.children" :label="its.authName">
						<el-row class="row2">
							<el-col :span="3">id：{{its.id}}</el-col>
							<el-col :span="6">权限名称：{{its.authName}}</el-col>
							<el-col :span="6">路径：{{its.path}}</el-col>
							<el-col :span="6">pid：{{its.pid}}</el-col>
						</el-row>
						<el-tabs v-if="!isCollapse" tab-position="top" class="tabs tabs3">
							<el-tab-pane v-for="it in its.children" :label="it.authName">
								<el-row class="row3">
									<el-col :span="3">id：{{it.id}}</el-col>
									<el-col :span="6">权限名称：{{it.authName}}</el-col>
									<el-col :span="6">路径：{{it.path}}</el-col>
									<el-col :span="6">pid：{{it.pid}}</el-col>
								</el-row>
							</el-tab-pane>
						</el-tabs>
					</el-tab-pane>

				</el-tabs>
			</el-tab-pane>

		</el-tabs>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				rightsList: [],
				isCollapse: true,
				defaultProps: {
					children: 'children',
					label: 'authName'
				}

			}
		},
		methods: {
			indexMethod(index) {
				return index + 1;
			},
			async rightsFun() {
				var type = "";
				if (this.isCollapse) {
					type = 'list'
				} else {
					type = 'tree'
				}
				await this.$http.get(`rights/${type}`).then(res => {
					console.log(res.data.data)
					this.rightsList = res.data.data
					if (res.data.meta.status == 200) {
						this.$message.success(`${res.data.meta.msg}`);
					} else {
						success
						this.$message.error(`${res.data.meta.msg}`);
					}
				})
			},
		},
		watch: {
			isCollapse(a) {
				this.rightsFun(a);
			},
		},
		created() {
			this.rightsFun();
		}
	}
</script>

<style scoped lang="less">
	.qh {
		z-index: 999;
		position: relative;
		right: -90%;
	}

	.tabs {
		margin-top: 50px;
	}

	.row1 {    background-color: #409eff;}

	.row2 {    background-color: #5daf34;}

	.row3 {    background-color: #cf9236;}
</style>
