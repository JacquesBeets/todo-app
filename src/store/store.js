import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state:{
    menuItems: [
      {name: 'Todos', icon: 'done_all', link: '/todos'},
      {name: 'About', icon: 'thumb_up', link: '/about'},
      {name: 'Register', icon: 'create', link: '/register'},
      {name: 'Sign In', icon: 'vpn_key', link: '/signin'},
      {name: 'Profile', icon: 'perm_identity', link: '/profile'}
    ]
  },
  getters: {
    
  },
  mutations: {
    
  },
  actions: {

  }
})