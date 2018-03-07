import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  strict: true,
  state:{
    user: null,
    todos:[],
    loading: false,
    error: null
  },
  getters: {
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    loading (state){
      return state.loading
    }
  },
  mutations: {
    setLoading (state, payload){
      state.loading = payload
    },
    setError (state, payload){
      state.error = payload
    },
    clearError (state){
      state.error = null
    },
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
    clearError({commit}){
      commit('clearError')
    },
    registerUser({commit}, payload){
      commit('setLoading', true)
      commit('clearError', true)
      firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    },
    signUserIn ({commit}, payload){
      commit('setLoading', true)
      commit('clearError', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid
          }
          commit('setUser', newUser)
        }
      )
      .catch(
        error => {
          commit('setLoading', false)
          commit('setError', error)
        }
      )
    }
  }
})