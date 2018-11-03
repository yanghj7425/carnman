<template>
  <el-menu class="navbar" mode="horizontal">
    <bread-crumb/>
  </el-menu>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb'
export default {
  name: 'Navar',
  components: {
    BreadCrumb
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
}
</style>
