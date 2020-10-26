import storage from 'good-storage'
import router from "@/router"
import {GetLoginUser} from "@/common/js/login/LoginManage"

/**
 *@date: 2018-12-18 19:46:40
 *@desc: 标签页的缓存（tabs）
 */
let loginUser = GetLoginUser()
const routerTabsKey = `ABLE_ROUTERTABSCACHEKEY_${loginUser === null ? "" : loginUser.id}`

export function SetRouterTabs (tab) {
  let tabsTemp = storage.get(routerTabsKey, [])

  if (tabsTemp.length <= 0) {
    tabsTemp.push(tab)

  } else {
    let index = ArrayindexOf(tabsTemp, tab.path)

    if (index > -1) {
      storage.set(routerTabsKey, tabsTemp)

      return tabsTemp
    }

    tabsTemp.push(tab)
  }

  storage.set(routerTabsKey, tabsTemp)

  return tabsTemp
}

export function GetRouterTabs () {
  return storage.get(routerTabsKey, [])
}

export function RemoveRouterTabs (tab) {
  let tabsTemp = storage.get(routerTabsKey, [])

  let index = ArrayindexOf(tabsTemp, tab.path)

  if (index === 0) {
    let temp = tabsTemp[index + 1]

    if (temp === undefined) {
      router.push({
        path: "/"
      })
    } else {
      router.push({
        path: temp.path
      })
    }
  }

  tabsTemp.splice(index, 1)

  storage.set(routerTabsKey, tabsTemp)

  return tabsTemp
}

export function ClearRouterTabs () {
  storage.remove(routerTabsKey, [])

  return []
}

function ArrayindexOf (list, obj) {
  if (list.length <= 0) return -1

  for (let i = 0; i < list.length; i++) {
    if (list[i].path === obj) {
      return i
    }
  }

  return -1
}
