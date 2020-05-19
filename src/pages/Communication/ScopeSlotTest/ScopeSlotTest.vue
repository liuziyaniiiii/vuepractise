<template>
  <div>
    <!-- 
      需求: 封装列表List组件
        效果一: 显示TODO列表时, 已完成的TODO为绿色
        效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配
     -->
    <h2>效果一: 显示TODO列表时, 已完成的TODO为绿色</h2>
    <List :data="todos">
      <!-- 
        <template>的标签体内容会传递给子组件的<slot>
        slot-scope: 用来指定接收子组件传递过<slot>的标签属性的所有属性数据
        scope的结构:
          {
            row: 当前行的数据    {id: 1, text: 'AAA', isComplete: false}
            $index: 下标值
          }
       -->
      <template slot-scope="scope">
        <span v-if="scope.row.isComplete" style="color: green;">{{scope.row.text}}</span>
        <span v-else>{{scope.row.text}}</span>
      </template>
    </List>
    
    <!-- 
      问题: 数组数据并不在父组件中遍历, 无法得到某一行的数据, 就无法向子组件List传递特定的列表项内容结构      
    -->
    
    <br>
    <br>

    <h2>效果二: 显示TODO列表时, 带序号, TODO的颜色为蓝绿搭配</h2>
    <List :data="todos">
      <template slot-scope="{row, $index}">
        <span>{{$index+1}}</span> &nbsp;&nbsp;
        <span :style="{color: $index%2===1 ? 'blue' : 'green'}" >{{row.text}}</span>
      </template>
    </List>
  </div>
</template>

<script type="text/ecmascript-6">
  import List from './List'
  export default {
    name: 'ScopeSlotTest',
    data () {
      return {
        todos: [
          {id: 1, text: 'AAA', isComplete: false},
          {id: 2, text: 'BBB', isComplete: true},
          {id: 3, text: 'CCC', isComplete: true},
          {id: 4, text: 'DDD', isComplete: false},
        ]
      }
    },

    components: {
      List
    }
  }
</script>
