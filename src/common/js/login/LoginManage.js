'use strict'

import {getCookies, removeCookies, setCookies} from "../Cookies"
import axios from 'axios'

// login cookie key
const loginKey = "ABLE_LOGINUSERCOOKIE@KEY"
// refresh token cookie key
const refreshTokenKey = "ABLE_REFRESHTOKENCOOKIE@KEY"
// access token cookie key
const accessTokenKey = "ABLE_ACCESSTOKENCOOKIE@KEY"

function setAccessToken (val) {
  if (val !== "" && val.length > 0) {
    setCookies(accessTokenKey, val, 5 * 60 * 60)
  }
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 设置LoginCookies
 */
export function SetLoginUser (val) {
  let refreshToken = val.refreshToken
  let accessToken = val.accessToken
  let userInfo = val.userInfo

  setAccessToken(accessToken)

  setCookies(refreshTokenKey, refreshToken, 7 * 24 * 60 * 60)

  setCookies(loginKey, userInfo, 5 * 60 * 60)

  return userInfo
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 获取LoginUserCookies
 */
export function GetLoginUser () {
  return getCookies(loginKey, null)
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 获取AccessToken
 */
export function GetAccessToken () {
  return getCookies(accessTokenKey)
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 获取RefreshToken
 */
export function GetRefreshToken () {
  return getCookies(refreshTokenKey)
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 删除LoginCookies
 */
export function RemoveLoginUser () {
  removeCookies(refreshTokenKey)
  removeCookies(accessTokenKey)

  return removeCookies(loginKey)
}

/**
 *@date: 2018-09-27 11:46:40
 *@desc: 刷新AccessToken
 */
export function RefreshAccessToken () {
  const refreshToken = GetRefreshToken()

  return new Promise((resolve, reject) => {
    axios.put('/SSO/token', {token: refreshToken})
      .then((ret) => {
        const retCode = ret.data.code

        if (retCode.code === 200 && retCode.flag) {
          const retData = ret.data.data

          setAccessToken(retData)

          resolve(retData)
        }
      })
      .catch((error) => {
        reject(error)
      })
  })
}
