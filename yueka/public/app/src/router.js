import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import signUp from './components/SignUp.vue'
import cardManage from './views/cardManage.vue'
import createCard from './views/createCard.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
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
    }
  ]
})
