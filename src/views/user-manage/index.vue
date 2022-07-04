<template>
  <div class="user-manage-container">
    <el-card class="header">
      <div>
        <el-button
          type="primary"
          @click="onImportExcelClick"
          v-permission="['importUser']"
          >{{ $t('msg.excel.importExcel') }}</el-button
        >
        <el-button type="success" @click="onToExcelClick">{{
          $t('msg.excel.exportExcel')
        }}</el-button>
      </div>
    </el-card>
    <!-- table -->
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <!-- 索引 -->
        <el-table-column label="#" type="index" />
        <!-- 姓名 -->
        <el-table-column
          prop="username"
          :label="$t('msg.excel.name')"
        ></el-table-column>
        <!-- 手機號 -->
        <el-table-column
          prop="mobile"
          :label="$t('msg.excel.mobile')"
        ></el-table-column>
        <!-- 頭像 -->
        <el-table-column :label="$t('msg.excel.avatar')" align="center">
          <template v-slot="{ row }">
            <el-image
              class="avatar"
              :src="row.avatar"
              :preview-src-list="[row.avatar]"
            ></el-image>
          </template>
        </el-table-column>
        <!-- 角色 -->
        <el-table-column :label="$t('msg.excel.role')">
          <template #default="{ row }">
            <div v-if="row.role && row.role.length > 0">
              <el-tag v-for="item in row.role" :key="item.id" size="small">
                {{ item.title }}
              </el-tag>
            </div>
            <div v-else>
              <el-tag size="small">
                {{ $t('msg.excel.defaultRole') }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <!-- 時間 -->
        <el-table-column :label="$t('msg.excel.openTime')">
          <template #default="{ row }">
            {{ $filters.dateFilter(row.openTime) }}
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column
          :label="$t('msg.excel.action')"
          fixed="right"
          width="300"
        >
          <template #default="{ row }">
            <el-button type="primary" @click="onShowClick(row._id)">{{
              $t('msg.excel.show')
            }}</el-button>
            <el-button
              type="info"
              @click="onShowRoleClick(row)"
              v-permission="['distributeRole']"
              >{{ $t('msg.excel.showRole') }}</el-button
            >
            <el-button
              type="danger"
              @click="onRemoveClick(row)"
              v-permission="['removeUser']"
              >{{ $t('msg.excel.remove') }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-size="size"
        :page-sizes="[2, 5, 10, 20]"
        layout="total,sizes,prev,pager,next,jumper"
        :total="total"
      ></el-pagination>
    </el-card>

    <Export2Excel v-model="exportToExcelVisible" />

    <RolesDialog
      v-model="roleDialogVisible"
      :userId="selectUserId"
      @updateRole="getListData"
    />
  </div>
</template>

<script setup>
import { deleteUser, getUserManageList } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage, ElMessageBox } from 'element-plus'
import { onActivated, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Export2Excel from './components/Export2Excel.vue'
import RolesDialog from './components/roles.vue'

//數據相關
const tableData = ref([])
const total = ref(0)
const page = ref(1)
const size = ref(2)
//獲取數據的方法
const getListData = async () => {
  const result = await getUserManageList({
    page: page.value,
    size: size.value
  })
  tableData.value = result.list
  total.value = result.total
}
getListData()
//監聽語言切換
watchSwitchLang(getListData)
onActivated(getListData)

const handleSizeChange = (currentSize) => {
  size.value = currentSize
  getListData()
}
const handleCurrentChange = (currentPage) => {
  page.value = currentPage
  getListData()
}

// excel導入按鈕點擊事件
const router = useRouter()
const onImportExcelClick = () => {
  router.push('/user/import')
}

/**
 * excel 導出點擊事件
 */
const exportToExcelVisible = ref(false)
const onToExcelClick = () => {
  exportToExcelVisible.value = true
}
/**
 * 查看按鈕點擊事件
 */
const onShowClick = (id) => {
  router.push(`/user/info/${id}`)
}

/**
 * 刪除按鈕點擊事件
 */
const i18n = useI18n()
const onRemoveClick = (row) => {
  ElMessageBox.confirm(
    i18n.t('msg.excel.dialogTitle1') +
      row.username +
      i18n.t('msg.excel.dialogTitle2'),
    { type: 'warning' }
  ).then(async () => {
    await deleteUser(row._id)
    ElMessage.success(i18n.t('msg.excel.removeSuccess'))
    // 重新渲染數據
    getListData()
  })
}

/**
 * 查看角色的點擊事件
 */
const roleDialogVisible = ref(false)
const selectUserId = ref('')
const onShowRoleClick = (row) => {
  roleDialogVisible.value = true
  selectUserId.value = row._id
}

// 保證每次打開重新獲取用戶角色數據
watch(roleDialogVisible, (val) => {
  if (!val) selectUserId.value = ''
})
</script>

<style lang="scss" scoped>
.user-manage-container {
  .header {
    margin-bottom: 22px;
    text-align: right;
  }
  ::v-deep .avatar {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  ::v-deep .el-tag {
    margin-right: 6px;
  }

  .pagination {
    margin-top: 20px;
    text-align: center;
  }
}
</style>