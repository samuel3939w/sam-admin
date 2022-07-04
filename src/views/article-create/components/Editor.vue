<template>
  <div class="editor-container">
    <!-- 渲染區 -->
    <div id="editor-box"></div>
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
import E from 'wangeditor'
import i18next from 'i18next'
import { useStore } from 'vuex'
import { commitArticle, editArticle } from './commit'
import { watchSwitchLang } from '@/utils/i18n'

// Editor實例
let editor
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
  el = document.querySelector('#editor-box')
  initEditor()
})

const store = useStore()
const initEditor = () => {
  editor = new E(el)
  editor.config.zIndex = 1
  // 菜單欄提示
  editor.config.showMenuTooltips = true
  editor.config.menuTooltipPosition = 'down'
  // 國際化相關處理
  editor.config.lang = store.getters.language === 'zh' ? 'zh-CN' : 'en'
  editor.i18next = i18next
  editor.create()
}

watchSwitchLang(() => {
  if (!el) return
  const htmlStr = editor.txt.html()
  editor.destroy()
  initEditor()
  editor.txt.html(htmlStr)
})

// 處理提交
const onSubmitClick = async () => {
  if (props.detail && props.detail._id) {
    await editArticle({
      id: props.detail._id,
      title: props.title,
      content: editor.txt.html()
    })
  } else {
    // 創建文章
    await commitArticle({
      title: props.title,
      content: editor.txt.html()
    })
  }

  editor.txt.html('')
  emits('onSuccess')
}
// 編輯相關
watch(
  () => props.detail,
  (val) => {
    if (val && val.content) {
      editor.txt.html(val.content)
    }
  },
  {
    immediate: true
  }
)
</script>
<style scoped lang='scss'>
.editor-container {
  .button {
    margin-top: 20px;
    text-align: right;
  }
}
</style>
