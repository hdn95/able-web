'use strict'

/**
 *@date: 2018-09-07 13:57:32
 *@desc: 请求类型
 */
export const MethodType = [
  {text: 'GET', key: 100},
  {text: 'POST', key: 200},
  {text: 'PUT', key: 300},
  {text: 'DELETE', key: 400},
  {text: 'IMPORT', key: 500},
  {text: 'EXPORT', key: 600}
]

/**
 *@date: 2018-09-07 13:57:00
 *@desc: role Category
 */
export const RoleCategory = [
  {text: '角色', key: 1},
  {text: '岗位', key: 2},
  {text: '职位', key: 3},
  {text: '工作组', key: 4}
]

/**
 *@date: 2018-09-14 16:28:32
 *@desc: login type
 */
export const LoginType = [
  {text: "Web", key: 2},
  {text: "WeChat", key: 4},
  {text: "Android", key: 8},
  {text: "iOS", key: 16}
]

// 归属系统的对象
export const AscriptionSystem = [
  {text: "Zeus", key: 2},
  {text: "Poseidon", key: 4},
  {text: "Aladdin", key: 8},
  {text: "Apollo", key: 16},
  {text: "Bgb", key: 32}
]

/**
 *@date: 2018-10-31 10:17:32
 *@desc: 日志操作类型
 */
export const LogsOperationType = [
  {text: "All", value: "All", key: -1, desc: "所有"},
  {text: "Ohter", value: "Ohter", key: 0, desc: "其他"},
  {text: "Login", value: "Login", key: 1, desc: "登录"},
  {text: "WechatLogin", value: "WechatLogin", key: 2, desc: "微信登录"},
  {text: "iOSLogin", value: "iOSLogin", key: 3, desc: "IOS登录"},
  {text: "AndroidLogin", value: "AndroidLogin", key: 4, desc: "Android登录"},
  {text: "OAuthLogin", value: "OAuthLogin", key: 5, desc: "OAuth登录"},
  {text: "ValidaValidate", value: "ValidaValidate", key: 6, desc: "验证Token"},
  {text: "Refesh", value: "Refesh", key: 7, desc: "刷新Token"},
  {text: "Register", value: "Register", key: 8, desc: "注册"},
  {text: "Exit", value: "Exit", key: 9, desc: "退出"},

  {text: "GET", value: "GET", key: 10, desc: "查询"},
  {text: "POST", value: "POST", key: 11, desc: "新增"},
  {text: "PUT", value: "PUT", key: 12, desc: "修改"},
  {text: "DELETE", value: "DELETE", key: 13, desc: "删除"},
  {text: "IMPORT", value: "IMPORT", key: 14, desc: "导入"},
  {text: "EXPORT", value: "EXPORT", key: 15, desc: "导出"},

  {text: "Submit", value: "Submit", key: 20, desc: "其他提交"},
  {text: "Authentication ", value: "Authentication", key: 21, desc: "账户鉴权"},
  {text: "PermissionAuth", value: "PermissionAuth", key: 22, desc: "权限鉴权"},
  {text: "Exception", value: "Exception", key: 999, desc: "异常"}
]

export const WebSocketKey = '4a3eaa22d6074850b1fcb5a3bc7283e4'
