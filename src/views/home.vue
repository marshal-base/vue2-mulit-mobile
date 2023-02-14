<template>
  <div>
    demo1
  </div>
</template>

<script>
export default {
  name: 'demo1',
  mounted() {
    this.$store.dispatch('updateUserName', 123).then((res) => {
      console.log(this.$store.state)
    })
  }
}
</script>

<style lang="less" scoped>
div {
  display: flex;
}
</style>
