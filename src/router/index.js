import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login/Login.vue'

 const routes =[
  // {
  //   path: '/',
  //   name: 'await',
  //   component: () => import('../views/await/index.vue')
  // },
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/entityApprove',
    name: 'entityApprove',
    component: () => import('../views/entityApprove/index.vue'),
    beforeEnter:(to,from)=>{
      let params={
        1:'电子借阅审批',
        2:'实体借阅审批',
        9:'查档预约审批'
      }
      document.title = params[to.query.type]
    }
  },
  {
    path: '/outboundApprove',
    name: 'outboundApprove',
    component: () => import('../views/outboundApprove/index.vue'),
  },
  {
    path: '/archivesApprove',
    name: 'archivesApprove',
    component: () => import('../views/archivesApprove/index.vue'),
    beforeEnter:(to,from)=>{
      let params={
      3: "价值鉴定",
      4: "销毁鉴定",
      5: "降解密鉴定",
      6: "开放划控鉴定",
      }
      document.title = params[to.query.type]
    }
  },
  {
    path: '/await',
    name: 'await',
    component: () => import('../views/await/index.vue')
  },
  {
    path: '/auth-redirect',
    name: 'auth-redirect',
    component: () => import('../views/auth-redirect.vue')
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: Login
  // },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  },
//   {
//     path: '/:pathMatch(.*)',

//     component: () => import ('../views/notFound/index.vue')
// },
  // {
  //   path: '/await',
  //   name: 'await',
  //   component: () => import('../views/await/index.vue')
  // }
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.VITE_BASE_PATH),
  routes
})

export default router
