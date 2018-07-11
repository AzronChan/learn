<template>
	<div class="user_info">
		<div class="user_pic">
			<img src="../assets/images/user-pic.jpg">
		</div>
		<div class="block_title">
			个人资料
		</div>
		
		<van-cell-group>
			<van-cell :title="username" icon="contact"/>
			<van-cell :title="location" icon="location"/>
			<van-cell :title="sign" icon="sign"/>
		</van-cell-group>
	</div>
</template>

<script>
	export default {
		name: 'userinfo',
		data() {
			return {
				username : 'czl',
				location : '广东 广州',
				sign : '签名'
			}
		}
	}
</script>

<style scoped lang="scss">
	.user_info {
		position: relative;
		width: 100%;
		height: 100%;
		padding: .6rem 0 0;
	}
	.user_pic {
		width: 2.4rem;
		height: 2.4rem;
		padding: .2rem;
		margin: 0 auto;
		background: #ccc;
		border-radius: 50%;
		img {
			display: block;
			height: 2.4rem;
			width: 2.4rem;
			margin: 0rem auto;
			border-radius: 50%;
		}
	}
</style>