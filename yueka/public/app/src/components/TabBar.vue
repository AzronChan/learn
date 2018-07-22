<template>
	<div class="tab_bar" :class="[ tabBarShow ? '' : 'tab_bar_none']">
		<van-tabbar fixed class="content" >
		  	<van-tabbar-item v-for="(item,index) in tabs" @click='routerLink(index,item.routerType)' :class="[currentTab == index ? 'current' : '']">
		  		<van-icon :name="item.iconName" class="tab_bar_icon"></van-icon><p class="tab_bar_text">{{item.tabName}}</p>
		  	</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	
	export default {
		name: 'login',
		data() {
			return {
				currentTab : 0,
				tabs : [
					{
						routerType : 'cardmanage',
						iconName : 'card',
						tabName : '卡片管理'
					},
					{
						routerType : 'options',
						iconName : 'setting',
						tabName : '选项'
					}
				]
			}
		},
		computed: mapState({
			tabBarShow : state => state.tabBarShow
		}),
		methods: {
			routerLink(index,type){
				this.currentTab = index;
				this.$router.push({ path: '/' + type });
			}
		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.tab_bar {
	
}
.content {
	height: 1.2rem;
}
.current {
	color: #7ed1d0;
}
.tab_bar_icon {
	display: block;
	font-size: .6rem;
	text-align: center;
}
.tab_bar_text {
	text-align: center;
    line-height: .4rem;
    font-size: .2rem;
    margin: .05rem 0 0;
}
.tab_bar_none {
	display: none;
}

</style>