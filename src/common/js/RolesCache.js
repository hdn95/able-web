import storage from 'good-storage'

/**
 *@date: 2018-12-18 19:46:40
 *@desc: 角色列表的缓存
 */
const rolesKey = "ABLE_ROLESCACHEKEY"

export function SetRoles (val) {
  storage.set(rolesKey, val)

  return val
}

export function GetRoles () {
  return storage.get(rolesKey, [])
}
