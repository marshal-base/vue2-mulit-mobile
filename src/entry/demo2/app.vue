<template>
  <div id="app">
    <keep-alive v-if="$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-else></router-view>
  </div>
</template>

<script>
export default {
  mounted() {
    // 更改主题样式颜色
    document.documentElement.style.setProperty('--theme-color', '#000')
  }
}
</script>

<style lang="less">
  #app {
    max-width: 500px;
    background: #fff;
    overflow-y: auto;
  }
</style>
