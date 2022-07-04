<template>
  <div class="article-ranking-container">
    <el-card class="header">
      <div class="dynamic-box">
        <span class="title">{{ $t('msg.article.dynamicTitle') }}</span>
        <el-checkbox-group v-model="selectDynamicLabel">
          <el-checkbox
            v-for="(item, index) in dynamicData"
            :key="index"
            :label="item.label"
            >{{ item.label }}</el-checkbox
          >
        </el-checkbox-group>
      </div>
    </el-card>

    <el-card>
      <el-table ref="tableRef" :data="tableData" border>
        <el-table-column
          v-for="(item, index) in tableColumns"
          :key="index"
          :prop="item.prop"
          :label="item.label"
        >
          <template #default="{ row }" v-if="item.prop === 'publicDate'">
            {{ $filters.relativeTime(row.publicDate) }}
          </template>
          <template #default="{ row }" v-else-if="item.prop === 'action'">
            <el-button type="primary" size="small" @click="onShowClick(row)">
              {{ $t('msg.article.show') }}
            </el-button>
            <el-button type="danger" size="small" @click="onRemoveClick(row)">
              {{ $t('msg.article.remove') }}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[5, 10, 50, 100, 200]"
        :page-size="size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </el-card>
  </div>
</template>

<script setup>
import { deleteArticle, getArticleList } from '@/api/article'
import router from '@/router'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { dynamicData, selectDynamicLabel, tableColumns } from './dynamic/index'
import { tableRef, initSortable } from './sortable/index'

// 數據相關
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(10)

// 獲取數據的方法
const getListData = async () => {
  const result = await getArticleList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}

getListData()
watchSwitchLang(getListData)
onActivated(getListData)

// 初始化 sortable
onMounted(() => {
  initSortable(tableData, getListData)
})

// 查看點擊事件
const onShowClick = (row) => {
  router.push(`/article/${row._id}`)
}

// 刪除點擊事件
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.article.dialogTitle1') +
      row.title +
      i18n.t('msg.article.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await deleteArticle(row._id)
    ElMessage.success(i18n.t('msg.article.removeSuccess'))
    getListData()
  })
}

// size改變觸發
const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}

// 頁碼改變觸發
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}
</script>

<style lang="scss" scoped>
.article-ranking-container {
  .header {
    margin-bottom: 20px;
    .dynamic-box {
      display: flex;
      align-items: center;
      .title {
        margin-right: 20px;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }

  ::v-deep .el-table__row {
    cursor: pointer;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }

  ::v-deep .sortable-ghost {
    opacity: 0.6;
    color: #fff;
    background: #304156;
  }
}
</style>
