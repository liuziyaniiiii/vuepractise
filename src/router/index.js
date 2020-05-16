// 路由器对象模块

import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '@/store'


Vue.use(VueRouter)


const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, onComplete, onAbort) {
  console.log('push()', location, onComplete, onAbort)
  if (onComplete || onAbort) {
    originPush.call(this, location, onComplete, onAbort) 
    
  }else{
    return originPush.call(this, location).catch(() => {
      console.log('catch error')
      return new Promise(()=>{})
    })  
  }
}

VueRouter.prototype.replace = function (location, onComplete, onAbort) {
  if (onComplete || onAbort) {
    originReplace.call(this, location, onComplete, onAbort) 
  } else {
    return originReplace.call(this, location).catch(() => {
      console.log('catch error2')
      return new Promise(()=>{})
    })   
  }
}


const router= new VueRouter({
    mode:'history',
    // 配置所有的路由
    routes,
    scrollBehavior (to, from, savedPosition) {
      return { x: 0, y: 0 }
    }
})

// 所有需要进行登陆检查的路由路径的数组
const checkPaths = ['/trade', '/pay', '/center']  // 所有以它开头的路径都需要检查

/* a.只有登陆了, 才能查看交易/支付/个人中心界面 */
router.beforeEach((to, from, next) => { // 在即将跳转到目标前回调
  const targetPath = to.path  // 有可能是/paysuccess  /center/myorder

  // 如果目标路由是需要进行登陆检查的
  // const isCheckPath = !!checkPaths.find(path => targetPath.indexOf(path)===0)
  const isCheckPath = checkPaths.some(path => targetPath.indexOf(path)===0)

  if (isCheckPath) {
    // 如果已经登陆了, 放行
    if (store.state.user.userInfo.name) {
      next()
    } else { // 如果没有登陆, 强制自动跳转到登陆页面
      next('/login?redirect='+targetPath)
    }
  } else { // 如果目标路由不需要进行登陆检查, 直接放行
    next()
  }
})

export default router