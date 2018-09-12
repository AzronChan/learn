<template>
	<div class="user_info">
		<div class="user_pic">
			<img :src="userpic" v-if="userpic != ''" alt="">
			<img src="../assets/images/user-pic.jpg" v-if="userpic == false">
			<van-uploader class='user_pic_uploader' :after-read="afterRead">
			  <van-icon name="photograph" />
			</van-uploader>
			
		</div>
		<div class="block_title">
		</div>
		<van-cell-group>
			<van-cell :title="username" icon="contact"/>
			<!--<van-cell :title="location" icon="location"/>
			<van-cell :title="sign" icon="sign"/>-->
		</van-cell-group>
		<div class="block_title">
		</div>
		<div class="cropper_area" v-show='cropperShow'>
			<div class="pos">
				<div class="user_crpper_area" id='vueCropperArea'></div>
				<a href="javascript:;" class="cropper_area_cancel" @click="croperHandle('cancel')">取 消</a>
				<a href="javascript:;" class="cropper_area_confirm"  @click="croperHandle('confirm')">确 定</a>
				
			</div>
		</div>
		
		
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import {Dialog,Toast} from 'vant';
	import cropper from 'cropper';
	import jquery from 'jquery';
	
	export default {
		name: 'userinfo',
		data() {
			return {
				cropperShow : false,
				cropper : null
			}
		},
		components : {

		},
		computed: mapState({
			// 箭头函数可使代码更简练
			username: state => state.userInfo.username,
			sex: state => state.userInfo.sex,
			userpic : state => state.userInfo.userpic,
			userid : state => state.userInfo.userid
		}),
		mounted (){
//			console.log(this.userpic)
		},
		methods : {
			/*
			 * 读取图片
			 */
			afterRead (file){
				this.cropperShow = !this.cropperShow;
				
				let uploadImg = this.uploadImg;
				
				var img = new Image;
				img.src = file.content;
				img.id= 'image';
				img.onload = () => {
					this.cropper = jquery('#image');
					this.cropper.cropper({
					  aspectRatio: 1 / 1,
					  crop: function(event) {
					  	
					  }
					});
				}
				
				document.getElementById('vueCropperArea').appendChild(img)
				
			},
			/*
			 * 上传图片
			 */
			uploadImg(obj) {
				let _t = this;
				this.userPic = obj.content;
				this.$http({
					method : 'post',
					url :'/api/v1/upload',
					data : {
						imgdata : obj.content,
						userid : _t.userid
					}
				}).then(({data}) => {
					if (data.status == 1 && data.data.userpic){
//						_t.userpic = data.data.userpic.replace('localhost','192.168.31.129') + '?t=2232321666';
						
						this.$store.commit('userInfo',{
							userpic : data.data.userpic
						})
						
					} else {
						console.log('上传失败')
						Toast.fail({
	    					message : '上传失败，请重试',
	    					duration: 600,
	    				})
					}
				})
		  },
		  /*
		   * 截图操作
		   */
		  croperHandle (type) {
		  	this.cropperShow = !this.cropperShow;
		  	if (type === 'confirm'){
		  		let canvas = this.cropper.cropper('getCroppedCanvas'),
        			base64url = canvas.toDataURL('image/jpeg',.7);
//      		console.log(base64url)
        		this.uploadImg({
        			content : base64url
        		})
		  	}
		  	
		  	this.cropper.cropper('cropper');
		  	document.getElementById('vueCropperArea').innerHTML = '';
		  	
		  }
		}
	}
</script>

<style lang="scss">
	@import url("../assets/css/cropper.scss");
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
	.cropper_area {
		position: fixed;
		top: 0px;
		left: 0px;
		z-index: 3;
		width: 100%;
		height: 100%;
		background: #000;
		.pos {
			position: relative;
			width: 100%;
			height: 100%;
			a {
				position: absolute;
				bottom: .7rem;
				color: #fff;
				line-height: 100%;
				font-size: .55rem;
				&.cropper_area_cancel {
					left: .8rem;
					font-size: .4rem;
					
				}
				&.cropper_area_confirm {
					right: .8rem;
				}
			}
		}
	}
	.user_crpper_area {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		width: 100%;
		max-height: 50%;
		img {
			max-width: 100%;
			display: block;
		}
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