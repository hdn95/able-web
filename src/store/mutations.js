import * as types from './mutation-types'

const mutations = {
  [types.Set_MenuCollapse] (state, val) {
    state.MenuCollapse = val
  },
  [types.Set_CurrentLanguage] (state, val) {
    state.CurrentLanguage = val
  },
  [types.Set_HistoryRoutes] (state, val) {
    state.HistoryRoutes = val
  },
  [types.Set_LoadingMessage] (state, val) {
    state.LoadingMessage = val
  },
  [types.Set_MenusJsonTree] (state, val) {
    state.MenusJsonTree = val
  },
  [types.Set_AllResourcesJsonTree] (state, val) {
    state.AllResourcesJsonTree = val
  },
  [types.Set_OrganizesJsonTree] (state, val) {
    state.OrganizesJsonTree = val
  },
  [types.Set_DepartmentsJsonTree] (state, val) {
    state.DepartmentsJsonTree = val
  },
  [types.Set_SavedAccount] (state, val) {
    state.SavedAccount = val
  },
  [types.Set_ThresholdDictionary] (state, val) {
    state.ThresholdDictionary = val
  },
  [types.Set_Thresholds] (state, val) {
    state.Thresholds = val
  },
  [types.Set_Roles] (state, val) {
    state.Roles = val
  },
  [types.Set_DictionaryJsonTree] (state, val) {
    state.DictionaryJsonTree = val
  },
  [types.Set_AreasJsonTree] (state, val) {
    state.AreasJsonTree = val
  },
  [types.Set_DeviceTypeJsonTree] (state, val) {
    state.DeviceTypeJsonTree = val
  },
  [types.Set_RouterTabs] (state, val) {
    state.RouterTabs = val
  },
  [types.Set_LeftDevicesTree] (state, val) {
    state.LeftDevicesTree = val
  },
  [types.Set_MessageTips] (state, val) {
    state.MessageTips = val
  }
}

export default mutations
