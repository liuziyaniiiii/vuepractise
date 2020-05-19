<template>
  <div>
    <h2>BABA有存款: {{money}}</h2>
    <button @click="borrowMoney1(100)">找小明借钱100</button><br>
    <button @click="borrowMoney2(150)">找小红借钱150</button><br>
    <button @click="borrowMoney3(200)">找所有孩子借钱200</button><br>
    
    <br>
    <Son ref="son"/>

    <br>
    <Daughter ref="daughter"/>
  </div>
</template>

<script>
import Son from './Son'
import Daughter from './Daughter'

export default {
  name: 'ChildrenParentTest',
  data () {
    return {
      money: 1000
    }
  },

  methods: {
    /* 
    找小明借钱
    */
    borrowMoney1 (count) {
      // 得到son组件对象
      const son = this.$refs.son
      // 更新其内部的数据
        // 方式一: 直接更新
        // son.money -= count
        // 方式二: 调用其方法更新
        son.pullMoney(count)

      // 更新自身的数据
      this.money += count
    },

    /* 
    找小红借钱
    */
    borrowMoney2 (count) {
      // 得到daughter组件对象
      const daughter = this.$refs.daughter
      // 更新其内部的数据
        // 方式一: 直接更新
        // daughter.money -= count
        // 方式二: 调用其方法更新
        daughter.pullMoney(count)

      // 更新自身的数据
      this.money += count
    },

    /* 
    找所有孩子借钱
    */
    borrowMoney3 (count) {
      // 找到所有子组件对象的数组, 遍历每个孩子借钱
      this.$children.forEach(child => {
        child.pullMoney(count)
        this.money += count
      })
    }
    
  },

  components: {
    Son,
    Daughter
  }
}
</script>

<style>

</style>
