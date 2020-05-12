/**
 * gis-form 初始化
 */
import gisFormTitle from './../src/gis-form-title'
import gisFormUpload from './../src/gis-form-upload'
import gisFormTable from './../src/gis-form-table'

// json中type于iview组件名称之间的映射
const iviewMap = {
  input: 'Input',
  radio: 'RadioGroup',
  check: 'CheckboxGroup',
  select: 'Select',
  switch: 'Switch',
  date: 'DatePicker',
  time: 'TimePicker',
  number: 'InputNumber',
  Input: 'Input',
  RadioGroup: 'RadioGroup',
  CheckboxGroup: 'CheckboxGroup',
  Select: 'Select',
  Switch: 'Switch',
  DatePicker: 'DatePicker',
  TimePicker: 'TimePicker',
  InputNumber: 'InputNumber',
  textarea: 'Input'
}
// json中type于gisPlugin组件之间的映射
const gisPluginMap = {
  title: gisFormTitle,
  upload: gisFormUpload,
  table: gisFormTable
}
const initMixin = {
  methods: {
    // 判断组件来源(iview, gisPlugin, custom)
    judgeSource (rule) {
      if (rule.type in iviewMap) {
        // 属于iview
        rule.component = iviewMap[rule.type]
        if (rule.type === 'textarea') {
          rule.iType = 'textarea'
        }
      } else if (rule.type in gisPluginMap) {
        // 属于gisPlugin
        if (rule.type === 'title') {
          rule.hiddenLabel = true
        }
        rule.component = gisPluginMap[rule.type]
        rule.span = rule.span || 24
        rule.custom = true
      } else if (rule.type === 'custom') {
        // 属于自定义
        rule.custom = true
      } else {
        console.error(`${rule.type}为不复合规范的type`)
      }
    },
    // 将用户提供的rule通过maker生成最终的表单元素
    ruleFilter (rules) {
      rules.forEach((element, index) => {
        // 再将自定义的json转化为指定格式
        // 一、根据组件来源进行初始化操作
        this.judgeSource(element)
        // 二、根据config的span对rule进行设置
        element.span = element.span || this.formConfig.span
        // 三、收集表单验证依赖，validate若为true，设置默认情况
        if (element.validate !== null) {
          this.formValidate[element.field] = element.validate === true ? [
            {
              required: true,
              message: `${element.title}不能为空`
            }
          ] : element.validate
        }
        // 四、根据mode进行初始化
        if (this.mode === 'show') {
          if (['select', 'Select', 'switch', 'Switch'].indexOf(element.type) > -1) {
            element.disabled = true
          } else if (['radio', 'RadioGroup', 'check', 'CheckboxGroup'].indexOf(element.type) > -1) {
            element.options.forEach(option => {
              option.disabled = true
            })
          } else {
            element.readonly = true
          }
        }
        // 五、存在children递归
        element.children && this.ruleFilter(element.children)
      })
    }
  }
}

export default initMixin
