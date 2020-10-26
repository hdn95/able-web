import Vue from 'vue'
import VueI18n from 'vue-i18n'
import enLocale from './en.js'
import zhLocale from './zh.js'

import ApolloZh from './Apollo/zh'
import ApolloEn from './Apollo/en'

import SettingZh from './Settings/zh'
import SettingEn from './Settings/en'

import elementEnLocale from 'element-ui/lib/locale/lang/en'
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN'
import {GetLocaleLanguage} from "@/common/lang/cache/LocaleCache"

Vue.use(VueI18n)
let locale = GetLocaleLanguage()

const i18n = new VueI18n({
  locale: locale.key, // 语言标识
  messages: {
    'EN': {
      ...SettingEn,
      ...ApolloEn,
      ...enLocale,
      ...elementEnLocale
    },
    'ZH': {
      ...SettingZh,
      ...ApolloZh,
      ...zhLocale,
      ...elementZhLocale
    },
    'JP': {}
  }
})

export default i18n
