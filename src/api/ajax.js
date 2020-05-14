import axios from 'axios'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/store'

// 配置不显示右上角的旋转进度条, 只显示水平进度条
NProgress.configure({ showSpinner: false }) 

// 创建一个新的axios(Axios的功能的实例)函数发请求(可以作为函数和对象)
const instance = axios.create({
    baseURL:'/api',//具体请求就不用再写api
    timeout:15000,//指定处理请求时间
})
// axios请求拦截器
instance.interceptors.request.use(config =>{
    // console.log('请求拦截器执行')

    NProgress.start() //请求进度条


    config.headers.userTempId = store.state.user.userTempId
    return config
})
//axios响应拦截器
instance.interceptors.response.use(
    response => {
        // console.log('响应拦截器成功回调执行')
        NProgress.done()
        return response.data
    },
    error => {
        // console.log('响应拦截器失败回调执行')
        NProgress.done()
        alert(`请求出错: ${error.message || '未知错误'}`)
        return Promise.reject(error)
    }
)

export default instance