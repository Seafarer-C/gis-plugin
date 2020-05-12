/**
 * gis-form 自动http请求
 */
const autoMixin = {
  props: {
    // 是否启用autoMixin自动与接口交互
    autoable: {
      type: Boolean,
      default: false
    },
    // 后端接口
    portName: {
      type: String,
      default: null
    },
    // 参数
    param: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      // 接口action名称
      actions: {}
    }
  },
  methods: {
    // 自动初始化
    autoInit () {
      this.getRequest(`/${this.portName}/${this.actions.show}/${this.param}`).then(res => {
        this.formData = res.result
      })
    },
    // 自动化新增
    autoAdd () {
      // 新增前置事件
      this.$emit('beforeAdd', this.formData)
      this.postRequest(`/${this.portName}/${this.actions.add}`, this.formData).then(res => {
        // 新增后置事件
        this.$emit('afterAdd', res)
      })
    },
    // 自动化编辑
    autoEdit () {
      // 编辑前置事件
      this.$emit('beforeEdit', this.formData)
      this.postRequest(`/${this.portName}/${this.actions.edit}`, this.formData).then(res => {
        // 编辑后置事件
        this.$emit('afterEdit', res)
      })
    }
  },
  created () {
    // 根据配置初始化接口action
    this.actions = {
      add: this.formConfig.add,
      edit: this.formConfig.edit,
      show: this.formConfig.show
    }
  },
  mounted () {
    if (this.autoable && ['show', 'edit'].indexOf(this.mode) > -1) {
      this.autoInit()
    }
  }
}

export default autoMixin
