<template>
  <a href="javascript:" :title="title">
    
    <el-button v-bind="$attrs" v-on="$listeners"></el-button>
  </a>
</template>

<script>
/* 对el-button进行二次封装, 实现使用按钮能有hover的文本提示 */
export default {
  props: ['title'],
  mounted () {
    console.log('HintButton', this.$attrs, this.$listeners)
  }
}
</script>

<style>

</style>