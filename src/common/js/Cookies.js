/**
 *@date: 2018-09-27 11:46:40
 *@desc: Cookies封装
 */

import VueCookies from 'vue-cookies'

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 设置Cookies
 */
export function setCookies (keyName, value, expireTimes) {
  if (keyName === "" || keyName === null || keyName === undefined) {
    return
  }

  if (value === "" || value === null || value === undefined) {
    return
  }

  if (expireTimes === "" || expireTimes === null || expireTimes === undefined || expireTimes <= 0) {
    expireTimes = 3 * 60 * 60
  }

  VueCookies.set(keyName, JSON.stringify(value), expireTimes, "/")
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 获取Cookies
 */
export function getCookies (keyName) {
  if (keyName === "" || keyName === null || keyName === undefined) {
    return null
  }

  const existCookies = VueCookies.isKey(keyName)

  if (existCookies) {
    return JSON.parse(VueCookies.get(keyName))
  }

  return null
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 删除Cookies
 */
export function removeCookies (keyName) {
  if (keyName === "" || keyName === null || keyName === undefined) {
    return false
  }

  const existCookies = VueCookies.isKey(keyName)

  if (existCookies) {
    return VueCookies.remove(keyName, "/")
  }

  return false
}
