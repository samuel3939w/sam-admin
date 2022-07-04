<template>
  <div
    class="app-wrapper"
    :class="[$store.getters.sidebarOpened ? 'openSidebar' : 'hideSidebar']"
  >
    <!-- 左側 menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: $store.getters.cssVar.menuBg }"
    >
    </sidebar>
    <div class="main-container">
      <div class="fixed-header">
        <!-- 頂部 navbar -->
        <navbar />
        <!-- tags -->
        <tags-view id="guide-tags" />
      </div>
      <!-- 內容區 -->
      <app-main></app-main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar/index.vue'
import AppMain from './components/AppMain.vue'
import Navbar from './components/Navbar.vue'
import variables from '@/styles/variables.scss'
import {} from 'vue'
import TagsView from '@/components/TagsView/index.vue'
</script>

<style scoped lang='scss'>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.scss';

.app-wrapper {
  @include relative;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
