import request from '@/utils/request'

/**
 * 獲取用戶列表數據
 */
export const getUserManageList = data => {
  return request({
    url: '/user-manage/list',
    params: data
  })
}

/**
 * 批量導入
 */
export const userBatchImport = data => {
  return request({
    url: '/user-manage/batch/import',
    method: 'POST',
    data
  })
}

/**
 * 刪除指定數據
 */
export const deleteUser = id => {
  return request({
    url: `/user-manage/detele/${id}`
  })
}

/**
 * 獲取所有用戶列表數據
 */
export const getUserManageAllList = () => {
  return request({
    url: '/user-manage/all-list'
  })
}

/**
 * 獲取用戶詳情
 */
export const userDetail = id => {
  return request({
    url: `/user-manage/detail/${id}`
  })
}

/**
 * 獲取指定用戶角色
 */
export const userRoles = id => {
  return request({
    url: `/user-manage/role/${id}`
  })
}

/**
 * 分用户分配角色
 */
export const updateRole = (id, roles) => {
  return request({
    url: `/user-manage/update-role/${id}`,
    method: 'POST',
    data: {
      roles
    }
  })
}
