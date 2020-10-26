import storage from 'good-storage'

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 左边设备类型树的缓存
 */
const leftDevicesTree = "ABLE_LEFTDEVICESTREE"

export function SetleftDevicesTree (val) {
  storage.set(leftDevicesTree, val)

  return val
}

export function GetleftDevicesTree () {
  return storage.get(leftDevicesTree, [])
}

export function RemoveleftDevicesTree () {
  return storage.remove(leftDevicesTree, [])
}
