<template>
  <div class="article-create">
    <el-card>
      <el-input
        class="title-input"
        :placeholder="$t('msg.article.titlePlaceholder')"
        v-model="title"
        maxlength="20"
        clearable
      />
      <el-tabs v-model="activeName">
        <el-tab-pane :label="$t('msg.article.markdown')" name="markdown">
          <Markdown :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
        <el-tab-pane :label="$t('msg.article.richText')" name="editor">
          <Editor :title="title" :detail="detail" @onSuccess="onSuccess" />
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script setup>
import { onActivated, ref } from 'vue'
import Markdown from './components/Markdown.vue'
import Editor from './components/Editor.vue'
import { useRoute } from 'vue-router'
import { articleDetail } from '@/api/article'

const activeName = ref('markdown')
const title = ref('')

// 創建成功
const onSuccess = () => {
  title.value = ''
}

// 處理編輯相關
const route = useRoute()
const articleId = route.params.id
const detail = ref({})
const getArticleDetail = async () => {
  detail.value = await articleDetail(articleId)
  // 標題賦值
  title.value = detail.value.title
}
onActivated(() => {
  if (articleId) {
    getArticleDetail()
  }
})
</script>

<style lang="scss" scoped>
.title-input {
  margin-bottom: 20px;
}
</style>
