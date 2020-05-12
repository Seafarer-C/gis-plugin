import util from '../../../utils'

export const buttonMixin = {
  data () {
    return {
      // 在组件中内置默认的方法，按钮key在以下默认中出现则先执行默认方法，再执行用户回调
      defaultBtnEvent: {
        // 刷新
        refresh: this.handleBtnRefresh,
        // 重置
        reload: this.handleBtnReload
      }
    }
  },
  methods: {
    // 触发按钮回调，并将当前选中行传给调用者
    btnEvent (key) {
      this.defaultBtnEvent[key] && this.defaultBtnEvent[key]()
      this.$emit(`handleBtn${util.firstUpper(key)}`, this.currentRow)
    },
    // 刷新
    handleBtnRefresh () {
      // 重新获取数据
      this.getDataList()
      // 选中行重置
      this.currentRow = null
    },
    // 重置
    handleBtnReload () {
      // 将参数初始化再加载数据
      this.init()
      this.getDataList()
      // 选中行重置
      this.currentRow = null
    }
  }
}
