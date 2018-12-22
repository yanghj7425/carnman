<template>
  <div>
    <nav-header/>
    {{ msg }}
  </div>
</template>
<script>
import { NavHeader } from './components'
export default {
  name: 'Client',
  components: { NavHeader },
  data() {
    return {
      msg: 'This is facede page'
    }
  }
}
</script>
<style lang="scss">
</style>
