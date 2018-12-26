<template>
  <div class="right-role">{{ queryUserRoles() }}</div>
</template>

<script>
export default {
  name: 'ResourceRole',
  data() {
    return {
      roles: []
    }
  }, methods: {
    queryUserRoles() {
      this.roles = [1, 2, 3, 4, 5, 6, 7]
      return this.roles
    }
  }
}
</script>
<style scoped>
.right-role {
  width: 78%;
  height: 100%;
  float: right;
}
</style>
