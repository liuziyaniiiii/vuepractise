<template>
  <ul>
    <!-- 
      问题: 当前组件不能决定列表的每页要显示的内容结构, 应该由父组件来决定
    -->
    <li v-for="(item, index) in data" :key="index">
      <!-- 由父组件传递内容结构进来 -->
      <slot :row="item" :$index="index">  <!-- slot的属性会自动传递给父组件 -->
      </slot>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'List',
  props: {
    data: Array
  }
}
</script>