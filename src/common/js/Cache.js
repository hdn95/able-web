// 缓存的文件

import storage from 'good-storage'
import {GetLoginUser} from "@/common/js/login/LoginManage"

/**
 *@date: 2018-09-18 09:15:50
 *@desc: 阈值分类
 */
const ThresholdsKey = "ABLE_THRESHOLDCACHEKEY"

export function SetThresholds (vals) {
  storage.set(ThresholdsKey, vals)

  return vals
}

export function GetThresholds () {
  return storage.get(ThresholdsKey, [])
}

/**
 *@date: 2018-09-17 08:55:17
 *@desc: 设置阈值分类字典数据
 */
const ThresholdDictionaryKey = "ABLE_THRESHOLDDICTIONARYCACHEKEY"

export function SetThresholdDictionary (vals) {
  storage.set(ThresholdDictionaryKey, vals)

  return vals
}

export function GetThresholdDictionary () {
  return storage.get(ThresholdDictionaryKey, [])
}

/**
 *@date: 2018-09-12 15:20:13
 *@desc: 通用字典设置Cache
 */
const DictionaryKey = "ABLE_DICTIONARYJSONTREECACHEKEY"

export function SetDictionaryJsonTree (vals) {
  storage.set(DictionaryKey, vals)

  return vals
}

export function GetDictionaryJsonTree () {
  return storage.get(DictionaryKey, [])
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 菜单设置Cache
 */
let loginUser = GetLoginUser()
const MenusKey = `ABLE_MENUSJSONTREECACHEKEY_${loginUser === null ? "" : loginUser.id}`

export function SetMenusJsonTree (vals) {
  storage.set(MenusKey, vals)

  return vals
}

export function GetMenusJsonTree () {
  return storage.get(MenusKey, [])
}

export function RemoveMenusJsonTree () {
  return storage.remove(MenusKey, [])
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 资源设置Cache
 */
const AllResourcesKey = "ABLE_ALLRESOURCESJSONTREECACHEKEY"

export function SetAllResourcesJsonTree (vals) {
  storage.set(AllResourcesKey, vals)

  return vals
}

export function GetAllResourcesJsonTree () {
  return storage.get(AllResourcesKey, [])
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 机构设置Cache
 */
const OrganizesKey = "ABLE_ORGANIZESJSONTREECACHEKEY"

export function SetOrganizesJsonTree (vals) {
  storage.set(OrganizesKey, vals)

  return vals
}

export function GetOrganizesJsonTree () {
  return storage.get(OrganizesKey, [])
}

export function RemoveOrganizesJsonTree () {
  return storage.remove(OrganizesKey, [])
}

/**
 *@date: 2018-09-30 09:34:26
 *@desc: 部门设置Cache
 */
const DepartementsKey = "ABLE_DEPARTEMENTSJSONTREECACHEKEY"

export function SetDepartmentsJsonTree (vals) {
  storage.set(DepartementsKey, vals)

  return vals
}

export function GetDepartmentsJsonTree () {
  return storage.get(DepartementsKey, [])
}

export function RemoveDepartmentsJsonTree () {
  return storage.remove(DepartementsKey, [])
}

/**
 *@date: 2018-09-19 10:39:55
 *@desc: 行政区域设置Cache
 */
const AreaManageKey = "ABLE_AREAMANAGEJSONTREECACHEKEY"

export function SetAreasJsonTree (vals) {
  storage.set(AreaManageKey, vals)

  return vals
}

export function GetAreasJsonTree () {
  return storage.get(AreaManageKey, [])
}

/**
 *@date: 2018-09-26 15:33:47
 *@desc: 设备类型设置Cache
 */
const DeviceTypeKey = "ABLE_DEVICETYPEJSONTREECACHEKEY"

export function SetDeviceTypeJsonTree (vals) {
  storage.set(DeviceTypeKey, vals)

  return vals
}

export function GetDeviceTypeJsonTree () {
  return storage.get(DeviceTypeKey, [])
}

/**
 *@date: 2018-10-22 15:21:14
 *@desc: 菜单收起、展开
 */
const MenuCollapseKey = "ABLE_MENUCOLLAPSEKEY"

export function SetMenuCollapse (val) {
  storage.set(MenuCollapseKey, val)

  return val
}

export function GetMenuCollapse () {
  return storage.get(MenuCollapseKey, true)
}

export function ClearAllStorage () {
  let account = storage.get('ABLE_SAVEDACCOUNTCACHEKEY', '') // 保留保存的账户

  storage.clear()

  storage.set('ABLE_SAVEDACCOUNTCACHEKEY', account)
}

/**
 *@date: 2018-12-18 19:46:40
 *@desc: 设置消息提醒的缓存
 */
const MessageKey = "ABLE_MESSAGEKEY"

export function SetMessage (val) {
  const temp = storage.get(MessageKey, [])

  temp.push(val)

  storage.set(MessageKey, temp)

  return temp
}

export function GetMessage () {
  return storage.get(MessageKey, [])
}

export function ClearMessage () {
  storage.remove(MessageKey, [])

  return []
}
