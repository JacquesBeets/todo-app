import Vue from 'vue'
import App from './App'
import * as firebase from 'firebase'
import router from './router'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import {store} from './store/store'

Vue.use(Vuetify, {
  theme: {
    primary: '#3f51b5',
    secondary: '#b0bec5',
    accent: '#8c9eff',
    error: '#b71c1c',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

Vue.config.productionTip = false

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
  }
})
