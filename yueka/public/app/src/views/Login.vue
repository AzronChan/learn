<template>
	<div class="login">
		<div class="login_box">
			<h3 class="login_title">登 录</h3>
			<input type="text" placeholder="请输入用户名" value="" v-model="username"/>
			<input type="password" placeholder="请输入密码" value="" v-model="password"/>
			<van-button type="primary" class='login_btn' size="large" block @click='loginFn()'  :loading="loginBtnShowLoad"> 登 录 </van-button>
			<p class="sign_up_link">还没有账号？<router-link to='/signup'>立即注册</router-link></p>
		</div>
	</div>
</template>

<script>
import {Dialog,Toast} from 'vant';

export default {
	name: 'login',
	data () {
	    return {
	      	loginBtnShowLoad : false,
	      	username : '',
	      	password : ''
	    }
	},
	methods: {
    	loginFn () {
    		let _t = this;
    		_t.loginBtnShowLoad = true;
    		//TODO
    		//用户名或者密码为空
    		if (this.username.replace(/\s/g,'') == ''){
    			Toast({
					message : '用户名不可为空',
					forbidClick : true,
				});
				_t.loginBtnShowLoad = false;
				return;
    		}
    		if (this.password.replace(/\s/g,'') == ''){
    			Toast({
					message : '密码不可为空',
					forbidClick : true,
				});
				_t.loginBtnShowLoad = false;
				return;
    		}
    		this.$http({
    			method:'get',
    			url : '/api/v1/signin',
    			params : {
    				username : _t.username,
    				password : _t.password
    			}
    		}).then(({data}) => {
    			if (!data){
    				//请求失败
    				//TODO
    				return;
    			}
    			if (data.status == 1){
    				let _data = data.data,_str = '';
    				
    				console.log(_data)
    				console.log(1111)
    				_t.$store.commit('userInfo',_data);
    				
    				
    				for (let i in _data){
    					_str += '&' + i + '=' + _data[i];
    				}
    				_str.substr(1,_str.length);
    				console.log(_t.$tool)
    				_t.$tool.Cookie.write('yueka',_str,Math.floor(new Date().getTime()/1000) + 30 * 24 * 60 * 60)
    				
    				Toast.success({
    					message : '登录成功',
    					duration: 600,
    				})
    				
    				setTimeout(function(){
    					_t.$router.push('/cardmanage');
    				},600)
    			} else {
    				Toast({
    					message : data.errormsg,
    					forbidClick : true,
    				});
    			}
    			_t.loginBtnShowLoad = false;
    		})
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
	line-height: .76rem; 
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