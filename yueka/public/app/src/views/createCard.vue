<template>
	<div class="create_card">
		<div class="create_card_box">
			<h3 class="title">创建卡片</h3>
			<van-cell-group>

				<van-field v-model="cardName" required clearable label="卡片名"  placeholder="请输入卡片名字" :error-message="errorMessage.cardName" @input="inpChange({type:'cardName'})"/>

				<van-field v-model="depict"  required label="描述" placeholder="描述你的卡片、用于提供什么服务，嘿嘿" :error-message="errorMessage.depict" @input="inpChange({type:'depict'})"/>

				<van-field v-model="cardStartTime"  required label="起始时间" placeholder="选择有效期起始时间" @click='showPick($event,"start")' :error-message="errorMessage.cardStartTime" />

				<van-field v-model="cardEndTime" required label="结束时间" placeholder="选择有效期结束时间" @click='showPick($event,"end")' :error-message="errorMessage.cardEndTime"/>

			</van-cell-group>
			<van-button type="primary" class='submit_btn' size="large" block @click='submit()' :loading='submitBtnShowLoad'> 创 建 </van-button>

		</div>
		<van-actionsheet v-model="show">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" class='vant_datetime_picker' @confirm='pickConfirm' @change='getColumnValue' @cancel='showPick()'/>
		</van-actionsheet>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	import {Dialog,Toast} from 'vant';
	
	export default {
		name: 'login',
		data() {
			return {
				submitBtnShowLoad: false,
				overlay: true,
				show: false, //下拉菜单显示
				cardName: '', //卡片名称
				depict: '', //描述
				cardStartTime: '', //卡片开始时间
				cardEndTime: '', //卡片结束时间
				cardEndTimeFormat : '',	//卡片开始时间 2018-07-19 格式
				cardStartTimeFormat : '',	//卡片开始时间 2018-07-19 格式
				selectPickerType: '', //选择类型
				datetime: '', //
				minDate: new Date(),
				currentDate: new Date(),
				errorMessage : {
					cardName : '',
					depict : '',
					cardStartTime : '',
					cardEndTime:''
				}
			}
		},
		computed :mapState({
			userID : state => state.userInfo.userid,
			username : state => state.userInfo.username,
			token : state => state.userInfo.token
		}),
		methods: {
			showPick(e, type) {
				try{
					e.srcElement.blur();
				}catch(e){
					e.target.blur();
				}
				this.selectPickerType = type;
				this.show = !this.show;
			},
			/**
			 * 去掉空格
			 */
			replaceSpace (str){
				if (!str) return '';
				return str.replace(/\s/g,'');
			},
			returnZero (num){
				return num < 10 ? '0' + num : num;
			},
			inpChange(obj){
				if (!obj.type){
					return;
				}
				if (obj.type == 'cardName'){
					this.errorMessage.cardName = '';
				} else if (obj.type == 'depict'){
					this.errorMessage.depict = '';
				}
			},
			/**
			 * 时间选择确认
			 * 返回val为当前value
			 */
			pickConfirm(val) {
				let _t = this,
					timeArr = new Date(val).format('yyyy-MM-dd').split('-');
				if(this.selectPickerType == 'end') {
					this.cardEndTime = timeArr[0] + '年' + timeArr[1] + '月' + timeArr[2] + '日';
					this.cardEndTimeFormat = new Date(val).format('yyyy-MM-dd');
				} else {
					this.cardStartTime = timeArr[0] + '年' + timeArr[1]+ '月' + timeArr[2] + '日';
					this.cardStartTimeFormat = new Date(val).format('yyyy-MM-dd');
				}
				this.show = !this.show;
			},
			/**
			 * 时间选择改变执行
			 * 返回e为当前时间示例
			 */
			getColumnValue(e) {
				let valArr = e.getValues(); //返回数组 ['2018','06','30']
				console.log(valArr)
			},
			onClick(item) {
				Toast(item.name);
			},
			/**
			 * 创建卡片
			 */
			submit(){
				let _t = this;
				_t.submitBtnShowLoad = true;
				_t.cardName = _t.replaceSpace(_t.cardName);
				_t.depict = _t.replaceSpace(_t.depict);
				
				if (_t.cardName == ''){
					_t.errorMessage.cardName = '卡片名字不可为空';
					_t.submitBtnShowLoad = false
					return;
				}
				if (_t.depict == ''){
					_t.errorMessage.depict = '卡片描述不可为空';
					_t.submitBtnShowLoad = false
					return;
				}
				if (_t.cardStartTimeFormat == ''){
					_t.errorMessage.cardStartTime = '起始时间不可为空';
					_t.submitBtnShowLoad = false
					return ;
				}
				if (_t.cardEndTimeFormat == ''){
					_t.errorMessage.cardEndTime = '结束时间不可为空';
					_t.submitBtnShowLoad = false
					return;
				}
				if (new Date(_t.cardStartTimeFormat).getTime() < new Date(_t.cardStartTimeFormat).getTime()){
					_t.errorMessage.cardEndTime = '结束时间不能比起始时间前';
					_t.submitBtnShowLoad = false
					return;
				}
				
				this.cardName.indexOf('卡') < 0 && (this.cardName += '卡');
				
				this.$http({
					method : 'get',
					url : '/api/v1/creatMyCard',
					params : {
						username : this.username,
						userid : this.userID,
						startTime : this.cardStartTimeFormat,
						endTime : this.cardEndTimeFormat,
						cardname : this.cardName,
						depict : this.depict,
						token : this.token
					}
				}).then(({data})=>{
					console.log(data);
					if (data && data.status == 1){
						Toast.success({
	    					message : '创建成功',
	    					duration: 300,
	    				})
						
						setTimeout(function(){
    						_t.$router.push('/cardmanage');
    					},300)
					} else {
						Toast.fail({
	    					message : data.errorMsg,
	    					duration: 300,
	    				})
					}
				})
				
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
	.create_card {
		position: relative;
		height: 100%;
		background: #f8f8f8;
		
	}
	
	.create_card_box {
		width: calc(100% - 30px);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.title {
		margin: 0 0 .6rem;
		text-align: center;
		font-size: .8rem;
	}
	
	.submit_btn {
		margin: .36rem auto 0;
	}
	
	.vant_datetime_picker {
		font-size: 16px;
	}
</style>