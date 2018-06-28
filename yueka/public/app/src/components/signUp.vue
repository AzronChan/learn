<template>
	<div class="login">
		<van-cell-group>
  		<van-field v-model="value" placeholder="请输入用户名" />
  		<van-field v-model="username" label="用户名" required icon="question" placeholder="请输入用户名" @click-icon="$toast('question')"/>
		</van-cell-group>
		
	</div>
</template>

<script>
export default {
	name: 'login',
	data () {
    return {
			value : '',
			username :'',
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
	height: 100%;
	padding: 0 15px;
	background: #f8f8f8;
}
</style>