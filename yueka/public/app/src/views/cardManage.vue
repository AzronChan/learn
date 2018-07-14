<template>
	<div class="card_manage">
		<van-tabs style="position:static">
		  <van-tab v-for="item in tabs" :title="item.title" swipeable>
		  		<div class="card_list" v-if="item.data.length != 0">
			  		<ul>
			  			<li v-for="(val,index) in item.data" :class="[val.receiver != '' ? 'received_card' : '' , val.useStatus == 1 ? 'used_card_list' : '']" >
			  				<h3>{{val.title}}</h3>
			  				<p class="depict"><span>描述：</span>{{val.depict}}</p>
			  				<p><span class="left_title">有效期限：</span>{{val.startTime}} 至 {{val.endTime}}</p>
			  				<p v-if="val.giverID != userid">
			  					{{val.giver}} 赠送于 {{val.giveTime}}
			  				</p>
			  				<p v-else-if="val.receiver != ''">
			  					已赠送给 {{val.receiver}}
			  				</p>
			  				<div class="handle_btn" v-if="val.giverID == userid && val.receiver == ''">
			  					<span @click='deleteCard(index)'>删除</span><span @click='giveCardShow(index)'>赠送给好友</span>
			  				</div>
			  				<div class="handle_btn" v-else-if="item.title == '已使用卡片'">
			  					<span @click='deleteCard(index)'>删除</span>
			  				</div>
			  				<div class="handle_btn" v-else-if="val.receiver != ''">
			  				</div>
			  				<div class="handle_btn" v-else>
			  					<span @click='deleteCard(index)'>删除</span><span @click="cardUse(index)">使用</span>
			  				</div>
			  			</li>
			  		</ul>
			  		<div class="card_list_add">
		  				<van-icon name="add" class="add_card_icon" @click="routerLink('createcard')"/>
		  			</div>
		  		</div>
		  		<div class="add_card" v-else-if="item.title == '已使用卡片'">
		  			<p>你还没有使用过卡片</p>
		  		</div>
		  		<div class="add_card" v-else>
		  			<p>你还没有拥有一张卡片</p>
		  			<van-icon name="add" class="add_card_icon" @click="routerLink('createcard')"/>
		  		</div>
		  </van-tab>
		</van-tabs>
		<van-dialog
			  	v-model="giveCardDialogShow"
			  	show-cancel-button
			  	title="赠送"
			  	@confirm='giveCard()'
			  	:before-close='checkFriName'
			>
			<div class="van-hairline--top" style="height: 1px;margin: .3rem 0 .1rem"></div>
			<van-field
			  	v-model="receiver"
			    label="赠送给："
			    placeholder="请输入接收者用户名"
			   
			/>
		</van-dialog>
	</div>
</template>

<script>
	import {Dialog,Toast} from 'vant';
	
	export default {
		name: 'cardmanage',
		data() {
			return {
				userid : '123123',
				receiver : '',
				giveCardDialogShow : false,
				giveCardIndex : 0,
				tabs : [
					{
						title :'我的卡片',
						data : [
//							{
//								title : '抱抱卡',
//								depict : '这是一大段描述',
//								startTime : '2018-07-01',
//								endTime : '2018-07-11',
//								useStatus : 0,
//								cardStatus :0,
//								giver : 'czl',
//								giverID : '123123',
//								receiver : '',
//								giveTime : '2018-07-05'
//							},
//							{
//								title : '亲亲卡',
//								depict : '这是一大段描述',
//								startTime : '2018-07-01',
//								endTime : '2018-07-11',
//								useStatus : 0,
//								cardStatus :0,
//								giver : 'czl',
//								receiver : '',
//								giverID : '1231234',
//								giveTime : '2018-07-05'
//							}
						]
					},
					{
						title :'已使用卡片',
						data : []
					}
				]
			}
		},
		mounted (){
			let _t = this;
			this.$http({
				method : 'get',
				url  : '/getMyCard',
				params : {
					username : 'czl'
				}
			}).then(({data}) => {
				console.log(data)
				if (data.status == 1){
					console.log(data.data[0])
					_t.tabs[0].data = data.data;
				}
			})
		},
		methods: {
			routerLink(type){
				this.$router.push({ path: '/' + type });
			},
			cardUse(index) {
				let _t = this,
					data = this.tabs[0].data;
				Dialog.confirm({
				  message: '请与赠送者确认是否立即执行',
				  className : 'dialog_content'
				}).then(function(){
				  	// on confirm
				  	let toast = Toast.loading({
					  	mask: true,
					  	loadingType : 'spinner',
					  	message : '正在拼了命提交',
					  	duration : 0
					});
					
					setTimeout(function(){
						//TODO 使用请求
						toast.clear();
						Toast.success({
							message : '使用成功'
						})
						_t.resetCardList({
							type : 'myCard',
							index : index
						})
					},0)
					
				}).catch(() => {
					// on cancel
				});
			},
			deleteCard (index){
				let _t = this,
					data = this.tabs[0].data;
				Dialog.confirm({
				  message: '是否确认删除',
				  className : 'dialog_content'
				}).then(function(){
				  	// on confirm
				  	let toast = Toast.loading({
					  	mask: true,
					  	loadingType : 'spinner',
					  	message : '正在拼了命提交',
					  	duration : 0
					});
					
					setTimeout(function(){
						//TODO 删除请求
						toast.clear();
						Toast.success({
							message : '删除成功'
						})
						_t.resetCardList({
							type : 'deleteCard',
							index : index
						})
					},0)
					
				}).catch(() => {
					// on cancel
				});
			},
			
			giveCardShow(index){
				this.receiver = '';
				this.giveCardDialogShow = true;
				this.giveCardIndex = index;
			},
			/**
			 * 赠送卡片
			 */
			giveCard(){
				let _t = this,
					toast = Toast.loading({
				  	mask: true,
				  	loadingType : 'spinner',
				  	message : '正在拼了命提交',
				  	duration : 0
				});
				setTimeout(function(){
					//TODO 赠送请求
					toast.clear();
					Toast.success({
						message : '赠送成功'
					})
					_t.resetCardList({
						type : 'giveCard',
						index : _t.giveCardIndex
					})
				},300)
			},
			/**
			 * 重置卡片显示UI
			 * @param {obj}
			 * opt.type 操作类型
			 * opt.index 操作index
			 */
			resetCardList(obj){
				console.log(obj)
				let _t = this,
					data = this.tabs[0].data;
				if (obj.type == 'myCard'){
					let useData = this.tabs[1].data;
					data[obj.index].useStatus = 1;
					useData.push(data[obj.index]);
					data = data.splice(obj.index-1,1);
					_t.tabs[0].data = data;
					_t.tabs[1].data = useData;
				} else if (obj.type == 'giveCard') {
					data[obj.index].receiver = _t.receiver;
					data[obj.index].giveTime = new Date('yyyy-MM-dd');
				} else if (obj.type == 'deleteCard') {
					data = data.splice(obj.index-1,1);
					_t.tabs[0].data = data;
				}
			},
			checkFriName (action,done){
//				done(false);
				setTimeout(function(){
					done();
				},2000)
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.card_manage {
		position: relative;
		width: 100%;
		height: 100%;
	}
	.add_card {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		text-align: center;
		p {
			
			font-size: .28rem;
		    line-height: 1rem;
		}
	}
	.card_list {
		margin: 0 .2rem;
		li {
			padding:.2rem .3rem;
			margin: .5rem 0;
			border: 1px solid #ccc;
			border-radius:.2rem;
			box-shadow: 1px 1px 5px #ccc;
			background: #50525f;
			color: #fff;
			h3 {
				font-size: .36rem;
				line-height: .48rem;
			}
			p {
				font-size: .24rem;
				line-height: .48rem;
			}
			.handle_btn {
				font-size: 0;
				text-align: right;
				span {
					padding: .04rem .08rem;
					margin: 0 .1rem;
					font-size: .24rem;
					line-height: .48rem;
					background: #fff;
					border-radius: 2px;
					color: #333;
				}
			}
			&.received_card {
				background:#83c68a;
			}
			&.used_card_list {
				background:#c33f50;
			}
		}
		.card_list_add {
			text-align: center;
			
		}
		
	}
	.add_card_icon {
		color: #50525f;
	}
	
</style>