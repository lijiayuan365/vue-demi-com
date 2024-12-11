import './assets/main.css'
import { Vue, isVue3, createApp } from 'vue-demi'

import App from './App.vue'

// createApp(App).mount('#app')
if (isVue3) {
  createApp(App).mount('#app')
} else {
  new Vue({
    el: '#app',
    render: (h) => h(App),
  })
}