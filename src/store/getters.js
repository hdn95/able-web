import {GetDevicesTree} from "@/utils/UtilsHelper"
import {GetResourcesJsonTree} from "@utils/UtilsHelper"

export const MenuCollapse = (state) => {
  return state.MenuCollapse
}

export const CurrentLanguage = (state) => {
  return state.CurrentLanguage
}

export const HistoryRoutes = state => state.HistoryRoutes

export const LoadingMessage = state => state.LoadingMessage

export const MenusJsonTree = state => state.MenusJsonTree

export const UnFunResourcesJsonTree = state => {
  let ret = state.AllResourcesJsonTree

  return GetResourcesJsonTree(ret, '-1', false)
}

export const AllResourcesJsonTree = state => {
  let ret = state.AllResourcesJsonTree

  return GetResourcesJsonTree(ret, '-1', true)
}

export const OrganizesJsonTree = state => state.OrganizesJsonTree

export const DepartmentsJsonTree = state => state.DepartmentsJsonTree

export const SavedAccount = state => state.SavedAccount

export const ThresholdDictionary = state => state.ThresholdDictionary

export const Thresholds = state => state.Thresholds

export const Roles = state => state.Roles

export const DictionaryJsonTree = state => state.DictionaryJsonTree

export const AreasJsonTree = state => state.AreasJsonTree

export const DeviceTypeJsonTree = state => state.DeviceTypeJsonTree

export const RouterTabs = (state) => {
  return state.RouterTabs
}

export const LeftDevicesTree = (state) => {
  let ret = state.LeftDevicesTree

  return GetDevicesTree(ret, "0")
}

export const MapDevices = (state) => {
  let ret = state.LeftDevicesTree
  let retArray = []

  ret.forEach((item) => {
    if (item.sort === 'SensorDevice') {
      retArray.push(item)
    }
  })

  return retArray
}

export const MessageTips = state => state.MessageTips
