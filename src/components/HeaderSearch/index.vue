<template>
  <div class="header-search" :class="{ show: isShow }">
    <svg-icon id="guide-search" class-name="search-icon" icon="search" @click.stop="onShowClick" />
    <el-select
      ref="headerSearchSelectRef"
      class="header-search-select"
      v-model="search"
      filterable
      default-first-option
      remote
      :remote-method="querySearch"
      placeholder="search"
      @change="onSelectChange"
    >
      <el-option
        v-for="option in searchOptions"
        :key="option.item.path"
        :label="option.item.title.join('>')"
        :value="option.item"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup>
import { filterRoutes } from '@/utils/route'
import { generateRoutes } from './FuseData'
import { computed, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Fuse from 'fuse.js'
import { watchSwitchLang } from '@/utils/i18n'

// 數據源
const router = useRouter()
let searchPool = computed(() => {
  const routes = filterRoutes(router.getRoutes())
  return generateRoutes(routes)
})

/**
 * 搜索庫相關
 */
let fuse
const initFuse = (searchPool) => {
  fuse = new Fuse(searchPool.value, {
    // 是否按優先級進行排序
    shouldSort: true,
    // 匹配長度超過這個值的才會被認為是匹配的
    minMatchCharLength: 1,
    // 將被搜索的鍵列表。 這支持嵌套路徑、加權搜索、在字符串和對象數組中搜索。
    // name：搜索的鍵
    // weight：對應的權重
    keys: [
      {
        name: 'title',
        weight: 0.7
      },
      {
        name: 'path',
        weight: 0.3
      }
    ]
  })
}
initFuse(searchPool)

// 控制 search 展示
const isShow = ref(false)
const onShowClick = () => {
  isShow.value = !isShow.value
}

/**
 * 監聽 search 打開，處理 close 事件
 */
watch(isShow, (val) => {
  if (val) {
    document.body.addEventListener('click', onClose)
  } else {
    document.body.removeEventListener('click', onClose)
  }
})

/**
 * 關閉 search 的處理事件
 */
const headerSearchSelectRef = ref(null)
const onClose = () => {
  headerSearchSelectRef.value.blur()
  isShow.value = false
  searchOptions.value = []
}

// search相關
const search = ref('')

// 搜索方法
const searchOptions = ref([])
const querySearch = (query) => {
  if (query !== '') {
    searchOptions.value = fuse.search(query)
  } else {
    searchOptions.value = []
  }
}
// 選中回調
const onSelectChange = (val) => {
  router.push(val.path)
}

watchSwitchLang(() => {
  searchPool = computed(() => {
    const routes = filterRoutes(router.getRoutes())
    return generateRoutes(routes)
  })
  initFuse(searchPool)
})
</script>
<style lang="scss" scoped>
.header-search {
  font-size: 0 !important;
  ::v-deep .search-icon {
    cursor: pointer;
    font-size: 18px;
    vertical-align: middle;
  }
  .header-search-select {
    font-size: 18px;
    transition: width 0.2s;
    width: 0;
    overflow: hidden;
    background: transparent;
    border-radius: 0;
    display: inline-block;
    vertical-align: middle;

    ::v-deep .el-input__inner {
      border-radius: 0;
      border: 0;
      padding-left: 0;
      padding-right: 0;
      box-shadow: none !important;
      border-bottom: 1px solid #d9d9d9;
      vertical-align: middle;
    }
  }
  &.show {
    .header-search-select {
      width: 210px;
      margin-left: 10px;
    }
  }
}
</style>
