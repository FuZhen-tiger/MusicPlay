// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import PubSub from 'pubsub-js'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.prototype.$pubSub = PubSub
Vue.config.productionTip = false


Vue.filter('dateFormat', function (originVal) {
  const dt = new Date(originVal)

  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')

  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')

  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})
Vue.filter('playTimeFormat', function (originVal) {
  let duration = originVal
  let min = parseInt(duration / 1000 / 60)
  if (min < 10) {
    min = '0' + min
  }
  let sec = parseInt((duration / 1000) % 60)
  if (sec < 10) {
    sec = '0' + sec
  }
  return `${min}:${sec}`
})

Vue.filter('playNumFormat', function (playCount) {
  if (playCount > 100000) {
    return parseInt(playCount / 10000) + '万'
  }
  return playCount
})
//css
import './assets/CSS/iconfont.css'

//http
import http from './http'
Vue.prototype.$http=http;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
