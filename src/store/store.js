import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state:{
    user: null,
    todos:[
      // { 
      //   title: 'First Todo List',
      //   items: [
      //   {id: 1, todo:'build kick ass web apps!', completed: false, edit: false},
      //   {id: 2, todo:'bust your but and study hard', completed: true, edit: false}
      //   ]
      // },
      // { 
      //   title: 'Second Todo List',
      //   items: [
      //   {id: 1, todo:'make lots of money!', completed: false, edit: false},
      //   {id: 2, todo:'live life to the fullest!', completed: false, edit: false}
      //   ]
      // },
      // {
      //   title: 'Third Todo List',
      //   items: [
      //   {id: 1, todo:'tell my baby I love her! everyday!', completed: false, edit: false},
      //   {id: 2, todo:'wash the dog', completed: false, edit: false}
      //   ]
      // },
    ]
  },
  getters: {
    user (state) {
      return state.user
    }
  },
  mutations: {
    todoCompleted (state, payload){
        const todoItem = state.todos[payload.todoListIndex].items[payload.todoId] 
        if (!todoItem.completed){
            todoItem.completed = true
        } else {
          todoItem.completed = false
        }      
    },
    deleteTodo (state, payload){
        state.todos[payload.todoListIndex].items.splice((payload.todoId), 1)
    },
    deleteTodoList (state, payload){
      state.todos.splice(payload.todoListIndex, 1)
    },
    addTodo(state, payload){
      const itemId = state.todos[payload.todoListIndex].items.length + 1
      const text = payload.inputValue
      state.todos[payload.todoListIndex].items.push({id: itemId, todo: text, completed: false, edit: false})
    },
    newTodoList(state, payload){
      state.todos.push({
        title: payload.inputText,
        items: []
      })
    },
    editTodo(state, payload){
      const todoItem = state.todos[payload.todoListIndex].items[payload.todoId] 
      if (!todoItem.edit){
        todoItem.edit = true
      } else {
        todoItem.edit = false
      }
    },
    editTodoText(state, payload){
      const todoItem = state.todos[payload.todoListIndex].items[payload.todoId] 
      todoItem.todo = payload.inputValue
      todoItem.edit = false
    },
    setUser (state, payload){
      state.user = payload
    }
  },
  actions: {
    registerUser({commit}, payload){
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    signUserIn ({commit}, payload){
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          console.log(error)
        }
      )
    }
  }
})