## 05今日任务: 实现Search组件
    1). Search静态组件(包含子SearchSelector子组件)
    2). Search组件动态显示
    3). 搜索条件参数的理解和准备
    4). 根据分类和关键字进行搜索
    5). 根据品牌进行搜索
    6). 根据商品属性进行搜索


## Search静态组件(包含子SearchSelector子组件)

## Search组件动态显示
    api: reqProductList()
    vuex: search.js ==> state/mutations/actions/getters 
    组件: 
        dispatch()
        mapState()
        模板

## 搜索条件参数的理解和准备
    category1Id: '', // 一级分类ID
    category2Id: '', // 二级分类ID
    category3Id: '', // 三级分类ID
    categoryName: '', // 分类名称
    keyword: '', // 关键字
    trademark: '', // 品牌  "ID:品牌名称"
    props: [], // 商品属性的数组: ["属性ID:属性值:属性名"] 示例: ["2:6.0～6.24英寸:屏幕尺寸"]
    order: '1:desc', // 排序方式  1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
    pageNo: 1, // 当前页码
    pageSize: 10, // 每页数量
	
## 根据分类和关键字进行搜索
	分类: query参数: categoryName / category1Id / category2Id / category3Id
	关键字: params参数: keyword

    在beMount(): 根据query和params参数来更新options
    在mounted(): 根据options发请求获取数据

    问题: 如果当前已经在Search了, 再通过点击搜索/点击分类来跳转到Search, 没有重新搜索?
    原因: 从A路由跳转到A路由, A路由组件对象不会重新创建  ==> 不会重新执行初始化生命周期回调
    解决: 监视$route的变化(A => A, $router是重新产生), 根据query&params更新options, 再请求
        监视路由参数变化: 监视$route就可以

    根据分类和搜索关键字进行搜索

    删除分类条件
        1. 重置options中的分类属性数据
        2. 重新请求获取数据
    删除关键字条件
        1. 重置options中的搜索属性数据
        2. 重新请求获取数据
    
    问题: 删除分类或关键字条件后, 地址栏还有条件参数?
    原因: 删除条件时, 并没有修改路由参数数据
    解决: 重新跳转到当前搜索界面, 并指定正确的参数
         删除分类: 不再携带query参数, 只携带原本的params参数
         删除关键字: 不再携带params参数, 只携带原本的query参数

    问题: 删除关键字条件, 输入框中的关键字没有同步删除
    原因: 删除条件时, 并没有去操作Header中的输入框数据
    解决: 使用全局事件总线实现Search组件与Header组件的通信
        1. 给Vue原型对象指定事件总线对象(vm对象)
        2. 在Search, 通过事件总线对象来分发事件
        3. 在Header, 通过事件总线对象绑定事件监听来接收消息, 从而可以更新数据

    问题: 在search界面多次重复又跳转Search后, 点击回退不能一次回到Home
    原因: 从search跳转到search时, 使用的是push
    解决: 使用replace代替push

    问题: 点击搜索按钮时页面跳转了, 地址栏路径不太对
    原因: 自动提交了表单
    解决: 用.prevent阻止事件的默认行为(提交表单)

## 根据品牌进行搜索
    子组件: 绑定监听, 让父组件去更新options中trademark属性值, 值由子组件来交给父组件 (子向父通信)
    父组件: 更新trademark的函数: 更新trademark ("ID:品牌名称"), 重新获取商品列表

## 根据商品属性进行搜索
    子组件: 绑定监听, 让父组件去更新options中props属性值, 值由子组件来交给父组件 (子向父通信)
    父组件: 更新props的函数: 向props数组中添加一个新元素, 重新获取商品列表
            1). 有可能不需要添加: 如果已经添加过了
            2). 一个prop的结构: "属性ID:属性值:属性名"



## 06今日任务
    1). 响应式数据对象: 添加新属性和删除属性的问题
    2). 排序功能
    3). 自定义分页组件: Pagination
    4). Detail组件


## 响应式数据对象: 添加新属性和删除属性的问题
    基础: 
        响应式数据对象: data或者state中的对象属性, 比如 options/productList
        内部所层次的数据都是响应式的(更新这个数据对应界面就会自动更新)
    添加新属性
        错误方式: 
            直接添加: this.options.trademark = 'xxx'   ==> 不会自动更新界面
        原因: 
            vue内部没有对添加的属性进行劫持操作(没有对应的setter监视)
        正确方式:
            vm.$set( target, key, value )
            Vue.set( target, key, value )
            为响应式对象添加一个属性，确保新属性也是响应式的，并且能够触发视图更新
    删除属性
        错误方式: 
            直接添加: delete this.options.trademark   ==> 不会自动更新界面
        原因: 
            vue内部给响应式属性添加的setter, 只能监视属性值的改变, 不能监视属性的删除
        正确方式:
            vm.$delete( target, key )
            Vue.delete( target, key )
            删除属性, 同时更新界面

## 排序
    1). order数据的结构
        组成: orderFlag:orderType
        例子: 
            1:desc
            1:asc
            2:desc
            2:asc
        1: 综合,2: 价格 asc: 升序,desc: 降序  示例: "1:desc"
    2). 哪个排序项选中?
        根据当前order中的orderFlag来确定
    3). 根据哪个排序项进行什么方式排序?
        哪个排序项?  根据当前order中的orderFlag来确定
        什么方式排序?  根据当前order中的orderType确定
    4). 点击切换排序项和排序方式
        点击当前排序项: 切换排序方式后进行搜索
        点击不是当前排序项: 切换排序项, 排序方式为降序

## 自定义分页组件: Pagination
    1). 直接使用已经定义好的分页组件Pagination

    2). 自定义通用型/复用型组件的基本步骤
        实现静态组件: 模板/样式写好
        设计从外部接收的数据: props
            currentPage: 当前页码
            pageSize: 每页数量
            total: 总数量
            showPageNo: 连续数码数
        设计内部包含的数据: data
            myCurrentPage: 当前页码
        设计基于props和data的计算属性数据: computed
            总页数: totalPages
                依赖数据: total 和 pageSize     36 5 
                算法: Math.ceil(total/pageSize)
            连续页码数的开始页码与结束页码: start和end
                依赖数据: myCurrentPage / showPageNo / totalPages
                算法:
                    start最小值是1
                    end最大值是totalPages
                    计算start
                    计算end
                    返回包含start和end的对象

        根据props和data数据和computed进行动态显示
            :disabled="xxx": 控制是否能操作
            v-if="yyy": 控制是否显示
            v-for="end": 遍历显示多个数值   
            v-for的优先级高于v-if: 先执行v-for的遍历, 每遍历一个再进行v-if的判断  面试题
        
        更新数据, 更新界面
            用户操作组件界面元素时, 更新当前组件的data数据
            子组件更新data数据的同时, 可能需要通知父组件做一些更新父组件数据的操作(可能异步/同步)
            父组件更新data数据的同时, 可能也要去更新子组件的数据

## Detail组件静态路由组件
    定义静态组件
    注册路由
    通过<router-link>进行路由跳转

    如何让路由跳转后, 滚动条自动停留到起始位置?
        scrollBehavior (to, from, savedPosition) {
            return { x: 0, y: 0 }  // 在跳转路由时, 滚动条自动滚动到x轴和y轴的起始位置
        }

## 优化请求: 减少不必要请求参数
    浏览器ajax请求提交json请求体参数时, 如果属性值是undefined, 不会提交, 但如果是"", 会提交
    问题: 参数值为空串, 如果是可以不用提交的, 那就没有必要提交?
    解决: 的提交请求前, 将""参数数据移除


## 07今日任务
    1). Detail组件动态显示数据
    2). ImageList组件
    3). Zoom组件
    4). 添加到购物车

## Detail组件动态显示数据
    api: reqProduct()
    vuex: detail.js---state/mutations/actions/getters
    组件: dispatch() / mapState() / mapGetters()

## 错误: "TypeError: Cannot read property 'category1Name' of undefined"
    说明: 不能在undefined上读取xxx属性
    原因: detailInfo初始值是{}, detailInfo.categoryView就是undefined  
          如果执行detailInfo.categoryView.category1Name就会报错了
    解决办法1:
        想办法让detailInfo.categoryView不是undefined ==> 利用vuex的getters来处理返回对象
    解决办法2:
        想办法当detailInfo.categoryView是undefined时, 不解析此块模板, 使用v-if来限制
        说明: v-show不可以(条件为false时, 依然会解析, 只是display为none不显示)
              v-if可以(条件为false时, 不会解析)

## 销售属性的功能(大家做)
    数据: spuSaleAttrList  ==> isChecked为"1"代表是默认的
    动态显示列表
    点击选中任意一个

## ImageList组件
    动态显示数据
        根据传的imgUrl和bigUrl属性来显示中图和大图
    放大镜的效果:
        布局: 
            左边: 
                <img>: 中图
                event <div>: 用来绑定响应mousemove
                mask <div>: 随着鼠标移动的遮罩   字的尺寸是div的1/4
            右边:
                <div>: 包含大图img, 与左侧尺寸一样
                <img>: 大图, 尺寸是中图的4倍
        事件处理:
            什么事件: mousemove
            给谁绑定: event <div>
            在事件回调函数中做什么?
                移动mask div: 指定其left和top样式: 
                    maskDiv.style.left = left + px
                    maskDiv.style.top = top + px
                移动大图 img: 指定其left和top样式: 
                    bigImg.style.left = -2*top + px
                    bigImg.style.top = -2*top + px
            计算最新的left值和top值
                依赖数据: 事件坐标offsetX和offsetY, mask的宽度maskWidth
                算法: 
                    left = offsetX - maskWidth/2
                    top = offsetY - maskWidth/2
                    限制left和top值只能在[0, maskWidth/2]

## 在组件中分发异步action之后, 如果知道是成功了还是失败了从而做相应处理?
    实现方式1: 利用回调函数数据
        component: dispatch('addToCart', {callback: this.callback}) // 携带回调函数数据
        action: 请求成功或失败后, 调用callback(errorMsg值) // 向组件传递需要显示的errorMsg
        component: 在callback中, 根据errorMsg参数是否有值来做相应处理

    实现方式2: 利用dispatch()的promise返回值
        前置知识:
            async函数执行的返回值是一个promise, 且promise的结果由函数体的结果决定
            执行dispatch()返回值为promise对象, 它就是async函数返回的promise
        
        component: dispatch('addToCart', {}) // 不用携带回调函数数据
        方式1:
            action: 
                请求操作成功: 返回''
                请求操作失败: 返回errorMsg
            component: 通过dispatch()返回的promise的成功value值来判断成功还是失败了
        方式2:
            action: 
                请求操作成功: 返回''
                请求操作失败: throw new Error(errorMsg值)
            component: 通过dispatch()返回的promise是成功的还是失败来判断操作是成功的还是失败

## day08

    跳转路由时携带数据
    纯浏览器端存储: sessionStorage和localStorage
    共同点:都是只保存在浏览器端,存储的是文本字符串(如果指定的是对象会自动转换为字符串保存),如果要保存对象/数组,应该转换为JSON字符串
    语法基本一样
    不同点:
    sessionStorage:保存在浏览器运行的内存中,刷新浏览器数据还在,关闭浏览器会自动清除
    localStorage:保存在浏览器管理的本地文本中,无论刷新还是关闭浏览器还会存在,不自动清除

## 用于购物车请求相关的标识数据,用户临时Id/userTempId

    userTempId的作用
        在用户未登录前的身份标识,用于识别不同的浏览器访问
    userTempId的特点
        是一个随机唯一的字符串值:多个客户端(浏览器)之间不相同,同一个客户端如果产生多次也不同UUID,由浏览器端创建,每次请求都携带给服务器端,一旦产生,尽量不删除或修改,可以一直使用
    userTempId的创建与保存
        使用UUID库来创建: uuidv4()
        应用一打开就创建
        保存在哪?
            localStorage 目的:关闭浏览器还存在
            vuex的state中保存这个值:从localStorage中读取uuid值保存到state中 ==>减少从localstorage中读取的次数
    userTempId的使用
        每次请求都携带上userTempId: 使用axios的请求拦截器

## 对所有购物项实现全选和全不选

    在vue和原生的DOM中,input 輸入框
    在vue和原生DOM中, input输入框
    input事件: 在输入发生改变时实时触发
    change事件: 在失去焦点时才触发
    context对象的结构:
   {
      state,      // 等同于 `store.state`，若在模块中则为局部状态
      commit,     // 等同于 `store.commit`
      dispatch,   // 等同于 `store.dispatch`
      getters,    // 等同于 `store.getters`
    }
    `return Promise.all(promises)`利用Promise.all()来实现对多个异步操作的promise的管理
    这个异步action需要触发调用多个其它异步action
    几ge分发的所有异步action都成功了, 当前异步action才成功, 只要有一个失败了, 当前异步action就失败
