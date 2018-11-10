<template>
  <div class="nav-menu">
    <img :src="logoImg" class="logo-box">
    <div class="title-box">
      <span style="font-size:35px">
        XX居
      </span>
    </div>
    <el-menu :default-active="activeIndex" class="el-menu-demo menu-box" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">处理中心</el-menu-item>
      <el-submenu index="2">
        <template slot="title">我的工作台</template>
        <el-menu-item index="2-1">选项1</el-menu-item>
        <el-menu-item index="2-2">选项2</el-menu-item>
        <el-menu-item index="2-3">选项3</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title">选项4</template>
          <el-menu-item index="2-4-1">选项1</el-menu-item>
          <el-menu-item index="2-4-2">选项2</el-menu-item>
          <el-menu-item index="2-4-3">选项3</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3" disabled>消息中心</el-menu-item>
      <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
    <div class="line"/>
  </div>
</template>

<script>
export default {
  name: 'NavMenu',
  data() {
    return {
      logoImg: require('@/assets/facede/logo.gif'),
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    device() {
      return this.$store.state.app.device
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-menu {
  margin: 0 auto;
  height: inherit;
  width: 100%;
  background: gray;
  color: honeydew;
  padding-left: calc(100vw / 5);
  .logo-box {
    width: 100px;
    height: 100%;
    float: left;
  }
  .title-box {
    float: left;
    margin-left: 5px;
    border-left: 2px solid greenyellow;
    height: 100%;
    padding-top: 17px;
  }
  .menu-box {
    float: left;
    margin-left: 25vw;
    height: 100%;
    el-menu-item {
      height: 100%;
    }
    el-menu {
      height: 100%;
    }
  }
}
</style>
