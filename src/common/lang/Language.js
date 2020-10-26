
/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 所有的语言对象
 */
export const Languagetype = [
  {name: '中文', key: 'ZH', display: false},
  {name: 'English', key: 'EN', display: false},
  {name: 'French', key: 'FR', display: true},
  {name: 'German', key: 'DE', display: true},
  {name: 'Russian', key: 'RU', display: true},
  {name: 'Japanese', key: 'JA', display: true}
]

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: loading多语言对象
 */
export const MsgMultilanguage = {
  ZH: {
    lodingMessage: '请稍候'
  },
  EN: {
    lodingMessage: 'Please wait'
  }
}

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 路由多语言对象
 */
export const RouterTitleMultilanguage = {
  ZH: {
    home: '首页',
    login: '登录',
    loginLog: '登录日志',
    setting: '参数设置'
  },
  EN: {
    home: 'Home',
    login: 'Login',
    loginLog: 'Loginlog',
    setting: 'Setting'
  }
}

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 异常消息提醒多语言对象
 */
export const ErrorMsgMultilanguage = {
  ZH: {
    login_expired: '登录状态已过期，请重新登录'
  },
  EN: {
    login_expired: 'Login has expired, Please login again'
  }
}

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: 请求消息提醒多语言对象
 */
export const RequestMsgMultilanguage = {
  ZH: {
    err_msg: '请求失败，请稍候再试',
    err_401: '请求未授权，请稍候再试',
    err_403: '请求被拒绝，请稍候再试',
    err_404: '请求资源找不到，请稍候再试',
    err_408: '请求超时，请稍候再试',
    err_500: '服务器错误，请稍候再试',
    err_502: '服务器网络错误，请稍候再试',
    err_505: 'HTTP不受支持，请稍候再试'
  },
  EN: {
    err_msg: 'Request failed, please try again later',
    err_401: 'Request unauthorized，please try again later',
    err_403: 'Request rejected，please try again later',
    err_404: 'Request not found，please try again later',
    err_408: 'Request timed out，please try again later',
    err_500: 'Server error，please try again later',
    err_502: 'Server network error，please try again later',
    err_505: 'Does not support HTTP，please try again later'
  }
}
