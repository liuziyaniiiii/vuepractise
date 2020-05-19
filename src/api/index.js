import ajax from './ajax'
import mockAjax from './mockAjax'
// import { params } from 'vee-validate/dist/types/rules/alpha'

export function reqBaseCategoryList(){
    return ajax({
        method:'GET',
        url:'/product/getBaseCategoryList'
    })
}




export const reqBanners = () => mockAjax('/banners')
export const reqFloors = () => mockAjax('/floors')

// 根据搜索的条件参数对象获取商品列表数据
export const reqProductList =(searchParams) =>ajax({
    url:'/list',
    method:'POST',
    data:searchParams
})


// reqProductList({
//     "category3Id": "61",
//     "categoryName": "手机",
//     "keyword": "小米",
//     "order": "1:desc",
//     "pageNo": 1,
//     "pageSize": 10,
//     "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//     "trademark": "4:小米"
//   })


export const reqProduct = (skuId)=>ajax(`/item/${skuId}`)
// reqProduct(6)

/* 
添加到购物车
/api/cart/addToCart/{ skuId }/{ skuNum }
*/

export const reqAddToCart = (skuId,skuNumChange) => ajax.post(`cart/addToCart/${ skuId }/${ skuNumChange }`)


// 获取购物车列表
export const reqCartList =() => ajax('/cart/cartList')

// 切换商品选中状态 /cart/checkCart/{skuID}/{isChecked}

export const reqCheckCartItem = (skuId,isChecked) =>ajax(`/cart/checkCart/${skuId}/${isChecked}`)

//删除购物车商品/cart/deleteCart/{skuId}
export const reqDeleteCartItem = (skuId)=>ajax.delete(`/cart/deleteCart/${skuId}`)

//登陆
export function reqLogin(mobile,password){
    return ajax({
        method:'POST',
        url: '/user/passport/login',
        data:{mobile,password}
    })
} 

//注册 /api/user/passport/register
// export const reqRegister = (userInfo)=>ajax.post(`/user/passport/register`,userInfo)
export const reqRegister = (userInfo)=>ajax.post(`/user/passport/register`,userInfo)


/* 
退出登陆
/api/user/passport/logout
*/
export const reqLogout = () => ajax('/user/passport/logout')


// 获取订单列表/api/order/auth/{page}/{limit}

export const reqMyOrders = (page, limit) => ajax(`/order/auth/${page}/${limit}`)


/* 
获取订单交易页信息
/api/order/auth/trade  GET
*/

export const reqTradeInfo = () => ajax('/order/auth/trade')

// 提交订单/api/order/auth/submitOrder?tradeNo={tradeNo} POST

export const reqSubmitOrder =(tradeNo,orderInfo)=>ajax({
    url:'/order/auth/submitOrder',
    method:'POST',
    params:{tradeNo},
    data:orderInfo,
})

//获取订单支付信息/api/payment/weixin/createNative/{orderId}
export const reqPayInfo = (orderId) => ajax(`/payment/weixin/createNative/${orderId}`)

// 查询支付订单状态/api/payment/weixin/queryPayStatus/{orderId} GET

export const reqOrderStatus =(orderId)=>ajax(`/payment/weixin/queryPayStatus/${orderId}`)