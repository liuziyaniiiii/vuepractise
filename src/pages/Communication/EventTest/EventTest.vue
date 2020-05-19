<template>
  <div>
    <h1>EventTest组件</h1>
    <!-- 
    原生DOM事件
      绑定原生DOM事件监听的2种情况
        1. 在html标签上绑定DOM事件名的监听
        2. 在组件标签上绑定DOM事件名的监听, 事件绑定在组件的根标签上
      当用户操作对应的界面时, 浏览器就会自动创建并封闭包含相关数据的事件对象, 分发对应的事件, 从而触发事件监听回调函数调用
      事件对象event, 本质是 "事件数据对象"
      event对象内的数据属性: target / offsetX / offsetY / keyCode等
      $event就是浏览器创建的event对象, 默认传递给事件监听回调函数的就是它
    -->
    <button @click="test1">测试绑定原生DOM事件监听</button> &nbsp;&nbsp;
    <button @click="test1($event)">测试绑定原生DOM事件监听</button>
    <br>
    <br>
    <Event1 @click.native="test2"/>

    <br>
    <br>
    <!-- 
    vue自定义事件
      绑定vue自定义事件监听
        1. 只能在组件标签上绑定
        2. 事件名是任意的, 可以与原生DOM事件名相同
      只当执行$emit('自定义事件名', data)时分发自定义事件, 才会触发自定义事件监听函数调用
      $event: 就是分发自定义事件时指定的data数据
      $event可以是任意类型, 甚至可以没有
    -->
    <Event2 @click="test3" @xxx="test4"/>
    <br>
    <br>
    <Event2  @xxx="test4($event)"/>

    <!-- 
      vue的自定义事件用来: 用来实现子向父组件通信, 功能相当于函数类型的props
    -->
  </div>
</template>

<script type="text/ecmascript-6">
  import Event1 from './Event1.vue'
  import Event2 from './Event2.vue'

  export default {
    name: 'EventTest',

    components: {
      Event1,
      Event2,
    },

    methods: {
     test1 (event) {
       alert(event.target.innerHTML)
     },

     test2 (event) {
       alert('test2 --' + event.target.innerHTML)
     },

     test3 (data) {
       alert('test3()--' + data)
     },

     test4 (data) {
       alert('test4()--' + data.name)
     },

     xxx (data) {
       alert('test4()--' + data.name)
     }
    }
  }
</script>
