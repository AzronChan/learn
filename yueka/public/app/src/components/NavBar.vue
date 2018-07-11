<template>
	<div :class="['nav_bar', navBarShow ? '' : 'nav_bar_none']">
		<van-nav-bar
		  title=""
		  left-text="返回"
		  left-arrow
		  fixed
		  @click-left="onClickLeft"
		/>
	</div>
</template>

<script>
export default {
	data () {
	    return {
	      	name : ''
	    }
	},
	methods: {
    	onClickLeft(){
    		this.$router.go(-1);
    	}
  	},
  	computed : {
  		navBarShow (){
  			return this.$store.state.navBarShow
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