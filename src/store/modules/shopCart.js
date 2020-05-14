import {reqCartList,reqCheckCartItem,reqAddToCart,reqDeleteCarItem} from '@/api'


export default{
    state:{
       cartList:[], 
    },
    mutations: {
        RECEIVE_CART_LIST(state,{cartList}){
            state.cartList = cartList
        },
    },
    actions:{
        async deleteCarItem({commit},{skuId}){
            const result = await reqDeleteCarItem(skuId)
            if(result.code!==200){
                throw new Error(result.message || '删除成功');
            }
        },

        async getcartList({commit}){
            const result = await reqCartList()
            if(result.code === 200){
                const cartList = result.data
                commit('RECEIVE_CART_LIST',{cartList})
            }
        },

        async checkCartItem({commit},{skuId,isChecked}){
            const result = await reqCheckCartItem(skuId,isChecked)

            if(result.code!==200){
                throw new Error(result.message || '修改勾选状态成功');
            }
        },
        async checkAllCartItem({state,commit,dispatch,getters},checked){
            const isChecked = checked ? 1 : 0
            const promises = []
            state.cartList.forEach(item =>{
                if(item.isChecked===isChecked) return

                const promise = dispatch('checkCartItem',{skuId:item.skuId,isChecked})
                promises.push(promise)
            })
            return Promise.all(promises)
        },
        // async changeCartItemNumber({commit}){
            // async addToCart({commit},{skuId,skuNum,callBack}){
            //     const result = await reqAddToCart(skuId,skuNum)
            //     if(result.code===200){
            //         console.log('添加成功')
            //         callBack()
            //         // callBack({status:0,message:'添加购物车成功'})
            //     }else{
            //         console.log('添加失败')
            //         callBack('添加购物车失败')
            //         // callBack({status:1,message:'添加购物车失败'})
            //     }
            // },
        
            // async addToCart2({commit},{skuId,skuNum}){
            //     const result = await reqAddToCart(skuId,skuNum)
            //     if(result.code===200){
            //         // console.log('添加成功')
            //         return ''
            //     }else{
            //         // console.log('添加失败')
            //         return '添加购物车失败'
            //     }
            // },
        
            async addToCart3({commit},{skuId,skuNum}){
                const result = await reqAddToCart(skuId,skuNum)
                if(result.code===200){
                    // console.log('添加成功')
                    return ''
                }else{
                    // console.log('添加失败')
                    
                    throw new Error('添加购物车失败')
                }
            }
        },
    // },
    getters: {
        totalCount(state){
            let total = 0

            state.cartList.forEach(item =>{
                const {isChecked,skuNum} = item
                if(isChecked===1){
                    total +=skuNum
                }
            })

            return total
        },
        totalPrice(state){
            let total = 0

            state.cartList.forEach(item =>{
                const {isChecked,skuPrice,skuNum} = item
                if(isChecked===1){
                    total +=skuPrice * skuNum
                }
            })

            return total
        }
    }
}