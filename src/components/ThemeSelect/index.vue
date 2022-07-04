<template>
  <el-dropdown
    v-bind="$attrs"
    trigger="click"
    class="theme"
    @command="handleSetTheme"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.themeChange')">
        <svg-icon id="guide-theme" icon="change-theme" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="color">
          {{ $t('msg.theme.themeColorChange') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- 彈出層 -->
  <div>
    <SelectColor v-model="selectColorVisible" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SelectColor from './components/SelectColor.vue'

// dialog
const selectColorVisible = ref(false)

const handleSetTheme = (command) => {
  selectColorVisible.value = true
}
</script>
<style scoped lang='scss'>
</style>
