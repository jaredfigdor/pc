import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import Swal from 'sweetalert2'

// CommonJS
const Swala = require('sweetalert2')



var firebaseConfig = {
  apiKey: "AIzaSyAxs71qzDjm5pWRmrlqkP8vzHRRtgalAZc",
  authDomain: "protocoach-dev.firebaseapp.com",
  projectId: "protocoach-dev",
  storageBucket: "protocoach-dev.appspot.com",
  messagingSenderId: "831931592195",
  appId: "1:831931592195:web:43a8d2b4c747f65c61a836"
}

Vue.config.productionTip = false

var vm = new Vue({
  router,
  components: {App},
  vuetify,
  render: h => h(App)
}).$mount('#app')
