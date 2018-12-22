<template>
  <div class="user-contain">
    <el-button @click="fetchData()">默认按钮</el-button>
    <template>
      <el-table :data="users" style="width: 100%">
        <el-table-column prop="userName" label="登录账号" width="180"/>
        <el-table-column prop="userDesc" label="角色" width="180"/>
        <el-table-column prop="userStatus" label="账户状态"/>
      </el-table>
    </template>
  </div>
</template>
<script>
import { queryAllUsers } from '@/api/admin/user'
export default {
  name: 'User',
  data() {
    return {
      users: [],
      dataLoading: true
    }
  },
  methods: {
    fetchData() {
      queryAllUsers().then(response => {
        this.users = response.data.users
        console.log(this.users)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

