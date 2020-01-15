<template>
	<el-card class="box-card">
		<!-- 树状展现 -->
		<el-table :data="rightsList" style="width: 100%" :border="true" :row-class-name="tableRowClassName">
			<el-table-column type="expand">
				<template slot-scope="props">
					<el-row v-for="(item1,index1) in props.row.children" class="el-row1">
						<el-col :span="7">
							<el-row class="el-row2">
							  <el-col :span="7"><el-tag >{{item1.id}}</el-tag></el-col>
							  <el-col :span="7"><el-tag type="success">{{item1.authName}}</el-tag></el-col>
							  <el-col :span="7"><el-tag type="warning">{{item1.path}}</el-tag></el-col>
							  <el-col :span="2"><i class="el-icon-caret-right"></i></el-col>
							</el-row>
						</el-col>
						<el-col :span="16">
							<el-row v-for="(item2,index2) in item1.children" class="el-row2">
								<el-col :span="24">
									<el-row>
									  <el-col :span="8"><el-tag >{{item2.id}}</el-tag></el-col>
									  <el-col :span="8"><el-tag type="success">{{item2.authName}}</el-tag></el-col>
									  <el-col :span="8"><el-tag type="warning">{{item2.path}}</el-tag></el-col>
									</el-row>
								</el-col>
							</el-row>
						</el-col>
					</el-row>
				</template>
			</el-table-column>
			<el-table-column type="index" label="#">
			</el-table-column>
			<el-table-column prop="id" label="id名称" width="">
			</el-table-column>
			<el-table-column prop="authName" label="权限名称" width="">
			</el-table-column>
			<el-table-column prop="path" label="路径" width="">
			</el-table-column>

		</el-table>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				rightsList: [],

			}
		},
		methods: {
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
			indexMethod(index) {
				return index + 1;
			},
			async rightsFun() {
				await this.$http.get('rights/tree').then(res => {
					console.log(res.data.data)
					this.rightsList = res.data.data
					if (res.data.meta.status == 200) {
						this.$message.success(`${res.data.meta.msg}`);
					} else {
						this.$message.error(`${res.data.meta.msg}`);
					}
				})
			},
		},
		watch: {

		},
		created() {
			this.rightsFun();
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
			border-bottom: 1px solid #ebeef5;
			align-items: center;
			line-height: 45px;
		}
		.el-row2{
			text-align: center;
		}
	}
</style>
