<template>
	<div class="create_card">
		<div class="create_card_box">
			<h3 class="title">创建卡片</h3>
			<van-cell-group>

				<van-field v-model="cardName" required clearable label="卡片名" icon="question" placeholder="请输入卡片名字" @click-icon="$toast('question')" />

				<van-field v-model="depict" type="password" label="描述" placeholder="描述你的卡片、用于提供什么服务，嘿嘿" @click='passwordClick($event)' />

				<van-field v-model="cardStartTime" label="起始时间" placeholder="选择有效期起始时间" @click='showPick($event,"start")' />

				<van-field v-model="cardEndTime" label="结束时间" placeholder="选择有效期结束时间" @click='showPick($event,"end")' />

			</van-cell-group>
			<van-button type="primary" class='submit_btn' size="large" block @click='submit()' :loading='submitBtnShowLoad'> 创 建 </van-button>

		</div>
		<van-actionsheet v-model="show">
			<van-datetime-picker v-model="currentDate" type="date" :min-date="minDate" class='vant_datetime_picker' @confirm='pickConfirm' @change='getColumnValue' />
		</van-actionsheet>
	</div>
</template>

<script>
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
				pickSelectTime: [], //时间选择器选择时间
				selectPickerType: '', //选择类型
				datetime: '', //
				minDate: new Date(),
				currentDate: new Date()

			}
		},

		methods: {
			showPick(e, type) {
				this.selectPickerType = type;
				this.show = !this.show;
			},
			pickConfirm() {
				let valArr = this.pickSelectTime;
				if(this.selectPickerType == 'end') {
					this.cardEndTime = valArr[0] + '年' + valArr[1] + '月' + valArr[2] + '日';
				} else {
					this.cardStartTime = valArr[0] + '年' + valArr[1] + '月' + valArr[2] + '日';
				}
				this.show = !this.show;
			},
			getColumnValue(e) {
				let valArr = e.getValues(); //返回数组 ['2018','06','30']
				console.log(valArr)
				this.pickSelectTime = valArr;
			},
			onClick(item) {
				Toast(item.name);
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