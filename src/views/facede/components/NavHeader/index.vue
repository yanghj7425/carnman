<template>
  <div class="nav-header-container">
    <div class="nav-top-container">
      <div class="top-left-name" >
        <div class="inner-top-center">
          欢迎来到：    {{ companyName }}
        </div>
      </div>
      <div class="top-right-tel">
        <div class="inner-top-center">
          咨询热线：  {{ companyTel }}
        </div>
      </div>
    </div>
    <div class="menu-container">
      <nav-menu/>
    </div>

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
$headerFontSize: 0.6vw;
$navTopHeight: 23px;
.nav-header-container {
  background: whitesmoke;
  height: 105px;
  overflow: hidden;
  width: 100%;
  .menu-container {
    height: 75px;
  }
  .nav-top-container {
    height: $navTopHeight;
    position: relative;
    font-size: $headerFontSize;
    color: aliceblue;
    text-align: center;
    background: #032b53;
    .top-left-name {
      width: 55%;
      float: left;
    }
    .top-left-name:hover {
      color: rgb(248, 198, 132);
    }
    .top-right-tel {
      width: 45%;
      float: left;
    }
    .inner-top-center {
      margin: 0 auto;
      height: $navTopHeight;
      white-space: nowrap;
      display: flex;
      -webkit-align-items: center;
      align-items: center;
      -webkit-justify-content: center;
      justify-content: center;
    }
  }
}
</style>
