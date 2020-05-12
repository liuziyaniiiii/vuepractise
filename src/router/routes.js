import Home from '@/pages/Home'
import Search from '@/pages/Search'
import Detail from '@/pages/Detail'
import Register from '@/pages/Register'
import Login from '@/pages/Login'

export default[
    {
        path:'/',
        component: Home
    },
    {
        name:'search',
        path:'/search/:keyword?',
        component: Search,
        props:route => ({keyword3: route.params.keyword, keyword4: route.query.keyword2})
    },
    {
        name:'detail',
        path:'/detail/:skuId',
        component:Detail,
    },
    {
        path:'/login',
        component: Login,
        meta:{
            isHideFooter:true
        }
    },
    {
        path:'/register',
        component: Register,
        meta:{
            isHideFooter:true
        }
    },
]