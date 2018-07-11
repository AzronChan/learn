<template>
	<div class="help_doc block_pt15">
		<van-collapse v-model="activeNames" class='help_doc_toggle'>
		  <van-collapse-item title="问题1" name="1">
			回答1
		  </van-collapse-item>
		  <van-collapse-item title="问题2" name="2">
		  	回答2
		  </van-collapse-item>

		</van-collapse>
	</div>
</template>

<script>
export default {
	name: 'help_doc',
	data() {
		return {
			activeNames : ['1']
		}
	}
}
</script>

<style scoped lang="scss">
.help_doc {
	
}
.help_doc_toggle {
	font-size: 13px;
    line-height: 1.5;
    color: #666;;
}
</style>