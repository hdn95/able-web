import {WebSocketKey} from "../js/BasisConfig"
import {mapActions} from "vuex"
import {GetLoginUser} from "@common/js/login/LoginManage"

/**
 *@date:
 *@author: jing.fu@gosafenet.com
 *@desc: WebSocket的混入
 */
export const WebSocketMixin = {
  computed: {
    LoginUser () {
      return GetLoginUser()
    }
  },
  methods: {
    ...mapActions({
      SetMessage: 'SetMessageAction'
    }),
    initWebSocket (wsUri) {
      let _that = this

      if (window.WebSocket) {
        _that.websocket = new WebSocket(wsUri)

        _that.websocket.onopen = _that.handleWebSocketOnOpen
        _that.websocket.onerror = _that.handleWebSocketOnError
        _that.websocket.onmessage = _that.handleWebSocketOnMessage
        _that.websocket.onclose = _that.handleWebSocketOnClose

      } else {
        _that.$message({
          message: `${_that.$t('WebSocket.tips.notSupport')}`,
          type: 'error',
          duration: 1800
        })
      }
    },
    handleWebSocketOnClose () {
      console.log("WebSocket connection closed")
    },
    handleWebSocketOnError () {
      console.log("WebSocket connection error")
    },
    handleWebSocketOnOpen () {
      console.log("WebSocket connection success")
    },
    handleWebSocketSend (options) {
      this.websocket.send(JSON.stringify(options))
    },
    handleGetWebSocketUri () {
      let _that = this

      if (_that.websocket === undefined) {
        console.log('init websocket..')
        if (window.location.protocol === 'http:') {
          _that.initWebSocket(`ws://ws.gosafenet.com/push/${WebSocketKey}`)

        } else {
          _that.initWebSocket(`wss://ws.gosafenet.com/push/${WebSocketKey}`)
        }

      } else if (_that.websocket.readyState !== 1) {
        console.log('websocket unconnection..')

        if (window.location.protocol === 'http:') {
          _that.initWebSocket(`ws://ws.gosafenet.com/push/${WebSocketKey}`)

        } else {
          _that.initWebSocket(`wss://ws.gosafenet.com/push/${WebSocketKey}`)
        }
      } else {
        console.log(_that.websocket)
      }
    },
    handleWebSocketOnMessage (event) {
      let _that = this

      let rt = JSON.parse(event.data)
      let retData = JSON.parse(rt.data)
      let ret = JSON.parse(retData.arguments[0])

      if (retData.arguments[0] !== 'CopyThat') {
        let args = []

        args[0] = `${rt.messageId}`
        args[1] = 'CopyThat'

        let sendData = {
          id: retData.id,
          methodName: retData.methodName,
          arguments: args
        }

        _that.handleWebSocketSend(sendData)
      }
      console.log(ret)

      if (ret.UserId !== undefined) {
        if (ret.UserId === this.LoginUser.id) {
          _that.SetMessage(ret)
        }
      }
    }
  }
}
