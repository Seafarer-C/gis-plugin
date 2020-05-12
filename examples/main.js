import Vue from 'vue'
import App from './App.vue'
// iview UI库
import ViewUI from 'view-design'
// import style
import 'view-design/dist/styles/iview.css'
// gisPlugin 插件库
import GisPlugin from '~/index.js'
import '~/index.less'

Vue.use(ViewUI)
Vue.use(GisPlugin, {
  form: {
    border: true,
    span: 12
  },
  table: {
    border: true
  },
  modal: {
    // title: 'modal'
  }
})

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
