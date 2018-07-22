<template>
	<div id="app">
		<nav-bar/>
		<div :class="['main',navBarShow ? 'main_pt46' : '']">
			<router-view></router-view>
		</div>
		<tab-bar/>
	</div>
</template>

<script>
	import NavBar from './components/NavBar.vue';

	import TabBar from './components/TabBar.vue';
	
	import { mapState } from 'vuex'

	(function() {
		var html = document.querySelector("html"),
			rem = html.offsetWidth / 7.5;
		html.style.fontSize = rem + "px";
	})();

	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		};
		if(/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for(var k in o)
			if(new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	}

	export default {
		name: 'yueka',
		data (){
			return {
				
			}
		}
		,
		components: {
			NavBar,
			TabBar
		},
		computed: mapState({
			// 箭头函数可使代码更简练
			navBarShow: state => state.navBarShow
		}),
		created (){
			let cookie = this.$tool.Cookie.read('yueka');
			if (cookie){
				this.$store.commit('userInfo',{
					userid :  this.$tool.Cookie.read('yueka','userid'),
					username : this.$tool.Cookie.read('yueka','username')
				})
				this.$router.push('/cardmanage');
			} else {
				this.$router.push('/login')
			}
		},
		mounted(){
			
		},
		watch : {
			'$route' (to,from){
				if (!to.name){
					return;
				}
				console.log(to.name)
				if (to.name == 'userinfo'){
					console.log(111)
					this.$store.commit('rightText','注销');
				} else {
					this.$store.commit('rightText','');
				}
				if (to.name.match(/login|signup/g)){
					this.$store.commit('tabBarShow',false);
				} else {
					this.$store.commit('tabBarShow',true);
				}
				if (to.name.match(/cardmanage|options|login/g)){
					this.$store.commit('navBarShow',false);
				} else {
					this.$store.commit('navBarShow',true);
				}
			}
		},
	}
</script>

<style lang="scss">
	@import url("assets/css/base.scss");
	
	/* 全局 webkit滚动条
	--------------------------------------------*/
	/*::-webkit-scrollbar{width:8px;height: 8px;background: transparent;}
	::-webkit-scrollbar-thumb{border-radius: 16px;background-color: #d6d7d9;}
	::-webkit-scrollbar-thumb:hover{background-color: #c0c3c5;}
	::-webkit-scrollbar-thumb:active{background-color: #acafb2;}
	::-webkit-scrollbar-button{background: transparent;height: 2px;}*/
	
	body,
	html {
		width: 100%;
		height: 100%;
	}
	
	#app {
		font-family: Arial, Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		color: #2c3e50;
		width: 100%;
		height: 100%;
	}
	
	.main {
		height: calc(100% - 1.2rem);
		padding: 0px 0 1.2rem;
		background: #f8f8f8;
		&.main_pt46 {
			height: calc(100% - 46px - 1.2rem);
			padding-top: 46px;
		}
	}
	
	.dialog_content {
		font-family: Arial, Helvetica, "STHeiti STXihei", "Microsoft YaHei", Tohoma, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		font-size: .32rem;
	}
	
	.block_title {
		margin: 0;
		font-weight: 400;
		font-size: 14px;
		color: rgba(69, 90, 100, .6);
		padding: 40px 15px 15px;
	}
	
	.block_mt15 {
		margin: .15rem 0 0;
	}
	
	.block_pt15 {
		padding: .15rem 0 0;
		height: calc(100% - .15rem);
	}
</style>