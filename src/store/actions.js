import * as types from './mutation-types'
import {
  SetDeviceTypeJsonTree,
  SetAreasJsonTree,
  SetDictionaryJsonTree,
  SetMenusJsonTree,
  RemoveMenusJsonTree,
  SetAllResourcesJsonTree,
  SetOrganizesJsonTree,
  SetDepartmentsJsonTree,
  SetThresholdDictionary,
  SetThresholds,
  SetMenuCollapse,
  SetMessage,
  ClearMessage
} from "@common/js/Cache"
import {SetSavedAccount, RemoveSavedAccount} from "@/common/js/SavedAccountCache"
import {SetRoles} from "@/common/js/RolesCache"
import {SetRouterTabs, RemoveRouterTabs, ClearRouterTabs} from "@/common/js/RouterTabsCache"
import {SetLocaleLanguage} from "@/common/lang/cache/LocaleCache"
import {SetleftDevicesTree} from "@/common/js/ApolloCache"

/**
 *@date: 2018-12-18 19:35:16
 *@desc: 设置消息提醒
 */
export const SetMessageAction = function ({commit}, val) {
  commit(types.Set_MessageTips, SetMessage(val))
}

export const ClearMessageAction = function ({commit}) {
  commit(types.Set_MessageTips, ClearMessage())
}

/**
 *@date: 2018-11-01 16:35:16
 *@desc: 设置设备树
 */
export const SetleftDevicesTreeAction = function ({commit}, val) {
  commit(types.Set_LeftDevicesTree, SetleftDevicesTree(val))
}

/**
 *@date: 2018-10-13 15:58:24
 *@desc: 设置系统语言
 */
export const SetCurrentLanguageAction = function ({commit}, val) {
  commit(types.Set_CurrentLanguage, SetLocaleLanguage(val))
}

export const SetHistoryRoutesAction = function ({commit}, vals) {
  commit(types.Set_HistoryRoutes, vals)
}

export const SetRouterTabsAction = function ({commit}, val) {
  commit(types.Set_RouterTabs, SetRouterTabs(val))
}

export const RemoveRouterTabsAction = function ({commit}, val) {
  commit(types.Set_RouterTabs, RemoveRouterTabs(val))
}

export const ClearRouterTabsAction = function ({commit}) {
  commit(types.Set_RouterTabs, ClearRouterTabs())
}

/**
 *@date: 2018-10-13 15:58:47
 *@desc: 设置设备类型
 */
export const SetDeviceTypeJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_DeviceTypeJsonTree, SetDeviceTypeJsonTree(vals))
}

/**
 *@date: 2018-09-19 10:43:46
 *@desc: 设置行政区域
 */
export const SetAreasJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_AreasJsonTree, SetAreasJsonTree(vals))
}

export const SetDictionaryJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_DictionaryJsonTree, SetDictionaryJsonTree(vals))
}

export const SetThresholdDictionaryAction = function ({commit}, val) {
  commit(types.Set_ThresholdDictionary, SetThresholdDictionary(val))
}

export const SetThresholdsAction = function ({commit}, val) {
  commit(types.Set_Thresholds, SetThresholds(val))
}

/**
 *@date: 2018-09-12 13:13:54
 *@desc: 保存角色，在角色授权时用
 */
export const SetRolesAction = function ({commit}, val) {
  commit(types.Set_Roles, SetRoles(val))
}

/**
 *@date: 2018-09-05 16:15:11
 *@desc: 登录页勾选记住账号时的保存和删除
 */

export const SetSavedAccountAction = function ({commit}, val) {
  commit(types.Set_SavedAccount, SetSavedAccount(val))
}

export const RemoveSavedAccountAction = function ({commit}) {
  commit(types.Set_SavedAccount, RemoveSavedAccount())
}

/**
 *@date: 2018-09-30 09:51:00
 *@desc: 保存菜单数据树结构
 */
export const SetMenusJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_MenusJsonTree, SetMenusJsonTree(vals))
}

/**
 *@date: 2018-09-30 09:51:00
 *@desc: 移除菜单数据树结构
 */
export const RemoveMenusJsonTreeAction = function ({commit}) {
  commit(types.Set_MenusJsonTree, RemoveMenusJsonTree())
}

/**
 *@date: 2018-09-30 09:51:00
 *@desc: 保存资源数据树结构
 */
export const SetAllResourcesJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_AllResourcesJsonTree, SetAllResourcesJsonTree(vals))
}

/**
 *@date: 2018-09-30 09:51:00
 *@desc: 保存机构数据树结构
 */
export const SetOrganizesJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_OrganizesJsonTree, SetOrganizesJsonTree(vals))
}

/**
 *@date: 2018-09-30 09:51:00
 *@desc: 保存部门数据树结构
 */
export const SetDepartmentsJsonTreeAction = function ({commit}, vals) {
  commit(types.Set_DepartmentsJsonTree, SetDepartmentsJsonTree(vals))
}

/**
 *@date: 2018-10-22 15:23:00
 *@desc: 设置左侧菜单
 */
export const SetMenuCollapseAction = function ({commit}, val) {
  commit(types.Set_MenuCollapse, SetMenuCollapse(val))
}
