<template>
  <div class="facede-container">
    <nav-header/>
    {{ msg }}
  </div>
</template>
<script>
import { NavHeader } from './components'
export default {
  name: 'Facede',
  components: { NavHeader },
  data() {
    return {
      msg: 'This is facede page'
    }
  }
}
</script>
<style lang="scss" scoped>
.facede-container {
  background: rgb(238, 243, 228);
  height: 100%;
  width: 100%;
}
</style>
