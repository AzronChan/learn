<template>
	<div class="login">
		<div class="login_box">
			<h3 class="login_title">登 录</h3>
			<input type="text" placeholder="请输入用户名" value="" />
			<input type="text" placeholder="请输入密码" value="" />
			<van-button type="primary" class='login_btn' size="large" block @click='loginFn()'  :loading="loginBtnShowLoad"> 登 录 </van-button>
			<p class="sign_up_link">还没有账号？<router-link to='/signup'>立即注册</router-link></p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'login',
	data () {
	    return {
	      	loginBtnShowLoad : false
	    }
	},
	methods: {
    	loginFn () {
    		let _t = this;
    		_t.loginBtnShowLoad = true;
//  		this.$http({
//  			method:'get',
//  			url : ''
//  		})
    	}
  	},
  	mounted (){
  		
  	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.login {
	position: relative;
	height: 100%;
	background: #f8f8f8;
}

.login_box { 
	width: calc(100% - 30px);
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
}
.login_title {
	margin: 0 0 .6rem ;
	text-align: center;
	font-size: .8rem;
}

.login_box input {
	display:block;
	width: calc(100% - .4rem);
	height: .76rem;
	margin: 0 0 .36rem;
	padding: .12rem .2rem;
	font-size: .36rem;
	line-height: .24rem;
	border: none;
}
.login_btn {
	margin: 0 auto;
}

.sign_up_link {
	text-align: center;
	font-size: .28rem;
    line-height: 1rem;
    a {
    	color: #2BA2FA
    }
}

</style>