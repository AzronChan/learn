<template>
	<div class="option block_pt15">
			<van-cell-group>
					<van-cell title="个人信息" icon="contact" is-link to='/userinfo'/>
			</van-cell-group>
			<div class="about">
				<div class="block_title">
					关于
				</div>
				<van-cell-group>
					<van-cell title="帮助文档" icon="info-o" is-link to='/helpdoc'/>
					<!--<van-cell title="点个赞" icon="like-o" is-link to='/like'/>-->
					<van-cell title="分享" icon="share" is-link />
				</van-cell-group>
			</div>
	</div>
</template>

<script>
	export default {
		name: 'options',
		data() {
			return {
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.option {
		
	}
</style>