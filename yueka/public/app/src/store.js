import Vue from 'vue'
import Vuex from 'vuex'
//import axios from 'axios'	//请求

//Vuex.Store.prototype.$http = axios

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
		}
	},
	actions: {
		
	}
})