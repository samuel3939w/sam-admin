<template>
  <div class="">
    <el-card>
      <el-table
        :data="allPermissions"
        style="width: 100%"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      >
        <el-table-column
          prop="permissionName"
          :label="$t('msg.permission.name')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionMark"
          :label="$t('msg.permission.mark')"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="permissionDesc"
          :label="$t('msg.permission.desc')"
          width="180"
        ></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { watchSwitchLang } from '@/utils/i18n'
import { ref } from 'vue'

/**
 * 權限分級：
 * 1. 一級權限為頁面權限
 *  permissionMark 對應 路由名稱
 * 2. 二級權限為功能權限
 *  permissionMark 對應 功能權限表
 */
// 所有權限
const allPermissions = ref([])
const getPermissionsList = async () => {
  allPermissions.value = await permissionList()
}
getPermissionsList()
watchSwitchLang(getPermissionsList)
</script>

<style lang="scss" scoped></style>
