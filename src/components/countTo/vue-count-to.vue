<template>
  <span ref="countup" />
</template>

<script>
import CountUp from 'countup.js'
export default {
  name: 'CountTo',
  props: {
    start: {
      type: Number,
      default: 0
    },
    end: {
      type: Number,
      default: 2018
    },
    decimal: {
      type: Number,
      default: 2.5
    },
    duration: {
      type: Number,
      default: 2.5
    }
  },
  data() {
    return {
      numMain: {}
    }
  },
  mounted() {
    this.initCountUp()
  },
  methods: {
    initCountUp() {
      this.numMain = new CountUp(
        this.$refs.countup,
        this.start,
        this.end,
        this.decimal,
        this.duration,
        this.options
      )
      this.numMain.start()
    }
  }
}
</script>
