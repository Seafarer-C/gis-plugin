// 判断是否为对象
const isObject = (o) => {
  return Object.prototype.toString.call(o) === '[object Object]'
}

/**
 * 深度复制
 * @param {*} config 原配置
 * @param {*} custom 自定义配置
 */
const deepAssign = (config, custom = {}) => {
  for (const prop in custom) {
    if (config.hasOwnProperty(prop)) {
      if (custom[prop] !== null && isObject(custom[prop])) {
        deepAssign(config[prop], custom[prop])
      } else {
        config[prop] = custom[prop]
      }
    }
  }
}

/**
 * 前序递归遍历获取树状对象的所有节点，并将节点路径存储到数组中
 * @param {*} obj 树状对象
 * @param {*} list 存储对象所有节点的路径的数组
 * @param {*} parent 当前节点的父节点完整路径
 */
const assembleTree = (obj, list, parent = null) => {
  for (const key in obj) {
    const element = obj[key]
    const path = parent ? `${parent},${key}` : key // 拼接path
    if (isObject(element)) {
      assembleTree(element, list, path)
    } else {
      list.push(path)
    }
  }
}

/**
 * 调换数组两个元素的位置
 * @param {*} arr 数组
 * @param {*} index1 序号1
 * @param {*} index2 序号2
 */
const swapArr = (arr, index1, index2) => {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0]
  return arr
}

/**
 * 深拷贝
 * @param {*} obj
 */
const deepCopy = (obj) => {
  if (obj == null || typeof obj !== 'object') return obj
  const copy = obj.constructor()

  for (const attr in obj) {
    if (obj.hasOwnProperty(attr)) {
      copy[attr] = deepCopy(obj[attr])
    }
  }

  return copy
}

/**
 * 将字符串第一个字母大写
 * @param {*} text 字符串
 */
const firstUpper = (text) => {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default {
  isObject,
  assembleTree,
  swapArr,
  deepAssign,
  firstUpper,
  deepCopy
}
