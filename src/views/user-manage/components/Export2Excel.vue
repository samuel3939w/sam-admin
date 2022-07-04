<template>
  <el-dialog
    :title="$t('msg.excel.title')"
    :model-value="modelValue"
    @close="closed"
    width="30%"
  >
    <el-input
      v-model="excelName"
      :placeholder="$t('msg.excel.placeholder')"
    ></el-input>
    <template #footer>
      <el-button @click="closed">{{ $t('msg.excel.close') }}</el-button>
      <el-button :loading="loading" type="primary" @click="onConfirm">{{
        $t('msg.excel.confirm')
      }}</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { getUserManageAllList } from '@/api/user-manage'
import { dateFilter } from '@/filters'
import { watchSwitchLang } from '@/utils/i18n'
import { USER_RELATIONS } from '@/views/import/utils'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
})

const i18n = useI18n()
let exportDefaultName = i18n.t('msg.excel.defaultName')
const excelName = ref('')
excelName.value = exportDefaultName
watchSwitchLang(() => {
  exportDefaultName = i18n.t('msg.excel.defaultName')
  excelName.value = exportDefaultName
})

const emit = defineEmits(['update:modelValue'])

// 關閉
const closed = () => {
  emit('update:modelValue', false)
}

const loading = ref(false)

// 導出按鈕點擊事件
const onConfirm = async () => {
  loading.value = true
  // 數據
  const allUser = (await getUserManageAllList()).list
  // 導入工具包
  const excel = await import('@/utils/Export2Excel')
  const data = formatJson(USER_RELATIONS, allUser)

  excel.export_json_to_excel({
    // excel 表頭
    header: Object.keys(USER_RELATIONS),
    // excel 數據（二為數組結構）
    data,
    // 文件名稱
    filename: excelName.value || exportDefaultName
    // 是否自動列寬
    // autoWidth: true,
    // 文件類型
    // bookType: 'xlsx'
  })
  closed()
}

// 當我們使用 export_json_to_excel 的時候, 我們傳遞的data 數據, 它必須是一個二為數組
const formatJson = (headers, rows) => {
  return rows.map((item) => {
    return Object.keys(headers).map((key) => {
      if (headers[key] === 'role') {
        const roles = item[headers[key]]
        return JSON.stringify(roles.map((role) => role.title))
      }
      if (headers[key] === 'openTime') {
        return dateFilter(item[headers[key]])
      }
      return item[headers[key]]
    })
  })
}
</script>
<style scoped lang='scss'>
</style>
