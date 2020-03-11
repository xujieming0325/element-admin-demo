<template>
	<div>
		<!-- 卡片视图区域 -->
		<el-card>
		</el-card>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				body: "asd",
				https: "http://rap2.taobao.org:38080/app/mock/246208/login_cs"
			}
		},

		methods: {
			async getCs() {
				const {
					data: res
				} = await this.$http.get("http://rap2.taobao.org:38080/app/mock/246208/login_cs");
				console.log(res)
			}
		},
		created() {
		
		}



	}
</script>

<style>
</style>
