<template>
	<div :class="['nav_bar', navBarShow ? '' : 'nav_bar_none']">
		<van-nav-bar
		  title=""
		  left-text="返回"
		  left-arrow
		  fixed
		  @click-left="onClickLeft"
		  :right-text='rightText'
		  @click-right="onClickright"
		/>
	</div>
</template>

<script>
	
	import { mapState } from 'vuex'
	
	import {Dialog,Toast} from 'vant';
	
	export default {
		data () {
		    return {
		      	name : ''
		    }
		},
		computed: mapState({
			navBarShow : state => state.navBarShow,
			// 箭头函数可使代码更简练
			rightText: state => state.rightText
//			rightText : state => state.userInfo.username
		}),
		methods: {
	    	onClickLeft(){
	    		this.$router.go(-1);
	    	},
	    	onClickright(){
	    		
	    		let _t = this,
	    			el = window.event.srcElement,
	    			elH = el.innerHTML;
	    		if (elH == '注销'){
	    			Dialog.confirm({
					  message: '确认要注销吗',
					  className : 'dialog_content'
					}).then(function(){
					  	// on confirm
						_t.$router.push('/login');
						_t.$tool.Cookie.remove('yueka');
					})
	    		}
	    	}
	  	}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav_bar {
	&.nav_bar_none {
		display: none;
	}
}

</style>