import 'amfe-flexible';
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store  from './store';
import vant from 'vant';
import 'vant/lib/index.css';
const app = createApp(App)
app.use(router)
app.use(store)
app.use(vant)
app.mount('#app')
