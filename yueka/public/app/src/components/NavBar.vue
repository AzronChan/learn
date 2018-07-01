<template>
	<div class="nav_bar">
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
    	onClickRight(){
    		
    	},
    	onClickLeft(){
    		
    	}
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.nav_bar {
	
}

</style>