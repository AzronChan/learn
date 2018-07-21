import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import signUp from './views/SignUp.vue'
import cardManage from './views/cardManage.vue'
import createCard from './views/createCard.vue'
import Options from './views/Options.vue'
import userInfo from './views/userInfo.vue'
import helpDoc from './views/helpDoc.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      title : '登录',
      meta : {
      	title : '登录'
      },
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: signUp
    },
    {
      path: '/cardmanage',
      name: 'cardmanage',
      component: cardManage
    },
    {
      path: '/createcard',
      name: 'createcard',
      component: createCard
    },
    {
      path: '/options',
      name: 'options',
      component: Options
    },
    {
      path: '/userinfo',
      name: 'userinfo',
      component: userInfo
    },
    {
      path: '/helpdoc',
      name: 'helpdoc',
      component: helpDoc
    }
  ]
})
