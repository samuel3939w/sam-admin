<template>
  <div @click="onToggle">
    <SvgIcon id="guide-full" :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" />
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

// 切換全屏方法
const onToggle = () => {
  isFullscreen.value = isFullscreen.value === false ? true : false
  screenfull.toggle()
}

// 監聽screenfull的變化
const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}

// on: 綁定監聽
onMounted(() => {
  screenfull.on('change', change)
})

// off: 取消監聽
onUnmounted(() => {
  screenfull.off('change', change)
})
</script>
<style scoped lang='scss'>
</style>
