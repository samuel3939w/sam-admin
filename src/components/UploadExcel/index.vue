<template>
  <div class="upload-excel">
    <div class="btn-upload">
      <el-button :loading="loading" type="primary" @click="handleUpload">{{
        $t('msg.uploadExcel.upload')
      }}</el-button>
    </div>

    <input
      ref="excelUploadInput"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleChange"
    />
    <!-- https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_Drag_and_Drop_API -->
    <div
      class="drop"
      @drop.stop.prevent="handleDrop"
      @dragover.stop.prevent="handleDragover"
      @dragenter.stop.prevent="handleDragover"
    >
      <i class="el-icon-upload" />
      <span>{{ $t('msg.uploadExcel.drop') }}</span>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'
import { Promise } from 'q'
import { ref, defineProps } from 'vue'
import XLSX from 'xlsx'
import { getHeaderRow, isExcel } from './utils'

const props = defineProps({
  // 上傳之前的回調
  beforeUpload: Function,
  // 上傳成功的回調
  onSuccess: Function
})

// 點擊上傳觸發
const loading = ref(false)
const excelUploadInput = ref(null)

const handleUpload = () => {
  excelUploadInput.value.click()
}
const handleChange = (e) => {
  const files = e.target.files
  const rawFile = files[0]
  if (!rawFile) return
  upload(rawFile)
}

// 拖拽上傳
const handleDrop = (e) => {
  // 上傳中
  if (loading.value) return
  const files = e.dataTransfer.files
  if (files.length !== 1) {
    ElMessage.error('必須要有一個文件')
    return
  }
  const rawFile = files[0]
  if (!isExcel(rawFile)) {
    ElMessage.error('文件必須是 xlsx, xls, .csv 格式')
    return
  }
  if (!rawFile) return
  upload(rawFile)
}
const handleDragover = (e) => {
  e.dataTransfer.dropEffect = 'copy'
}

/**
 * 觸發上傳事件
 */
const upload = (rawFile) => {
  excelUploadInput.value.value = null
  // 如果沒有指定上傳前回調的話
  if (!props.beforeUpload) {
    readerData(rawFile)
    return
  }
  // 如果用戶指定了上傳前的回調, 那麼只有返回 true 的時候, 才會執行對應的後續操作
  const before = props.beforeUpload(rawFile)
  if (before) {
    readerData(rawFile)
  }
}

/**
 * 讀取數據(異步)
 */
const readerData = (rawFile) => {
  loading.value = true
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    // 讀取操作完成時觸發
    reader.onload = (e) => {
      // 1. 獲取到解析後的數據
      const data = e.target.result
      // 2. 利用XLSX對數據進行解析
      const workbook = XLSX.read(data, { type: 'array' })
      // 3. 獲取第一章表格(工作簿)名稱
      const firstSheetName = workbook.SheetNames[0]
      // 4. 讀取 sheet1 (第一章表格)的數據
      const workSheet = workbook.Sheets[firstSheetName]
      // 5. 解析數據表頭
      const header = getHeaderRow(workSheet)
      // 6. 解析數據體
      const results = XLSX.utils.sheet_to_json(workSheet)
      // 7. 傳入解析之後的數據
      generateData({ header, results })
      // 8. 處理 loading
      loading.value = false
      // 9. 成功回調
      resolve()
    }

    reader.readAsArrayBuffer(rawFile)
  })
}

// 根據導入內容, 生成數據v
const generateData = (excelData) => {
  props.onSuccess && props.onSuccess(excelData)
}
</script>
<style scoped lang='scss'>
.upload-excel {
  display: flex;
  justify-content: center;
  margin-top: 100px;
  .excel-upload-input {
    display: none;
    z-index: -9999;
  }
  .btn-upload,
  .drop {
    border: 1px dashed #bbb;
    width: 350px;
    height: 160px;
    text-align: center;
    line-height: 160px;
  }
  .drop {
    line-height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    color: #bbb;
    i {
      font-size: 60px;
      display: block;
    }
  }
}
</style>
