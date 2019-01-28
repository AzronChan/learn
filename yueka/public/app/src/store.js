import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'	//请求
import {Dialog,Toast} from 'vant';

Vuex.Store.prototype.$http = axios

Vue.use(Vuex)



export default new Vuex.Store({
	state: {
		navBarShow : false,
		userInfo : {
			userid : 0,
			username : '',
			location : '',
			sign : '',
			userpic : '',
			token : ''
		},
		cardList : [
			{
				title :'我的卡片',
				data : []
			},
			{
				title :'已使用卡片',
				data : []
			}
		],
		tabBarShow:true,
		rightText : ''
	},
	mutations: {
		rightText (state,payload){
			state.rightText = payload
		},
		navBarShow (state,payload){
			state.navBarShow = payload
		},
		tabBarShow (state,payload){
			console.log(payload)
			state.tabBarShow = payload
		},
		/*
		 * 修改用户信息
		 */
		userInfo (state,payload) {
			let _obj = Object.assign(state.userInfo,payload)
			state.userInfo = _obj
		},
		/*
		 * 修改卡片信息
		 */
		changeCardList(state,payload) {
			state.cardList[0].data = payload.myCardList;
			state.cardList[1].data = payload.usedCardList;
		}
	},
	actions: {
		/**
		 * 获取用户卡片 
		 */
		getCard(state,payload) {
			let userInfo = state.state.userInfo;
			this.$http({
				method : 'get',
				url  : '/api/v1/getMyCard',
				params : {
					t : Math.random(),
					username : userInfo.username,
					token : userInfo.token
				}
			}).then(({data}) => {
				if (data.status == 1){
					let _arr = data.data,
						_arr1 = [],
						_arr2 = [];
					
					for (let i = 0; i < _arr.length; i++){
						if (_arr[i].useStatus == 1){
							//已使用
							_arr1.push(_arr[i])
						} else {
							_arr2.push(_arr[i])
						}
					}
					state.commit('changeCardList',{
						myCardList : _arr2,
						usedCardList : _arr1
					})
				} else {
					Toast.fail({
    					message : data.errormsg || '网络异常，请重试',
    					duration: 600,
    				})
				}
			}).catch((err) => {
				
				console.log(err)
				console.log(111)
				Toast('获取卡片状态失败，请重试')
			})
		}
	}
})