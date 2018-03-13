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
    setLoadedTodos(state, payload){
      state.todos = payload
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
    loadTodos({commit}) {
      commit('setLoading', true)
      const user = store.state.user.id
      firebase.database().ref('todos/' + user).once('value')
        .then((data) => {
          const todos = []
          const obj = data.val()
          for (let key in obj){
            todos.push({
                id: key,
                title: obj[key].title,
                items: obj[key].items,
                userId: obj[key].userId
            })
          }
          commit('setLoadedTodos', todos)
          commit('setLoading', false)
        })
        .catch(
          (error) => {
            console.log(error)
            commit('setLoading', false)
          }
        )
    },
    todoChangedListener({commit}){
      const user = store.state.user.id
      firebase.database().ref('todos/' + user).on('value', function(snapshot){
        const todos = []
        const obj = snapshot.val()
        for (let key in obj){
          todos.push({
              id: key,
              title: obj[key].title,
              items: obj[key].items,
              userId: obj[key].userId
          })
        }
        commit('setLoadedTodos', todos)
      })
    },
    clearError({commit}){
      commit('clearError')
    },
    registerUser({commit, getters}, payload){
      commit('setLoading', true)
      commit('clearError', true)
      const user = getters.user
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
      .then()
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    signUserIn ({commit, dispatch}, payload){
      commit('setLoading', true)
      commit('clearError', true)
      firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
      .then(
        user => {
          commit('setLoading', false)
          dispatch('loadTodos')
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
    autoSignIn({commit, dispatch}, payload){
      commit('setUser', {id: payload.uid})
      dispatch('loadTodos')
    },
    logout({commit}){
      firebase.auth().signOut()
      commit('setUser', null)
    },
    addItemInTodoList({commit, dispatch}, payload){
      const user = store.state.user.id
      const text = payload.inputValue
      const listKey = payload.todoListKey
      const newText = {
        todo: text, 
        completed: false, 
        edit: false
      }
      firebase.database().ref('todos/'+ user + "/" + listKey + '/items').push(newText)
        .catch((error) => {
          console.log(error)
        })

      dispatch('todoChangedListener')
    },
    createNewTodoList({commit, dispatch, getters}, payload){
      const newList = {
        title: payload.inputText,
        userId: getters.user.id
      }
      firebase.database().ref('todos/' + newList.userId).push(newList)
        .then((data) => {
          const key = data.key
          dispatch('todoChangedListener')
        })
        .catch((error) => {
          console.log(error)
        }) 
    },
    todoCompleted({commit, dispatch}, payload){
      const user = store.state.user.id
      firebase.database().ref('todos/'+ user + "/" + payload.todoListKey + '/items/' + payload.todoIndex + '/completed').once('value')
      .then((data) => {
        if (!data.val()){
          firebase.database().ref('todos/'+ user + "/" + payload.todoListKey + '/items/' + payload.todoIndex).update({completed: true})
          } else {
            firebase.database().ref('todos/'+ user + "/" + payload.todoListKey + '/items/' + payload.todoIndex).update({completed: false})
        }
        dispatch('todoChangedListener') 
      })
      .catch((error) => {
        console.log(error)
      })
    },
    addEditedTodoTextToDb({commit, dispatch}, payload){
      const user = store.state.user.id
      firebase.database().ref('todos/'+ user + "/" + payload.todoListKey + '/items/' + payload.todoIndex).update({todo: payload.inputValue})
      .then((data) => {
        
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteTodoList({commit, dispatch}, payload){
      const user = store.state.user.id
      firebase.database().ref('todos/'+ user + "/" + payload).remove()
      .then((data) => {
        dispatch('todoChangedListener')
      })
      .catch((error) => {
        console.log(error)
      })
    },
    deleteTodo({commit, dispatch}, payload){
      const user = store.state.user.id
      firebase.database().ref('todos/'+ user + "/" + payload.todoListKey + '/items/' + payload.todoIndex).remove()
      .then((data) => {
        dispatch('todoChangedListener')
      })
      .catch((error) => {
        console.log(error)
      })
    }
  }
})