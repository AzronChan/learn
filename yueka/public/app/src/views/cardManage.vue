<template>
	<div class="card_manage">
		<van-tabs @click="tabClick">
		  <van-tab v-for="item in tabs" :title="item.title" swipeable  >
		  		<div class="card_list" v-if="item.data.length != 0">
			  		<ul>
			  			<li v-for="(val,index) in item.data" :class="[val.receiver != '' ? 'received_card' : '' , val.useStatus == 1 ? 'used_card_list' : '']" >
			  				<h3>{{val.cardname}}</h3>
			  				<p class="depict"><span>描述：</span>{{val.depict}}</p>
			  				<p><span class="left_title">有效期限：</span>{{val.startTime}} 至 {{val.endTime}}</p>
			  				<p v-if="val.giverID != userID">
			  					{{val.giver}} 赠送于 {{val.giveTime}}
			  				</p>
			  				<div class="handle_btn" v-if="val.giverID == userID && val.receiver == ''">
			  					<span @click='deleteCard(index)'>删除</span><span @click='giveCardShow(index)'>赠送给好友</span>
			  				</div>
			  				<div class="handle_btn" v-else-if="item.title == '已使用卡片'">
			  					<span @click='deleteCard(index)'>删除</span>
			  				</div>
			  				<div class="handle_btn" v-else-if="val.receiver != ''">
			  					<span @click='deleteCard(index)'>删除</span><span @click="cardUse(index)">使用</span>
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
	import { mapState } from 'vuex'
	
	export default {
		name: 'cardmanage',
		data() {
			return {
				receiver : '',
				giveCardDialogShow : false,
				giveCardIndex : 0,
				tabShowing : '',
				tabs : [
					{
						title :'我的卡片',
						data : []
					},
					{
						title :'已使用卡片',
						data : []
					}
				]
			}
		},
		computed :mapState({
			userID : state => state.userInfo.userid
		}),
		mounted (){
			let _t = this;
			
			_t.username = (function(){
				return _t.$store.state.userInfo.username;
			})()
			_t.getCard();
			
		},
		methods: {
			tabClick (index,title){
				this.tabShowing = title;
			},
			getCard (){
				console.log('=======>获取卡片信息')
				let _t = this;
				this.$http({
					method : 'get',
					url  : '/api/v1/getMyCard',
					params : {
						t : Math.random(),
						username : _t.username
					}
				}).then(({data}) => {
					if (data.status == 1){
						let _arr = data.data;
						_t.tabs[1].data = [];
						_t.tabs[0].data = [];
						for (let i = 0; i < _arr.length; i++){
							if (_arr[i].useStatus == 1){
								_t.tabs[1].data.push(_arr[i])
							} else {
								console.log(111111)
								
								_t.tabs[0].data.push(_arr[i])
							}
						}
						
					}
				}).catch(() => {
					Toast('网络异常，请重试')
				})
			},
			routerLink(type){
				this.$router.push({ path: '/' + type });
			},
			cardHandle (obj,cb){
				console.log(obj)
				let toast = Toast.loading({
				  	mask: true,
				  	loadingType : 'spinner',
				  	message : '正在提交...',
				  	duration : 0
				});
				
				let _t = this,
					data = obj.data,
					successMsg = '',
					timeout = 5000,
					params = {
						type : obj.type,
						cardid : data.id,
						username : data.giver
					};
				switch (obj.type){
					case 'delete':
						if (data.receiver != ''){
							//接受者删除
							params.username = data.receiver;
						}
						successMsg = '删除成功';
						break;
					case 'give' :
						console.log(_t.receiver)
						successMsg = '赠送成功';
						params.receiver = _t.receiver;
						break;
					case 'use' :
						successMsg = '使用成功';
						//只有接受者才可以使用
						params.username = data.receiver;
						break;
				}
				
				
				_t.$http({
					method : 'get',
					url : '/api/v1/handle',
					params : params
				}).then(({data})=>{
					toast.clear();
					if (data && data.status == 1){
						Toast.success({
	    					message : successMsg,
	    					duration: 600,
	    				})
						setTimeout(()=>{
							_t.getCard();
						},1000)
						cb && cb();
					} else {
						//操作失败
						Toast.fail({
	    					message : data.errormsg || '网络异常，请重试',
	    					duration: 600,
	    				})
						cb && cb();
					}
				}).catch(()=>{
					Toast('网络异常，请重试')
				})
			},
			/**
			 * 使用卡片
			 * @param {index} 卡片位置
			 */
			cardUse(index) {
				let _t = this,
					data = this.tabs[0].data[index];
				Dialog.confirm({
				  message: '请与赠送者确认是否立即执行',
				  className : 'dialog_content'
				}).then(function(){
				  	// on confirm
				  
					_t.cardHandle({
						type : 'use',
						data : data
					})
				}).catch(()=>{
					
				})
			},
			deleteCard (index){
				let _t = this,
					data = _t.tabShowing == '已使用卡片' ?  _t.tabs[1].data[this.giveCardIndex] : _t.tabs[0].data[this.giveCardIndex];
				
				Dialog.confirm({
				  message: '是否确认删除',
				  className : 'dialog_content'
				}).then(function(){
					setTimeout(function(){
						_t.cardHandle({
							type : 'delete',
							data : data
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
			giveCard(callback){
				let _t = this;
				
				_t.cardHandle({
					type : 'give',
					data : _t.tabs[0].data[this.giveCardIndex]
				},() => {
					callback && callback(); 
				})
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
				let _t = this;
				
				if (action === 'confirm'){
					_t.giveCard(() => {
						done();
					});
				}
				
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
		overflow: auto;
	}
	.add_card {
		position: fixed;
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