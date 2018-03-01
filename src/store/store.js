import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state:{
    menuItems: [
      {name: 'Todos', icon: 'done_all', link: '/todos'},
      {name: 'About', icon: 'thumb_up', link: '/about'},
      {name: 'Register', icon: 'create', link: '/register'},
      {name: 'Sign In', icon: 'vpn_key', link: '/signin'},
      {name: 'Profile', icon: 'perm_identity', link: '/profile'}
    ],
    todos:[
      { 
        id: 1,
        title: 'First Todo List',
        items: [
        {id: 1, todo:'build kick ass web apps!', completed: false, edit: false},
        {id: 2, todo:'bust your but and study hard', completed: true, edit: false}
        ]
      },
      { 
        id: 2,
        title: 'Second Todo List',
        items: [
        {id: 1, todo:'make lots of money!', completed: false, edit: false},
        {id: 2, todo:'live life to the fullest!', completed: false, edit: false}
        ]
      },
      {
        id: 3,
        title: 'Third Todo List',
        items: [
        {id: 1, todo:'tell my baby I love her! everyday!', completed: false, edit: false},
        {id: 2, todo:'wash the dog', completed: false, edit: false}
        ]
      },
    ]
  },
  getters: {
    
  },
  mutations: {
    todoCompleted (state, payload){
      const todoItem = state.todos[payload.todoListId - 1].items[payload.todoId - 1] 
      if (!todoItem.completed){
          todoItem.completed = true
      } else {
        todoItem.completed = false
      }       
    }
  },
  actions: {

  }
})