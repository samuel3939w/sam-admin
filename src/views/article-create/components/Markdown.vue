<template>
  <div class="markdown-container">
    <!-- 渲染區 -->
    <div id="markdown-box"></div>
    <!-- 按鈕 -->
    <div class="button">
      <el-button type="primary" @click="onSubmitClick"
        >{{ $t('msg.article.commit') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineProps, watch } from 'vue'
import MkEditor from '@toast-ui/editor'
import '@toast-ui/editor/dist/toastui-editor.css'
import '@toast-ui/editor/dist/i18n/zh-tw'
import { useStore } from 'vuex'
import { watchSwitchLang } from '@/utils/i18n'
import { commitArticle, editArticle } from './commit'

// Editor實例
let mkEditor
// 處理離開頁面切換語言導致 dom 無法被獲取
let el

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  detail: {
    type: Object
  }
})

const emits = defineEmits(['onSuccess'])

onMounted(() => {
  el = document.querySelector('#markdown-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  mkEditor = new MkEditor({
    el,
    //高度
    height: '500px',
    //樣式
    previewStyle: 'vertical',
    //國際化
    language: store.getters.language === 'zh' ? 'zh-TW' : 'en'
  })
  mkEditor.getMarkdown()
}

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = mkEditor.getHTML()
  mkEditor.destroy()
  initEditor()
  mkEditor.setHTML(htmlStr)
})

// 處理提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: mkEditor.getHTML()
    })
  } else {
    // 創建文章
    await commitArticle({
      title: props.title,
      content: mkEditor.getHTML()
    })
  }

  mkEditor.reset()
  emits('onSuccess')
}
// 編輯相關
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      mkEditor.setHTML(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang='scss'>
.markdown-container {
  .button {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
