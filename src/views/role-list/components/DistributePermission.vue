<template>
  <el-dialog
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
    @close="closed"
  >
    <el-tree
      ref="treeRef"
      :data="allPermission"
      :props="defaultProps"
      node-key="id"
      show-checkbox
      check-strictly
      default-expand-all
    ></el-tree>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">{{
          $t('msg.universal.confirm')
        }}</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { permissionList } from '@/api/permission'
import { distributePermission, rolePermission } from '@/api/role'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { defineProps, defineEmits, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  roleId: {
    type: String,
    required: true
  }
})
const emits = defineEmits(['update:modelValue'])

/**
  確定按鈕點擊事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  await distributePermission({
    roleId: props.roleId,
    permissions: treeRef.value.getCheckedKeys()
  })
  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  closed()
}

/**
 * 關閉
 */
const closed = () => {
  emits('update:modelValue', false)
}

// 所有權限
const allPermission = ref([])
const getPermissiontList = async () => {
  allPermission.value = await permissionList()
}
getPermissiontList()
watchSwitchLang(getPermissiontList)

// 屬性結構
const defaultProps = {
  children: 'children',
  label: 'permissionName'
}

// ref
const treeRef = ref(null)

// 當前角色的權限
const getRolePermission = async () => {
  const checkKeys = await rolePermission(props.roleId)
  treeRef.value.setCheckedKeys(checkKeys)
}

watch(
  () => props.roleId,
  (val) => {
    if (val) getRolePermission()
  }
)
</script>
