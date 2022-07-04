/**
 * 導入數據對應表
 */
export const USER_RELATIONS = {
  姓名: 'username',
  聯繫方式: 'mobile',
  角色: 'role',
  開通時間: 'openTime'
}

/**
 * 解析 excel 導入的時間格式
 */
 export const formatDate = (numb) => {
  const time = new Date((numb - 1) * 24 * 3600000 + 1)
  time.setYear(time.getFullYear() - 70)
  const year = time.getFullYear() + ''
  const month = time.getMonth() + 1 + ''
  const date = time.getDate() - 1 + ''
  return (
    year +
    '-' +
    (month < 10 ? '0' + month : month) +
    '-' +
    (date < 10 ? '0' + date : date)
  )
}

