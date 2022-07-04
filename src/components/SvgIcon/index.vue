<template>
  <div
    v-if="isExternal"
    :style="styleExternalIcon"
    class="svg-external-icon svg-icon"
    :class="className"
  />
  <svg v-else class="svg-icon" :class="className" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script setup>
import { isExternal as external } from '@/utils/validate'
import { defineProps, computed } from 'vue'
const props = defineProps({
  // icon圖標
  icon: {
    type: String,
    required: true
  },
  //  圖標類名
  className: {
    type: String,
    default: ''
  }
})

/**
 * 判斷當前圖標是否為外部圖標
 */
const isExternal = computed(() => external(props.icon))
/**
 * 外部圖標樣式
 */
const styleExternalIcon = computed(() => ({
  mask: `url(${props.icon}) no-repeat 50% 50%`,
  '-webkit-mask': `url(${props.icon}) no-repeat 50% 50%`
}))
/**
 * 內部圖標
 */
const iconName = computed(() => `#icon-${props.icon}`)
</script>
<style scoped lang='scss'>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

.svg-external-icon {
  background-color: currentColor;
  mask-size: cover !important;
  display: inline-block;
}
</style>
