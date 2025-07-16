import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'

// 引入 Tailwind CSS
import './tailwind.css'

// 引入 Vant 组件库
import Vant from 'vant'
import 'vant/lib/index.css'

// 引入CSS变量和样式
import './styles/variables.less'
import './theme/index.less';
import './theme/root-vars.less';

// 引入擎路组件库
import QingluVant from './index.js'

// 创建路由配置
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('./App.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('./App.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const app = createApp(App)

// 使用 Vue Router
app.use(router)

// 使用 Vant
app.use(Vant)

// 使用擎路组件库
app.use(QingluVant)

app.mount('#app')
