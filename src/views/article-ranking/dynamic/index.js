import { watchSwitchLang } from '@/utils/i18n'
import { ref, watch } from 'vue'
import getDynamicData from './DynamicData'

// 暴露出動態列數據
export const dynamicData = ref(getDynamicData())

// 監聽 語言變化
watchSwitchLang(() => {
  // 重新獲取國際化的值
  dynamicData.value = getDynamicData()
  // 重新處理被勾選的列數據
  initSelectDynamicLabel()
})

// 創建被勾選的動態列數據
export const selectDynamicLabel = ref([])
// 默認全部勾選
const initSelectDynamicLabel = () => {
  selectDynamicLabel.value = dynamicData.value.map((item) => item.label)
}
initSelectDynamicLabel()

// 聲明 table 的列數據
export const tableColumns = ref([])
// 監聽選中項的變化，根據選中項動態變化 table 列數據的值
watch(
  selectDynamicLabel,
  (val) => {
    tableColumns.value = []
    // 遍歷選中項
    const selecData = dynamicData.value.filter((item) => {
      return val.includes(item.label)
    })
    tableColumns.value.push(...selecData)
  },
  {
    immediate: true
  }
)
