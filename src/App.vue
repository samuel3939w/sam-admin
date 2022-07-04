<template>
  <el-config-provider :locale="store.getters.language === 'en' ? en : zhTw">
    <router-view />
  </el-config-provider>
</template>

<script setup>
import { useStore } from 'vuex'
import zhTw from 'element-plus/lib/locale/lang/zh-tw'
import en from 'element-plus/lib/locale/lang/en'
import { generateNewStyle, writeNewStyle } from './utils/theme'
import { watchSwitchLang } from './utils/i18n'

const store = useStore()
generateNewStyle(store.getters.mainColor).then((newStyle) => {
  writeNewStyle(newStyle)
})

watchSwitchLang(() => {
  if (store.getters.token) {
    store.dispatch('user/getUserInfo')
  }
})
</script>

<style>
</style>
