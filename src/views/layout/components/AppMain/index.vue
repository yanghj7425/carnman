<template>
  <el-main class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view/>
    </transition>
  </el-main>

</template>
<script>
export default {
  name: 'AppMain'
}
</script>

<style scoped>
.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  position: relative;
  overflow: hidden;
  background: greenyellow;
}
</style>

