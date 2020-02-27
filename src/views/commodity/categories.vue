<template>
	<el-card class="box-card">
		<el-button type="primary">添加分类</el-button>
		<el-table :data="UsersData.result" :row-class-name="tableRowClassName" style="width: 100%">
			<el-table-column type="index" :index="indexMethod">
			</el-table-column>
			<el-table-column prop="cat_name" label="分类名称">
			</el-table-column>
			<el-table-column prop="cat_pid" label="是否有效">
			</el-table-column>
			<el-table-column prop="cat_level" label="排序">
				<el-tag>一级</el-tag>
			</el-table-column>
			<el-table-column label="操作" width="180">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
					<el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
		<el-pagination :hide-on-single-page="true" @size-change="handleSizeChange" @current-change="handleCurrentChange"
		 :current-page="UsersData.pagenum" :page-sizes="[1, 3, 5, 7, 10]" :page-size="queryCategories.pagesize" layout="total, sizes, prev, pager, next, jumper"
		 :total="UsersData.total">
		</el-pagination>
	</el-card>
</template>

<script>
	export default {
		data() {
			return {
				queryCategories: {
					type: "",
					pagenum: 1,
					pagesize: 5
				},
				UsersData: "",
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
				} else if (rowIndex % 2 == 1) {
					return 'success-row';
				}
				return '';
			},
			// 获取商品分类列表
			async getCategories() {
				const {
					data: res
				} = await this.$http.get('categories', {
					params: this.queryCategories,
				});
				this.UsersData = res.data;
				console.log(this.UsersData)
			},
			handleSizeChange(val) {
				this.queryCategories.pagesize = val;
				this.getCategories();
			},
			handleCurrentChange(val) {
				this.queryCategories.pagenum = val;
				this.getCategories();
			},
		},
		created() {
			this.getCategories();
		}

	}
</script>

<style>
</style>
