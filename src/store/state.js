import {
  GetDeviceTypeJsonTree,
  GetAreasJsonTree,
  GetDictionaryJsonTree,
  GetMenusJsonTree, GetAllResourcesJsonTree,
  GetOrganizesJsonTree, GetDepartmentsJsonTree, GetThresholdDictionary, GetThresholds,
  GetMenuCollapse, GetMessage
} from "@/common/js/Cache"
import {GetRoles} from "@/common/js/RolesCache"
import {GetSavedAccount} from "@/common/js/SavedAccountCache"
import {GetRouterTabs} from "@/common/js/RouterTabsCache"
import {GetLocaleLanguage} from "@/common/lang/cache/LocaleCache"
import {GetleftDevicesTree} from "@/common/js/ApolloCache"
import {MsgMultilanguage} from "@/common/lang/Language"
import i18n from '@common/lang/index'

let locale = i18n.locale

const state = {
  LoadingMessage: MsgMultilanguage[locale].lodingMessage,
  MenuCollapse: GetMenuCollapse(), // 左侧菜单收起展开
  DictionaryJsonTree: GetDictionaryJsonTree(), // 通用字典Json树
  Thresholds: GetThresholds(), // 阈值
  ThresholdDictionary: GetThresholdDictionary(), // 阈值字典
  Roles: GetRoles(), // 角色
  SavedAccount: GetSavedAccount(), // 记住账号
  OrganizesJsonTree: GetOrganizesJsonTree(), // 组织树
  AllResourcesJsonTree: GetAllResourcesJsonTree(), // 资源树
  MenusJsonTree: GetMenusJsonTree(), // 菜单树
  DepartmentsJsonTree: GetDepartmentsJsonTree(), // 部门树
  AreasJsonTree: GetAreasJsonTree(), // 区域树
  DeviceTypeJsonTree: GetDeviceTypeJsonTree(), // 设备类型树
  RouterTabs: GetRouterTabs(), // 标签页
  HistoryRoutes: [], // 菜单面包屑集合,
  CurrentLanguage: GetLocaleLanguage(), // 当前语言
  LeftDevicesTree: GetleftDevicesTree(), // 设备类型树
  MessageTips: GetMessage() // 消息提醒
}

export default state
