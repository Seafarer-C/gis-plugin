import util from '.'
import { defaultConfig } from '../constants'

/**
 * 用户可自定义更改全局配置(包含form\table\modal)
 * @param {Object} config 用户自定义配置，无需配置所有字段，只需配置与默认配置不同的字段即可
 */
export const setConfig = (config = {}) => {
  const globalConfig = defaultConfig
  util.deepAssign(globalConfig, config)
  window.gisPluginConfig = globalConfig
}
