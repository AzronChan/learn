<template>
	<div class="sign_up">
		<div class="sign_up_box">
			<h3 class="title">注 册</h3>
			<van-cell-group>
				<van-field v-model="username" required clearable label="用户名" icon="question" placeholder="请输入用户名" @click-icon="$toast('question')" :error='usernameErr' @input="inpChange({type:'username'})"/>

				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required @click='passwordClick($event)' :error-message="errorMessage.password"/>

				<van-field v-model="confirmPassword" type="password" label="重复密码" placeholder="请再次输入密码" required @click='passwordClick($event)' :error-message="errorMessage.confirmPassword" />

				<van-field v-model="tel" required label="手机号" placeholder="请输入手机号" :error-message="errorMessage.tel" />
				
				<van-field v-model="mail" required label="邮箱地址" placeholder="请输入邮箱地址" :error-message="errorMessage.mail" />
				
				<van-radio-group v-model="radio">
				  
				    <van-cell title="男生" v-model='radio' clickable @click="radio = '1'">
				      <van-radio name="1" />
				    </van-cell>
				    <van-cell title="女生" v-model='radio' clickable @click="radio = '2'">
				      <van-radio name="2" />
				    </van-cell>
				</van-radio-group>

			</van-cell-group>
			<van-button type="primary" class='submit_btn' size="large" block @click='submit()' :loading='submitBtnShowLoad'> 注 册 </van-button>
			<p class="login_link">已有账号？<router-link to='/'>立即登录</router-link></p>
		</div>

	</div>
</template>

<script>
	import {Dialog,Toast} from 'vant';
	
	export default {
		name: 'login',
		data() {
			return {
				submitBtnShowLoad: false,
				password: '',
				confirmPassword : '',
				username: '',
				tel: '',
				mail:'',
				radio : '',
				usernameErr : false,
				errorMessage : {
					password : '',
					confirmPassword : '',
					mail : '',
					tel:''
				}
			}
		},
		methods: {
			replaceSpace (str){
				if (!str) return '';
				return str.replace(/\s/g,'');
			},
			passwordClick(e) {

			},
			inpChange(obj){
				if (obj.type == 'username'){
					this.usernameErr = false;
				}
			},
			submit() {
				let _t = this;
				_t.submitBtnShowLoad = true;
				//TODO 检验正确性
				if (_t.replaceSpace(_t.username) == ''){
					_t.usernameErr = true;
					return _t.submitBtnShowLoad = false;
				}
				if (_t.replaceSpace(_t.password) == ''){
					_t.errorMessage.password = '密码不能为空';
					return _t.submitBtnShowLoad = false;
				}
				if (_t.password != _t.confirmPassword){
					_t.errorMessage.confirmPassword = '密码输入不一致';
					return _t.submitBtnShowLoad = false;
				}
				if (!errorMessage.mail.match(/1/g)){
					_t.errorMessage.tel = '请输入正确的邮箱地址';
					return _t.submitBtnShowLoad = false;
				}
				this.$http({
	    			method:'get',
	    			url : '/api/v1/signup',
	    			params : {
	    				username : _t.username,
	    				password : _t.password,
	    				tel : _t.tel,
	    				radio : _t.radio
	    			}
	    		}).then(({data}) => {
	    			console.log(data);
	    			if (!data){
	    				//请求失败
	    				//TODO
	    				return;
	    			}
	    			if (data.status == 1){
	    				let _data = data.data;
	    				
	    				_t.$store.commit('userInfo',_data);
	    				
	    				Toast.success({
	    					message : '注册成功',
	    					duration: 3000,
	    				})
	    				
//	    				setTimeout(function(){
//	    					_t.$router.push('/login');
//	    				},3000)
	    			} else {
	    				Toast({
	    					message : data.errormsg,
	    					forbidClick : true,
	    				});
	    			}
	    			_t.submitBtnShowLoad = false;
	    		})
			}
		}
	}
</script>

<style scoped lang="scss">
	.sign_up {
		position: relative;
		height: 100%;
		background: #f8f8f8;
	}
	
	.sign_up_box {
		width: calc(100% - 30px);
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	
	.title {
		margin: 0 0 .6rem;
		text-align: center;
		font-size: .8rem;
	}
	
	.submit_btn {
		margin: .36rem auto 0;
	}
	.login_link {
		text-align: center;
		font-size: .28rem;
	    line-height: 1rem;
	    a {
	    	color: #2BA2FA
	    }
	}
</style>