<template>
	<div class="sign_up">
		<div class="sign_up_box">
			<h3 class="title">注 册</h3>
			<van-cell-group>
				<van-field v-model="username" required clearable label="用户名" icon="question" placeholder="请输入用户名" @click-icon="$toast('question')" />

				<van-field v-model="password" type="password" label="密码" placeholder="请输入密码" required @click='passwordClick($event)' />

				<van-field v-model="confirmPassword" type="password" label="重复密码" placeholder="请再次输入密码" required @click='passwordClick($event)' />

				<van-field v-model="phone" required label="手机号" placeholder="请输入手机号" error-message="" />
				<van-radio-group v-model="radio">
				  
				    <van-cell title="男生" clickable @click="radio = '1'">
				      <van-radio name="1" />
				    </van-cell>
				    <van-cell title="女生" clickable @click="radio = '2'">
				      <van-radio name="2" />
				    </van-cell>
				</van-radio-group>

			</van-cell-group>
			<van-button type="primary" class='submit_btn' size="large" block @click='loginFn()' :loading='submitBtnShowLoad'> 注 册 </van-button>
			<p class="login_link">已有账号？<router-link to='/'>立即登录</router-link></p>
		</div>

	</div>
</template>

<script>
	export default {
		name: 'login',
		data() {
			return {
				submitBtnShowLoad: false,
				password: '',
				confirmPassword : '',
				username: '',
				phone: '',
				radio : ''
			}
		},
		methods: {
			passwordClick(e) {

			},
			loginFn() {
				let _t = this;
				_t.submitBtnShowLoad = true;
				setTimeout(function() {
					_t.submitBtnShowLoad = false;
				}, 2000)
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