import GisForm from './src/gis-form'
import GisStepForm from './src/gis-form/gis-step-form'
import GisTagForm from './src/gis-form/gis-tag-form'
import GisTable from './src/gis-table'
import { gisModal, gisModalRemove, gisProcessModal } from './src/gis-modal'
import { setConfig } from './utils/setConfig'

const components = [
  GisForm,
  GisTable,
  GisStepForm,
  GisTagForm
]

const install = (Vue, config = {}) => {
  // 初始化全局配置
  setConfig(config)
  // 依次加载组件
  components.forEach(component => {
    Vue.component(component.name, component)
  })
  // 注册方法
  Vue.prototype.$gisModal = gisModal
  Vue.prototype.$gisProcessModal = gisProcessModal
  Vue.prototype.$gisModalRemove = gisModalRemove
}
export default install

export {
  GisForm,
  GisTable,
  GisStepForm,
  GisTagForm
}
