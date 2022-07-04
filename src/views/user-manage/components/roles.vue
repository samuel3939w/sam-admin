<template>
  <el-dialog
    :before-close="closed"
    :title="$t('msg.excel.roleDialogTitle')"
    :model-value="modelValue"
  >
    <el-checkbox-group v-model="userRoleTitleList">
      <el-checkbox
        v-for="item in allRoleList"
        :key="item.id"
        :label="item.title"
      ></el-checkbox>
    </el-checkbox-group>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closed">{{ $t('msg.universal.cancel') }}</el-button>
        <el-button type="primary" @click="onConfirm">
          {{ $t('msg.universal.confirm') }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { roleList } from '@/api/role'
import { updateRole, userRoles } from '@/api/user-manage'
import { watchSwitchLang } from '@/utils/i18n'
import { ElMessage } from 'element-plus'
import { defineEmits, defineProps, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

// 所有角色
const allRoleList = ref([])
//獲取所有角色數據的方法
const getListData = async () => {
  allRoleList.value = await roleList()
}
getListData()
watchSwitchLang(getListData)

// 當前用戶角色
const userRoleTitleList = ref([])
// 獲取當前用戶角色
const getUserRoles = async () => {
  const res = await userRoles(props.userId)
  userRoleTitleList.value = res.role.map((item) => item.title)
}

watch(
  () => props.userId,
  (val) => {
    if (val) getUserRoles()
  }
)

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  },
  userId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['update:modelValue','updateRole'])

/**
 * 確定按鈕點擊事件
 */
const i18n = useI18n()
const onConfirm = async () => {
  // 處理數據結構
  const roles = userRoleTitleList.value.map((title) => {
    return allRoleList.value.find((role) => role.title === title)
  })

  await updateRole(props.userId, roles)

  ElMessage.success(i18n.t('msg.role.updateRoleSuccess'))
  emit('updateRole')
  closed()
}

/**
 * 關閉
 */
const closed = () => {
  emit('update:modelValue', false)
}
</script>
<style scoped lang='scss'>
</style>
