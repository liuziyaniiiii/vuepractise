import Mock from 'mockjs'

import banners from './banners.json'
import floors from './floors.json'



//模拟一个返回轮播数据的接口
Mock.mock('/mock/banners',{code:200,data:banners})


//模拟一个返回楼层数据的接口
Mock.mock('/mock/floors',{code:200,data:floors})


console.log('mockserver....')