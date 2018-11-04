<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <bread-crumb/>
    <el-dropdown class="avatar-container" trigger="click" placement="bottom">
      <span class="el-dropdown-link avatar-wrapper">
        <img class="user-avatar" src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif?imageView2/1/w/80/h/80" alt="">
        <i class="el-icon-arrow-down el-icon--right" />
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>
          <span @click="logOut">
            退出
          </span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import BreadCrumb from '@/components/BreadCrumb'
import Hamburger from '@/components/Hamburger'
export default {
  name: 'Navar',
  components: {
    BreadCrumb,
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('ToggleSideBar')
    },
    logOut() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .avatar-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 5px;
    margin-top: 5px;
    .avatar-wrapper {
      height: 45px;
    }
    .user-avatar {
      width: 40px;
      height: 40px;
      border-radius: 10px;
    }
  }
}
</style>
