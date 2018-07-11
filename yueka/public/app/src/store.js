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
		}
	},
	mutations: {
		navBarShow(state,payload){
			state.navBarShow = payload
		}
	},
	actions: {

	}
})