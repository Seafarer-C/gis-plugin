export const pageMixin = {
  data () {
    return {
      // 当前页号。默认为1
      pageNumber: 1,
      // 当前分页大小
      pageSize: 0,
      // 当前查询结果总数
      total: this.tableData.length
    }
  },
  methods: {
    // 根据查询条件以及分页参数获取数据
    getDataList () {
      // 分页信息(pageable为false则为null)
      const pageParam = (this.pageable === null ? this.tableConfig.showPage : this.pageable) ? {
        pageNumber: this.pageNumber,
        pageSize: this.pageSize
      } : null
      // 查询条件(searchable为false则为null)
      // 解构获取不带有方法的formData
      let searchParam = null
      if (this.searchable === null ? this.tableConfig.showSearch : this.searchable) {
        const {
          handleInit,
          handleDisabled,
          handleSet,
          handleReset,
          handleSubmit,
          ...data
        } = this.searchData
        searchParam = data
      }
      // 总查询条件
      const queryParam = {
        ...pageParam,
        ...searchParam
      }
      if (this.fetchName && this.fetchName !== '') {
        this.loading = true
        this.getRequest(this.fetchName, queryParam).then(res => {
          this.data = res.result.records
          this.total = res.result.total
          this.loading = false
        })
      }
    },
    // 页码改变的回调，返回改变后的页码
    changePage (e) {
      this.pageNumber = e
      this.getDataList()
    },
    // 切换每页条数时的回调，返回切换后的每页条数
    changePageSize (size) {
      this.pageSize = size
      this.getDataList()
    },
    // 点击查询
    handleSearchNative () {
      this.getDataList()
    },
    // 点击重置
    handleResetNative () {
      this.searchData.handleReset()
    }
  }
}
