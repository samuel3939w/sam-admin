<template>
  <!-- element icon -->
  <el-icon v-if="ifShowElIcon" :size="16">
    <component v-bind:is="elElementIcon"></component>
  </el-icon>
  <!-- 非 element icon -->
  <svg-icon v-else :icon="icon"></svg-icon>
  <!-- 文本 -->
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps, ref } from 'vue'
import { generateTitle } from '@/utils/i18n'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
})
// 判斷是否為element plus icon
const ifShowElIcon = props.icon.includes('el-icon')
let elElementIcon = ref('')
if (ifShowElIcon) {
  elElementIcon.value = props.icon.split('-')[2]
}
</script>
<style scoped lang='scss'>
</style>
