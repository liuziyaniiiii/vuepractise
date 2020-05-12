import {reqProduct,reqAddToCart} from '@/api'

const state ={
    detailInfo: {},
}

const mutations= {
    RECEIVE_DETAIL_INFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
}

const actions = {
    async getDetailInfo({commit},skuId){
        const result = await reqProduct(skuId)
        if(result.code===200){
            const detailInfo = result.data
            commit('RECEIVE_DETAIL_INFO',detailInfo)
        }
    },
    async addToCart({commit},{skuId,skuNum,callBack}){
        const result = await reqAddToCart(skuId,skuNum)
        if(result.code===200){
            console.log('添加成功')
            callBack()
            // callBack({status:0,message:'添加购物车成功'})
        }else{
            console.log('添加失败')
            callBack('添加购物车失败')
            // callBack({status:1,message:'添加购物车失败'})
        }
    },

    async addToCart2({commit},{skuId,skuNum}){
        const result = await reqAddToCart(skuId,skuNum)
        if(result.code===200){
            // console.log('添加成功')
            return ''
        }else{
            // console.log('添加失败')
            return '添加购物车失败'
        }
    },

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
}

const getters = {
    categoryView(state){
        const categoryView = state.detailInfo.categoryView
        return categoryView || {}
    },
    skuImageList(state){
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo ? skuInfo.skuImageList : []
    },
    skuInfo (state) {
        const skuInfo = state.detailInfo.skuInfo
        return skuInfo || {}
    },
    spuSaleAttrList(state){
        const spuSaleAttrList = state.detailInfo.spuSaleAttrList
        return spuSaleAttrList || []
    }
}

export default{
    state,
    mutations,
    actions,
    getters
}