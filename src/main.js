import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store/store'
import AlertCmp from './components/shared/Alert'

Vue.use(Vuetify, {
  theme: {
    primary: '#865A17',
    secondary: '#DE7B27',
    accent: '#F7B02C',
    background: '#EACFCE',
    error: '#DE7B27',
    info: '#2B5561',
    success: '#4CAF50',
    warning: '#DE7B27'
  }
})

Vue.config.productionTip = false

Vue.component('app-alert', AlertCmp)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store: store,
  router,
  render: h => h(App),
  created (){
    firebase.initializeApp({
        apiKey: 'AIzaSyASzl-d9kDwI--us6ifsUiZZaAaCv_d9ZI',
        authDomain: 'firepenciltodoapp.firebaseapp.com',
        databaseURL: 'https://firepenciltodoapp.firebaseio.com',
        projectId: 'firepenciltodoapp',
        storageBucket: 'firepenciltodoapp.appspot.com'
    })
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.$store.dispatch('autoSignIn', user)
      }
    })
  }
})
