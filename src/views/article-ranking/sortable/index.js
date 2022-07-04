import { articleSort } from '@/api/article'
import { ElMessage } from 'element-plus'
import Sortable from 'sortablejs'
import { ref } from 'vue'
import i18n from '@/i18n'

export const tableRef = ref(null)

export const initSortable = (tableData, cb) => {
  // 1. 要拖拽的元素
  const el = tableRef.value.$el.querySelectorAll(
    '.el-table__body > tbody'
  )[0]

  // 2. 配置對象
  Sortable.create(el, {
    // 拖拽時的類名
    ghostClass: 'sortable-ghost',
    // 拖拽結束的回調方法
    async onEnd(event) {
      const { newIndex, oldIndex } = event
      // 修改數據
      await articleSort({
        initRanking: tableData.value[oldIndex].ranking,
        finalRanking: tableData.value[newIndex].ranking
      })
      ElMessage.success(i18n.global.t('msg.article.sortSuccess'))
      // 直接重新獲取數據無法刷新 table!!
      tableData.value = []
      // 重新獲取數據
      cb && cb()
    }
  })
}
