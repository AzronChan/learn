import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'	//请求
import {tool} from './models/tool'
import { Button,Cell,Field,List,CellGroup,Popup,Dialog,Toast,PasswordInput,NumberKeyboard,NavBar,RadioGroup,Radio,Actionsheet,DatetimePicker,Tabbar,TabbarItem,Icon,Tab,Tabs,  Collapse, CollapseItem ,Uploader} from 'vant';


Vue.config.productionTip = false

Vue.use(Button).use(Cell).use(Field).use(CellGroup).use(Popup).use(Dialog).use(Toast).use(PasswordInput).use(NumberKeyboard).use(NavBar).use(RadioGroup).use(Radio).use(Actionsheet).use(DatetimePicker).use(Tabbar).use(TabbarItem).use(Icon).use(Tab).use(Tabs).use(Collapse).use(CollapseItem).use(Uploader);

Vue.prototype.$http = axios

Vue.prototype.$tool = tool

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
