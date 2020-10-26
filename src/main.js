// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import ELEMENT from 'element-ui'
import MD5 from 'js-md5'
import i18n from '@common/lang/index'
import axios from 'axios'
import echarts from 'echarts'
import VueBaiduMap from 'vue-baidu-map'

import 'element-ui/lib/theme-chalk/index.css' // 饿了么的样式文件
import './common/css/main.css' // 主样式文件
import './common/css/style.css' // 辅助样式文件
import './common/icon/iconfont.css' // 字体样式文件

import {fetch, post, remove, put} from "@common/js/HttpRequest" // 请求封装

Vue.prototype.$fetch = fetch
Vue.prototype.$post = post
Vue.prototype.$remove = remove
Vue.prototype.$put = put
Vue.prototype.$axios = axios

Vue.prototype.$md5 = MD5 // MD5 加密
Vue.prototype.$echarts = echarts // 图表（折线图、柱状图）

Vue.config.productionTip = true
Vue.config.productionTip = false // 阻止vue在启动时生成生产提示。默认值为true

Vue.use(ELEMENT, {
  i18n: (key, value) => i18n.t(key, value),
  size: 'small',
  zIndex: 4000
})

Vue.use(VueBaiduMap, {ak: 'QGmmAycwdHAhCbNKAVY6qT2v6mbfCs2V'})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: {App},
  template: '<App/>'
})
