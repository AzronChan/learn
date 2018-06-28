import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, Cell, Field , List ,CellGroup ,Popup ,Dialog ,Toast ,PasswordInput ,NumberKeyboard ,NavBar } from 'vant';


Vue.config.productionTip = false

Vue.use(Button).use(Cell).use(Field).use(CellGroup).use(Popup).use(Dialog).use(Toast).use(PasswordInput).use(NumberKeyboard).use(NavBar);

const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
