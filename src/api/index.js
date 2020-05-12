import ajax from './ajax'
import mockAjax from './mockAjax'

export function reqBaseCategoryList(){
    return ajax({
        method:'GET',
        url:'/product/getBaseCategoryList'
    })
}

export function reqLogin(mobile,password){
    return ajax({
        method:'POST',
        url: '/user/passport/login',
        data:{mobile,password}
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