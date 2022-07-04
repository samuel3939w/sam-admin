import { setItem, getItem } from '@/utils/storage'
import { LANG, TAGS_VIEW } from '@/constant'

export default {
  namespaced: true,
  state: {
    sidebarOpened: true,
    language: getItem(LANG) || 'zh',
    tagsViewList: getItem(TAGS_VIEW) || []
  },
  mutations: {
    triggerSidebarOpened(state) {
      state.sidebarOpened = !state.sidebarOpened
    },
    setLanguage(state, lang) {
      setItem(LANG, lang)
      state.language = lang
    },
    setTagsViewList(state, tag) {
      // 判斷是否重複添加tag
      const isFind = state.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      if (!isFind) {
        state.tagsViewList.push(tag)
        setItem(TAGS_VIEW, state.tagsViewList)
      }
    },
    // 為指定的tag修改title
    changeTagsView(state, { tag, index }) {
      state.tagsViewList[index] = tag
      setItem(TAGS_VIEW, state.tagsViewList)
    },
    /**
     * 刪除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(state, payload) {
      if (payload.type === 'index') {
        state.tagsViewList.splice(payload.index, 1)
        setItem(TAGS_VIEW,state.tagsViewList)
      } else if (payload.type === 'other') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )

        state.tagsViewList.splice(0, payload.index)
        setItem(TAGS_VIEW,state.tagsViewList)
      } else if (payload.type === 'right') {
        state.tagsViewList.splice(
          payload.index + 1,
          state.tagsViewList.length - payload.index + 1
        )
        setItem(TAGS_VIEW,state.tagsViewList)
      }
    }
  }
}
