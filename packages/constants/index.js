
// 设置默认配置
export const defaultConfig = {
  form: {
    inline: false, // 是否开启行内表单模式
    labelPosition: 'right', // left、right、top
    border: true, // 是否显示边框
    poptip: true, // 是否使用气泡提示错误
    labelWidth: 100, // 表单域标签的宽度，所有的 FormItem 都会继承 Form 组件的 label-width 的值
    span: 12, // 单个元素宽度,默认的span大小(最大为24)
    gutter: 10, // 栅格间距，单位 px，左右平分
    clearable: true, // 是否显示清空按钮
    add: 'add', // 新增action
    edit: 'edit', // 编辑action
    show: 'get' // 查询action
  },
  table: {
    stripe: false, // 是否显示斑马纹
    border: false, // 是否显示纵向边框
    showHeader: true, // 是否显示表头
    disabledHover: false, // 禁用鼠标悬停时的高亮
    highlightRow: true, // 是否支持单选高亮
    size: 'small', // 表格大小
    noDataText: '暂无数据', // 数据为空时显示的提示内容
    draggable: false, // 是否支持拖拽
    ellipsis: false, // 开启后，文本将不换行，超出部分显示为省略号
    tooltip: false, // 开启后，文本将不换行，超出部分显示为省略号，并用 Tooltip 组件显示完整内容
    showPage: false, // 是否显示分页
    showSearch: false, // 是否显示查询条件
    showButton: true, // 是否显示操作按钮
    page: { // 分页配置
      pageSize: 20, // 默认分页大小
      pageSizeOpts: [10, 20, 50], // 每页条数切换的配置
      size: 'small', // 可选值为small（迷你版）或不填（默认）
      simple: true, // 简洁版
      showTotal: true, // 显示总数
      showElevator: true, // 显示电梯，可以快速切换到某一页
      showSizer: true, // 显示分页，用来改变page-size
      transfer: false // 是否将弹层放置于 body 内，在 Tabs、带有 fixed 的 Table 列内使用时，建议添加此属性，它将不受父级样式影响，从而达到更好的效果
    },
    search: { // 查询条件框配置

    },
    button: { // 操作按钮配置
      size: 'default',
      ghost: false
    }
  },
  modal: {
    showHeader: true, // 是否展示页头
    showFooter: true, // 是否展示页脚
    scrollable: false, // 是否允许弹窗显示时背后页面滚动
    closable: true, // 是否显示右上角关闭按钮
    draggable: false, // 是否支持拖拽
    maskClosable: false, // 点击遮罩层关闭弹窗
    closing: false, // 关闭有动画，期间使用此属性避免重复点击
    title: '弹窗' // 默认的弹窗标题
  }
}
