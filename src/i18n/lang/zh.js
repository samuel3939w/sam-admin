export default {
  login: {
    title: '用戶登入',
    loginBtn: '登入',
    usernameRule: '用戶名為必填項',
    passwordRule: '密碼不能少於6位',
    desc: `
    測試權限帳號：<br />
    提供三種權限帳號：<br />
    1. 超級管理員帳號： super-admin <br />
    2. 管理員帳號：admin <br />
    3. 測試可配置帳號：test <br />
    密碼統一為：123456 <br />
    <br />
    導入用戶帳號：<br />
    可使用導入的用戶名登入 <br />
    密碼統一為：123456  <br />
    <b>注意：導入用戶區分中英文庫！！！！</b>
    `
  },
  route: {
    profile: '個人中心',
    user: '用戶',
    excelImport: 'Excel導入',
    userManage: '員工管理',
    userInfo: '員工訊息',
    roleList: '角色列表',
    permissionList: '權限列表',
    article: '文章',
    articleRanking: '文章排名',
    articleCreate: '創建文章',
    articleDetail: '文章詳情',
    articleEditor: '文章編輯'
  },
  toast: {
    switchLangSuccess: '切換語言成功'
  },
  tagsView: {
    refresh: '刷新',
    closeRight: '關閉右側',
    closeOther: '關閉其他'
  },
  theme: {
    themeColorChange: '主題色更換',
    themeChange: '主題更換'
  },
  universal: {
    title:'提示',
    confirm: '確定',
    cancel: '取消'
  },
  navBar: {
    themeChange: '主題修改',
    headerSearch: '頁面搜索',
    screenfull: '全屏替換',
    lang: '國際化',
    guide: '功能引導',
    home: '首頁',
    course: '課程主頁',
    logout: '退出登入'
  },
  guide: {
    close: '關閉',
    next: '下一個',
    prev: '上一個',
    guideTitle: '引導',
    guideDesc: '打開引導功能',
    hamburgerTitle: '漢堡按鈕',
    hamburgerDesc: '打開和關閉左側菜單',
    breadcrumbTitle: '麵包屑',
    breadcrumbDesc: '指定當前頁面位置',
    searchTitle: '搜索',
    searchDesc: '頁面鍵接搜索',
    fullTitle: '全屏',
    fullDesc: '頁面顯示切換',
    themeTitle: '主題',
    themeDesc: '更換項目主題',
    langTitle: '國際化',
    langDesc: '語言切換',
    tagTitle: '標籤',
    tagDesc: '已打開頁面標籤',
    sidebarTitle: '菜單',
    sidebarDesc: '項目功能菜單'
  },
  profile: {
    muted: '《vue3 改寫 vue-element-admin，實現後台前端綜合解決方案》項目演示',
    introduce: '介紹',
    projectIntroduction: '項目介紹',
    projectFunction: '項目功能',
    feature: '功能',
    chapter: '章節',
    author: '作者',
    name: 'Sam',
    job: '一個前端工程師',
    Introduction:
      '剛入行的初級工程師'
  },
  userInfo: {
    print: '打印',
    title: '員工訊息',
    name: '姓名',
    sex: '性別',
    nation: '民族',
    mobile: '手機號碼',
    province: '居住地',
    date: '入職時間',
    remark: '備註',
    address: '聯繫地址',
    experience: '經歷',
    major: '專業',
    glory: '榮耀',
    foot: '簽字：___________日期:___________'
  },
  uploadExcel: {
    upload: '點擊上傳',
    drop: '將文件拖到此處'
  },
  excel: {
    importExcel: 'excel 導入',
    exportExcel: 'excel 導出',
    exportZip: 'zip 導出',
    name: '姓名',
    mobile: '聯繫方式',
    avatar: '頭像',
    role: '角色',
    openTime: '開通時間',
    action: '操作',
    show: '查看',
    showRole: '角色',
    defaultRole: '員工',
    remove: '刪除',
    removeSuccess: '刪除成功',
    title: '導出為 excel',
    placeholder: 'excel 文件名稱',
    defaultName: '員工管理表',
    close: '取 消',
    confirm: '導 出',
    importSuccess: ' 條員工數據導入成功',
    dialogTitle1: '確定要刪除用戶 ',
    dialogTitle2: ' 嗎？',
    roleDialogTitle: '配置角色'
  },
  role: {
    buttonTxt: '新增角色',
    index: '序號',
    name: '名稱',
    desc: '描述',
    action: '操作',
    assignPermissions: '分配權限',
    removeRole: '刪除角色',
    dialogTitle: '新增角色',
    dialogRole: '角色名稱',
    dialogDesc: '角色描述',
    updateRoleSuccess: '用戶角色更新成功'
  },
  permission: {
    name: '權限名稱',
    mark: '權限標示',
    desc: '權限描述'
  },
  article: {
    ranking: '排名',
    title: '標題',
    author: '作者',
    publicDate: '發布時間',
    desc: '內容簡介',
    action: '操作',
    dynamicTitle: '動態展示',
    show: '查看',
    remove: '刪除',
    edit: '編輯',
    dialogTitle1: '確定要刪除文章 ',
    dialogTitle2: ' 嗎？',
    removeSuccess: '文章刪除成功',
    titlePlaceholder: '請輸入文章標題',
    markdown: 'markdown',
    richText: '富文本',
    commit: '提交',
    createSuccess: '文章創建成功',
    editorSuccess: '文章修改成功',
    sortSuccess: '文章排名修改成功'
  }
}
