import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import store from './store/index'
import router from './router/router'
createApp(App)
    .use(store)
    .use(router)
    .mount('#app')

