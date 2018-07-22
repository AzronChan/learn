import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		navBarShow : false,
		userInfo : {
			userid : 0,
			username : '',
			location : '',
			sign : ''
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
		userInfo (state,payload) {
			state.userInfo = payload
		}
	},
	actions: {
		
	}
})