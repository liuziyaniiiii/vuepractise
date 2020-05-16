import {getUserTempId,saveUserInfo,getUserInfo,removeUserInfo} from '@/utils'
import {reqLogin,reqRegister,reqLogout } from '@/api'

export default{
    state:{
        userInfo:getUserInfo(),
        userTempId: getUserTempId()
    },
    mutations: {
        RECEIVE_USER_INFO(state,{userInfo}){
            state.userInfo= userInfo
        },
        REMOVE_USER_INFO(state){
            state.userInfo = ''
        }
    },
    actions: {
        // 注册
        async register(context,userInfo){
            const result = await reqRegister(userInfo)
            if(result.code!==200){
                throw new Error(result.data|| result.message || '注册失败')
            }
        },
        //登陆
        async login ({commit},{mobile,password}){
            const result = await reqLogin(mobile,password)
            if(result.code === 200){
                const userInfo = result.data
                commit('RECEIVE_USER_INFO',{userInfo})
                saveUserInfo(userInfo)
            }else{
                throw new Error(result.data|| result.message || '登陆失败')
            }
        },
        //退出登录
        async logOut({commit}){
            const result = await reqLogout()
            if(result.code===200){
                commit('REMOVE_USER_INFO')
                removeUserInfo()
            }else{
                throw new Error( result.message || '退出失败')
            }
        }

    },
    getters: {
        
    }
}