import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About from '@/components/static/About'
import Todos from '@/components/todos/Todos'
import Profile from '@/components/user/Profile'
import Register from '@/components/user/Register'
import Signin from '@/components/user/Signin'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: About
    },
    {
      path: '/todos',
      name: 'todos',
      component: Todos
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    }
  ],
  mode: 'history'
})
