import storage from 'good-storage'

/**
 *@date: 2018-09-05 16:05:51
 *@desc: 记住登陆账号的缓存
 */
const savedAccountKey = "ABLE_SAVEDACCOUNTCACHEKEY"

export function SetSavedAccount (val) {
  storage.set(savedAccountKey, val)

  return val
}

export function GetSavedAccount () {
  return storage.get(savedAccountKey, "")
}

export function RemoveSavedAccount () {
  return storage.remove(savedAccountKey, "")
}
