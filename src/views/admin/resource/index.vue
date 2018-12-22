<template>
  <div>
    <el-button @click="fetchData()">按钮</el-button>
    <el-table :data="list" style="width: 80%">
      <el-table-column prop="accessResRole" label="角色" width="180"/>
      <el-table-column prop="accessResUrl" label="资源URL" width="180"/>
    </el-table>
  </div>
</template>
<script>
import { queryAllResInfo } from '@/api/admin/resource'
export default {
  name: 'Resource',
  data() {
    return {
      list: [],
      dateLoading: true
    }
  }, methods: {
    fetchData() {
      queryAllResInfo().then(response => {
        this.list = response.data.list
        console.log(this.list)
      }).catch(error => {
        console.log(error) // for debug
      })
    }
  }
}
</script>
