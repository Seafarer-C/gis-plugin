import util from '../../../utils'

export const tableMixin = {
  data () {
    return {
      // 当前选中的行
      currentRow: null
    }
  },
  methods: {
    // 拖动的回调
    onDragDrop (start, end) {
      util.swapArr(this.data, start, end)
    },
    // 开启 highlight-row 后有效，当表格的当前行发生变化的时候会触发
    onCurrentChange (currentRow, oldRow) {
      this.currentRow = currentRow
      this.$emit('handleRowChange', currentRow, oldRow)
    },
    // 在多选模式下有效，选中某一项时触发
    onSelect (selection, row) {
      this.$emit('handleRowSelect', row, selection)
    },
    // 在多选模式下有效，点击全选时触发
    onSelectAll (selection) {
      this.$emit('handleRowSelectAll', selection)
    },
    // 双击某一行时触发
    onRowDbclick (row, index) {
      this.$emit('handleRowDbclick', row, index)
    },
    // 当前行点击右键时触发
    onContextMenu (row, event) {
      this.$emit('handleRowContextMenu', row, event)
    }
  }
}
