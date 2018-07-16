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
		name: 'app',
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
		watch : {
			'$route' (to,from){
				console.log(to.name)
				if (to.name.match(/cardmanage|options/g)){
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
		height: calc(100% - 1.4rem);
		padding: 0px 0 1.4rem;
		background: #f8f8f8;
		&.main_pt46 {
			height: calc(100% - 46px - 1.4rem);
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