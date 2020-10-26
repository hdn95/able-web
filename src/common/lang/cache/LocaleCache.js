import storage from 'good-storage'
import {Languagetype} from "@/common/lang/Language"

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 多语言的缓存
 */
const localeKey = "ABLE_LOCALECACHEKEY"

export function SetLocaleLanguage (val) {
  storage.set(localeKey, val)

  return val
}

export function GetLocaleLanguage () {
  return storage.get(localeKey, Languagetype[0])
}
