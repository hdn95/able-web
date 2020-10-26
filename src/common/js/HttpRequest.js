/**
 *@date: 2018-09-07 11:46:40
 *@desc: Axios 请求封装
 */
import axios from 'axios'
import router from "@/router"
import store from "@/store"
import {Loading, Message} from 'element-ui'
import {StatusCode} from "@common/js/ApiConfig"
import {RequestMsgMultilanguage} from "@/common/lang/Language"
import {GetAccessToken, GetLoginUser, RefreshAccessToken} from "@/common/js/login/LoginManage"
import MD5 from 'js-md5'
import {formatDate} from "@/utils/UtilsHelper"

axios.defaults.timeout = 100000 // 设置请求超时时间
axios.defaults.baseURL = 'https://icore.gosafenet.com'

let localUrl = window.location.href.toString()
let xiegang = localUrl.indexOf('/',localUrl.indexOf('/')+1)
let AscriptionSystemSy2 = localUrl.indexOf('.',localUrl.indexOf('.')+1)
let AscriptionSystemSy = localUrl.indexOf('.')
let AscriptionSystem
let AscriptionSystems = localUrl.slice(xiegang+1,AscriptionSystemSy)
let AscriptionSystems2 = localUrl.slice(AscriptionSystemSy+1,AscriptionSystemSy2)

if(AscriptionSystems!='dev'){
  AscriptionSystem = AscriptionSystems.substring(0,1).toUpperCase()+AscriptionSystems.substring(1);
}else{
  AscriptionSystem = AscriptionSystems2.substring(0,1).toUpperCase()+AscriptionSystems2.substring(1);
}

/**
 *@date: 2018-09-07 11:46:40
 *@desc: http request
 */
axios.interceptors.request.use(
  request => {
    console.log(request)

    let locale = store.getters.CurrentLanguage.key
    let loginUser = GetLoginUser()
    let timestamp = (new Date()).getTime()

    // 如果请求的headers里面还要添加参数 请在此添加
    request.headers = Object.assign({}, request.headers, {
      'Access-Control-Allow-Origin': '*',
      'AscriptionSystem': AscriptionSystem,
      'SystemLanguage': `${locale}`,
      'Timestamp': `${timestamp}`
    })

    if (router.currentRoute.path === "/login" || router.currentRoute.path === "/dev/setting") {
      return request
    }

    if (loginUser === null || loginUser === "") {
      router.push({
        path: '/login',
        query: {ret: router.currentRoute.fullPath}
      })
    }

    let params = ''
    if (request.method === 'get') {
      params = request.params
    } else {
      params = request.data
    }
    let crc = ''
    let crck = ''
    // params.sort()
    for (const key in params) {
      if (params[key] === undefined || params[key] === null || params[key] === "") {
        continue
      }

      if ((!key.toLowerCase().includes('timestamp')) && (key.toLowerCase().includes("date") || key.toLowerCase().includes("time"))) {
        // var val=Date.parse(params[key])
        crc += formatDate(params[key], 'yyyy-MM-dd hh:mm:ss')
        crck += key + ` `
        continue
      }
      crc += params[key]
      crck += key + ` `
      
    }
    console.log('加密前：' + crc)

    crc = MD5(crc + timestamp)

    console.log('加密后：' + crc)

    if(crck===''||crck===null||crck===``){
        crck='timestamp'
        console.log('crck为空')
    }

    request.headers = Object.assign({}, request.headers, {
      'Authorization': `Bearer ${GetAccessToken()}`,
      'Signature': `${crc}`,
      'FieldSort': `${crck}`
    })

    // if (request.method === 'post') {
    //   let data = request.data
    //
    //   request.data = Object.assign({}, data, {
    //     ascriptionSystem: 'Apollo'
    //   })
    // }

    return request
  },
  error => {
    return Promise.reject(error)
  })

let unCount = 3
let duration = 1800

/**
 *@date: 2018-09-07 11:46:40
 *@desc: http response
 */
axios.interceptors.response.use(
  response => {
    console.log(response)

    if (response.data && response.data.code.code !== StatusCode.RET_OK) {
      Message({
        message: `${response.data.code.msg}`,
        type: 'error',
        duration: duration
      })

      return Promise.reject(response)
    }

    return response
  },
  error => {
    console.log(error)

    let locale = store.getters.CurrentLanguage.key
    let err_msg = RequestMsgMultilanguage[locale].err_msg

    if (error.response !== undefined) {
      let status = error.response.status

      switch (status) {
        case 401:
        case 420: {
          if (unCount > 0) {
            unCount -= 1

            /**
             *@date: 2018-09-07 13:50:15
             *@desc: 401重新刷新Token并再请求
             */
            return RefreshAccessToken()
              .then((ret) => {
                error.config.headers.Authorization = `Bearer ${ret}`

                error.config.baseURL = ''

                return axios(error.config)
              })
          } else {
            unCount = 3

            err_msg = RequestMsgMultilanguage[locale].err_401
            break
          }
        }
        case 403: {
          err_msg = RequestMsgMultilanguage[locale].err_403
          break
        }
        case 404: {
          err_msg = RequestMsgMultilanguage[locale].err_404
          break
        }
        case 408: {
          err_msg = RequestMsgMultilanguage[locale].err_408
          break
        }
        case 500: {
          err_msg = RequestMsgMultilanguage[locale].err_500
          break
        }
        case 502: {
          err_msg = RequestMsgMultilanguage[locale].err_502
          break
        }
        case 505: {
          err_msg = RequestMsgMultilanguage[locale].err_505
          break
        }
      }

      Message({
        message: `${err_msg}`,
        type: 'error',
        duration: duration
      })

      return Promise.reject(error)
    }

    Message({
      message: `${err_msg}`,
      type: 'error',
      duration: duration
    })

    return Promise.reject(error)
  })

/**
 *@date: 2018-09-07 11:46:40
 *@desc: 封装get方法
 */
export function fetch (url, options) {
  const data = Object.assign({}, options)

  let loadingInstance = Loading.service({
    fullscreen: true,
    lock: true,
    text: `${store.state.LoadingMessage}`,
    background: 'rgba(0, 0, 0, 0.7)'
  })

  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: data
    })
      .then(response => {
        loadingInstance.close()

        response !== undefined ? resolve(response.data) : resolve(null)
      })
      .catch(err => {
        loadingInstance.close()

        reject(err)
      })
  })
}

/**
 *@date: 2018-09-07 11:46:40
 *@desc: 封装post请求
 */
export function post (url, options) {
  const data = Object.assign({}, options)

  let loadingInstance = Loading.service({
    lock: true,
    text: `${store.state.LoadingMessage}`,
    background: 'rgba(0, 0, 0, 0.7)'
  })

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then(response => {
        loadingInstance.close()

        response !== undefined ? resolve(response.data) : resolve(null)
      }, err => {
        loadingInstance.close()

        reject(err)
      })
  })
}

/**
 *@date: 2018-09-07 11:46:40
 *@desc: 封装delete请求
 */
export function remove (url, options) {
  const data = Object.assign({}, options)

  let loadingInstance = Loading.service({
    lock: true,
    text: `${store.state.LoadingMessage}`,
    background: 'rgba(0, 0, 0, 0.7)'
  })

  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: data
    })
      .then(response => {
        loadingInstance.close()

        response !== undefined ? resolve(response.data) : resolve(null)

      }, err => {
        loadingInstance.close()

        reject(err)
      })
  })
}

/**
 *@date: 2018-09-07 11:46:40
 *@desc: 封装put请求
 */
export function put (url, options) {
  const data = Object.assign({}, options)

  let loadingInstance = Loading.service({
    lock: true,
    text: `${store.state.LoadingMessage}`,
    background: 'rgba(0, 0, 0, 0.7)'
  })

  return new Promise((resolve, reject) => {
    axios.put(url, data)
      .then(response => {
        loadingInstance.close()

        response !== undefined ? resolve(response.data) : resolve(null)

      }, err => {

        loadingInstance.close()

        reject(err)
      })
  })
}
