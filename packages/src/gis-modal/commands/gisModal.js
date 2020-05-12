import Modal from './modal'

// 存储实例的容器(key: ref, value: instance)
const modalInstanceContant = {}

// 单例，节省浏览器内存开支，也确保过度动画正常显示
function getModalInstance (ref = 'gis-modal', options) {
  let modalInstance
  if (ref in modalInstanceContant) {
    modalInstance = modalInstanceContant[ref]
  } else {
    modalInstance = Modal.newInstance({
      ...options,
      // 不使用iview的页脚
      footerHide: true
    })
    modalInstanceContant[ref] = modalInstance
  }

  return modalInstance
}

export function confirm (options) {
  const ref = options.ref || 'gis-modal'
  const instance = getModalInstance(ref, options)

  options.onRemove = function () {
    delete modalInstanceContant[ref]
  }

  instance.show(options)
}

const gisModal = (props = {}) => {
  return confirm(props)
}

export const gisModalRemove = (ref = 'gis-modal') => {
  if (!modalInstanceContant[ref]) {
    // 若不存在实例则无需注销
    return false
  }

  const instance = getModalInstance(ref)
  instance.remove()
}

export default gisModal
