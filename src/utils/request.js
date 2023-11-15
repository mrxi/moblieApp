import axios from 'axios'
import { getToken } from '@/utils/auth'
console.log(import.meta.env.VITE_APP_BASE_API,'啊实打实大大')
import { showNotify } from 'vant';
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 30000,

})

service.interceptors.request.use(
  config => {
   
    if (getToken() && config.url.indexOf('/oauth/token') === -1) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = 'Bearer ' + getToken()
    }else{
      config.headers['Authorization'] = 'Basic cGRlOlBkZXNvZnQ4ODg4OA=='
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    } 
    // console.log(getToken())
    // debugger
    // // do something before request is sent
    // if (getToken()) {
    //   // let url=`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJteSIsInNjb3BlIjpbImFsbCJdLCJjb21wYW55IjoiUERFIiwiZXhwIjoxNjk2MzUwNTY0LCJhdXRob3JpdGllcyI6WyJST0xFX1VTRVIiXSwianRpIjoiMmNkYzBlMzEtMzY0Zi00MWUyLTlkODMtOWRlZDRjZWM5YzEyIiwiY2xpZW50X2lkIjoicGRlIn0.PZWL1Of13NNbOf7TtYTpCv3z8zYrXcBImxtUUBbud4M`
    //   // config.headers['Authorization'] = 'Bearer ' +url
    //   config.headers['Authorization'] = `Basic cGRlOlBkZXNvZnQ4ODg4OA==`
    // } else {
    //   window.location.hash = `#/login`
    // }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  async response => {
    
    const res = response.data
    if(res.code === 'PDE-ERR-100') { // session过期，退出登录
      showNotify({
        message: res.message,
      })
      // await store.dispatch('user/resetToken')
      // setTimeout(() => {
      //     window.location.hash = `#/login`
      //   }, 500)
      return
    }
    return res
  },
  error => {
    const data = error.response.data
    const message = data.message || data.error_description || data.error
    if (error.response.status === 500) {
      showNotify({
        message: '服务器通讯中断',
        type: 'danger',
        background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
      
      })
    } if(error.response.status === 401) {
      showNotify({
        message: '登录鉴权失败，请重新登录！',
        background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c',
        type: 'danger',
      })
      // window.location.hash = `#/login`
    } else if (error.response.status !== 500 && error.response.status !== 401 && data && message) {
      showNotify({
        message,
        type: 'danger',
        background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
     
      })
    } else {
      showNotify({
        message: error.message,
        type: 'danger',
        background: '#fef0f0',
        border: '#fde2e2',
        color:'#f56c6c'
      
      })
    }
    return Promise.reject(error)
  }
)

export default service