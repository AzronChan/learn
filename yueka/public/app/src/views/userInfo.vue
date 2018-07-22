<template>
	<div class="user_info">
		<div class="user_pic">
			<img :src="userPic">
			<van-uploader class='user_pic_uploader' :after-read="onRead">
			  <van-icon name="photograph" />
			</van-uploader>
			
		</div>
		<div class="block_title">
			个人资料
		</div>
		<van-cell-group>
			<van-cell :title="username" icon="contact"/>
			<!--<van-cell :title="location" icon="location"/>
			<van-cell :title="sign" icon="sign"/>-->
		</van-cell-group>
		<div class="block_title">
		</div>
		
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import {Dialog,Toast} from 'vant';
	
	
	export default {
		name: 'userinfo',
		data() {
			return {
				userPic : '/app/src/assets/images/user-pic.jpg'
			}
		},
		computed: mapState({
			// 箭头函数可使代码更简练
			username: state => state.userInfo.username,
			sex: state => state.userInfo.sex
		}),
		methods : {
			onRead(file) {
				this.userPic = file.content
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
		position: relative;
		width: 2.4rem;
		height: 2.4rem;
		padding: .2rem;
		margin: 0 auto;
		background: #ccc;
		border-radius: 50%;
		overflow: hidden;
		.user_pic_uploader {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%,-50%);
			color: #ccc;
			font-size: .7rem;
			height: .7rem;
		}
		img {
			display: block;
			height: 2.4rem;
			width: 2.4rem;
			margin: 0rem auto;
			border-radius: 50%;
		}
	}
</style>