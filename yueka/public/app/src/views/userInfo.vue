<template>
	<div class="user_info">
		<div class="user_pic">
			<img :src="userpic">
			<van-uploader class='user_pic_uploader' :after-read="afterRead">
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
<!--		
		<a href="javascirpt:;" @click="startCrop()">
			开始截图
		</a>-->
		<div class="vue_cropper_area" v-show='cropperShow'>
			<div class="vue_cropper">
				<vueCropper
					class='cropper'
				  	ref="cropper"
				  	:img="cropperOption.img"
				  	:outputSize="cropperOption.outputSize"
				  	:outputType="cropperOption.outputType"
				  	:canMove='cropperOption.canMove'
				  	:autoCrop='cropperOption.autoCrop'
				  	:fixedNumber='cropperOption.fixedNumber'
				  	:fixed='cropperOption.fixed'
				  	:canScale='cropperOption.canScale'
				></vueCropper>
			</div>
			<a href="javascript:;" @click="cropperCancel()">取消</a>
		</div>
		
		
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import {Dialog,Toast} from 'vant';
	import VueCropper from 'vue-cropper'
	
	
	export default {
		name: 'userinfo',
		data() {
			return {
				cropperOption : {
					img : '/app/src/assets/images/user-pic.jpg',
					outputSize : 1,
					outputType : 'jpeg',
					canMove : false,
					autoCrop : true,
					full : true,
					fixed :true,
					fixedNumber : [1,1],
					canScale:true,
				},
				cropperShow : false,
				userpic : '/app/src/assets/images/user-pic.jpg'
			}
		},
		components : {
			VueCropper
		},
		computed: mapState({
			// 箭头函数可使代码更简练
			username: state => state.userInfo.username,
			sex: state => state.userInfo.sex
		}),
		created (){
			let _t = this;
			_t.userpic = (function(){
				console.log(_t.$store.state.userInfo.userpic)
				return _t.$store.state.userInfo.userpic ? _t.$store.state.userInfo.userpic : '/app/src/assets/images/user-pic.jpg'
			})()
		},
		mounted (){
			let _t = this;
			_t.userid = (function(){
				return _t.$store.state.userInfo.userid;
			})()
		},
		methods : {
			cropperCancel (){
				this.cropperShow = !this.cropperShow;
			},
			startCrop(){
				this.$refs.cropper.startCrop()
				this.$refs.cropper.getCropData((data) => {
				  this.onRead({
				  	content:data
				  })
				})
			},
			afterRead (file){
				this.cropperShow = !this.cropperShow;
				this.cropperOption.img = file.content
			},
			onRead(file) {
				let _t = this;
				this.userPic = file.content;
				this.$http({
					method : 'post',
					url :'/api/v1/upload',
					data : {
						imgdata : file.content,
						userid : _t.userid
					}
				}).then(({data}) => {
					if (data.status == 1 && data.data.userpic){
						
						_t.userpic = data.data.userpic;
						console.log(_t.userpic)
					} else {
						console.log('上传失败')
					}
				})
		   	}
		}
	}
</script>

<style lang="scss">
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
	.vue_cropper_area {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 3;
		width: 100%;
		height: 100%;
	}
	.vue_cropper {
		position: relative;
		height: 70%;
		width: 100%;
	}
	.cropper {
		top: 0;
		left: 0px;
		width: 100%;
		background: #fff !important;
		.cropper-modal {
			background: none;
		}
	}
</style>