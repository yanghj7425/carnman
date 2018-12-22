<template>
  <div class="header-area">
    <div class="header-top">
      <div class="top-left">
        <p>
          <span>欢迎来到:</span>
          {{ companyName }}
        </p>
      </div>
      <div class="top-right">
        <div class="inner-top-center">咨询热线： {{ companyTel }}</div>
      </div>
    </div>
    <!-- <div class="menu-container">
      <nav-menu/>
    </div>-->
  </div>
</template>

<script>
import navMenu from './NavMenu'
import { Message } from 'element-ui'
export default {
  name: 'NavHeader',
  components: { navMenu },
  data() {
    return {
      companyName: '这里是一个还没有想好的名字',
      companyTel: '13645464654654',
      msg: 'This is facede header'
    }
  },
  methods: {
    showDetail: function() {
      Message({
        message: this.msg,
        type: 'error',
        duration: 5 * 1000 * 10
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/client/index.scss"; // global css
</style>
