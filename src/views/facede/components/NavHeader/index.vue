<template>
  <div class="nav-header-container">
    <div class="nav-top-container">
      <div class="top-left" >
        <div class="inner-top-center">
          ddd
        </div>
      </div>
      <div class="top-right">
        <div class="inner-top-center">
          LLL
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'NavHeader',
  data() {
    return {
      msg: 'This is facede header'
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-header-container {
  height: 105px;
  width: 100%;
  .nav-top-container {
    height: 30px;
    position: relative;
    font-size: 20px;
    text-align: center;
    background: #409eff;
    .top-left {
      width: 65%;
      float: left;
    }
    .top-right {
      width: 35%;
      float: left;
    }
    .inner-top-center {
      width: 50%;
      height: 30px;
      background: red;
      margin: 0 auto;
    }
  }
}
</style>
