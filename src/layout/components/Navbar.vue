<template>
  <div class="navbar">
    <!-- 漢堡 -->
    <Hamburger class="hamburger-container" />
    <Breadcrumb id="guide-breadcrumb" class="breadcrumb-container" />
    <div class="right-menu">
      <Guide class="right-menu-item hover-effect"/>
      <HeaderSearch class="right-menu-item hover-effect" />
      <Screenfull class="right-menu-item hover-effect" />
      <ThemeSelect class="right-menu-item hover-effect" />
      <LangSelect class="right-menu-item hover-effect"></LangSelect>
      <!-- 頭像 -->
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <el-avatar
            shape="square"
            :size="40"
            :src="$store.getters.userInfo.avatar"
          ></el-avatar>
          <i class="el-icon-s-tools"></i>
        </div>
        <template #dropdown>
          <router-link to="/">
            <el-dropdown-item>{{ $t('msg.navBar.home') }}</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided @click="logout">{{
            $t('msg.navBar.logout')
          }}</el-dropdown-item>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import {} from 'vue'
import { useStore } from 'vuex'
import Hamburger from '@/components/Hamburger/index.vue'
import Breadcrumb from '@/components/Breadcrumb/index.vue'
import LangSelect from '@/components/LangSelect/index.vue'
import ThemeSelect from '@/components/ThemeSelect/index.vue'
import HeaderSearch from '@/components/HeaderSearch/index.vue'
import Screenfull from '@/components/Screenfull'
import Guide from '@/components/Guide/index.vue'

const store = useStore()
const logout = () => {
  store.dispatch('user/logout')
}
</script>
<style scoped lang='scss'>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    // hover動畫
    transition: background 0.5;
    &:hover {
      background: rgba(0, 0, 0, 0.1);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    align-items: center;
    float: right;
    padding-right: 16px;

    ::v-deep .right-menu-item {
      display: inline-block;
      padding: 0 18px 0 0;
      font-size: 24px;
      color: #5a5e66;
      vertical-align: text-bottom;
      &.hover-effect {
        cursor: pointer;
      }
    }

    ::v-deep .avatar-container {
      cursor: pointer;
      .avatar-wrapper {
        margin-top: 5px;
        position: relative;
        .el-avatar {
          --el-avatar-background-color: none;
          margin-right: 12px;
        }
      }
    }
  }
}
</style>
