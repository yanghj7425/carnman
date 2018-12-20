<template>
  <div class="user-contain">
    <el-button @click="fetchData()">默认按钮</el-button>
    {{ users }}
  </div>
</template>
<script>
import { queryAllUsers } from '@/api/user'
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

