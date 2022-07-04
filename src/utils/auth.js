import { getItem, setItem } from './storage'
import { TIME_STAMP, TOKEN_TIMEOUT_VALUE } from '@/constant'

/**
 * 獲取時間戳
 */
export function getTimeStamp() {
  return getItem(TIME_STAMP)
}

/**
 * 設置時間戳
 */
export function setTimeStamp() {
  setItem(TIME_STAMP, Date.now())
}

/**
 * 是否超時
 */
export function isCheckTimeout() {
  // 當前時間
  const currentTime = Date.now()
  // 緩存時間
  const timeStamp = getTimeStamp()
  return currentTime - timeStamp > TOKEN_TIMEOUT_VALUE
}
