<template>
	<div class="main">
		<el-button @click="tuichu">注销</el-button>
	</div>
</template>

<script>
	import {
		removeToken,
	} from '@/utils/auth'
	export default {
		data() {
			return {

			}
		},
		methods: {
			tuichu() {
				removeToken();
				this.$router.push("/login")
			}
		},
		created() {

		}
	}
</script>

<style>
</style>
