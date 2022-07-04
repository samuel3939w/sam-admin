<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <!-- 面包屑的最后一项 -->
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可點擊項 -->
        <span class="no-redirect" v-if="index === breadcrumbData.length - 1">
          {{ generateTitle(item.meta.title) }}
        </span>
        <!-- 可點擊項 -->
        <span class="redirect" @click="onLinkClick(item)" v-else>
          {{ generateTitle(item.meta.title) }}
        </span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { generateTitle } from '@/utils/i18n'

const route = useRoute()

//生成數組數據
const breadcrumbData = ref([])
const getBreadcrumbData = () => {
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title
  )
}

//監聽路由變化時觸發
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true
  }
)

//處理點擊事件
const router = useRouter()
const onLinkClick = (item) => {
  router.push(item.path)
}

// 將來需要進行主題切換，所以這裡獲取一下動態樣式
const store = useStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.getters.cssVar.menuBg)
</script>
<style scoped lang='scss'>
.breadcrumb {
  display: inline-block;
  line-height: 50px;
  margin-left: 8px;
  font-size: 14px;
  ::v-deep .no-redirect {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
    cursor: pointer;
  }
  .redirect:hover {
    color: v-bind(linkHoverColor);
  }
}
</style>
