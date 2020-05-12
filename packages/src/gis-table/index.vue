<template>
  <div class="the-page">
    <Row style="display:flex;height: 50px;">
      <!-- 查询条件 -->
      <div v-if="searchable === null ? tableConfig.showSearch : searchable">
        <Dropdown
          style="margin-right: 20px"
          placement="bottom-start"
          trigger="custom"
          :visible="searchVisible"
          transfer
        >
          <Button type="primary" @click="searchVisible = !searchVisible" icon="ios-search">条件查询</Button>
          <div slot="list" class="searchWindow">
            <!-- 查询条件 -->
            <gis-form
              style="width: 300px"
              :config="searchConfig"
              :rule="searchRule"
              v-model="searchData"
            />
            <ButtonGroup class="searchWindow-buttons" size="small">
              <Button type="primary" icon="md-search" @click="handleSearchNative">查询</Button>
              <Button icon="md-refresh" @click="handleResetNative">重置</Button>
              <Button icon="md-close" @click="searchVisible = false">关闭</Button>
            </ButtonGroup>
          </div>
        </Dropdown>
      </div>
      <!-- 按钮组 -->
      <template v-if="showButton === null ? tableConfig.showButton : showButton">
        <ButtonGroup>
          <Button
            :size="tableConfig.button.size"
            :ghost="tableConfig.button.ghost"
            v-for="btn in buttons"
            :key="btn.key"
            :type="btn.type"
            :icon="btn.icon"
            :disabled="btn.disabled"
            @click="btnEvent(btn.key)"
          >{{ btn.title }}</Button>
        </ButtonGroup>
      </template>
    </Row>
    <!-- 表格 -->
    <Table
      :data="data"
      :columns="column"
      :height="height"
      :loading="loading"
      @on-drag-drop="onDragDrop"
      @on-current-change="onCurrentChange"
      @on-select="onSelect"
      @on-select-all="onSelectAll"
      @on-row-dblclick="onRowDbclick"
      @on-contextmenu="onContextMenu"
      :draggable="tableConfig.draggable"
      :stripe="tableConfig.stripe"
      :show-header="tableConfig.showHeader"
      :border="tableConfig.border"
      :highlight-row="tableConfig.highlightRow"
      :size="tableConfig.size"
      :ellipsis="tableConfig.ellipsis"
      :tooltip="tableConfig.tooltip"
    ></Table>
    <!-- 页脚 -->
    <Row v-if="pageable === null ? tableConfig.showPage : pageable">
      <Page
        :current="pageNumber"
        :total="total"
        @on-change="changePage"
        @on-page-size-change="changePageSize"
        :page-size="tableConfig.page.pageSize"
        :page-size-opts="tableConfig.page.pageSizeOpts"
        :size="tableConfig.page.size"
        :show-total="tableConfig.page.showTotal"
        :show-elevator="tableConfig.page.showElevator"
        :show-sizer="tableConfig.page.showSizer"
      ></Page>
    </Row>
  </div>
</template>

<script>
import util from "../../utils";
import mixin from "./mixins";
import GisForm from "./../gis-form";

export default {
  name: "GisTable",
  mixins: [mixin.pageMixin, mixin.tableMixin, mixin.buttonMixin],
  components: { GisForm },
  props: {
    // 基本配置信息(默认读取全局)
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 列
    column: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 查询条件
    search: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 表格数据(双向绑定)
    tableData: Array,
    // 是否显示分页信息(优先级高于config中的showPage)
    pageable: {
      type: Boolean,
      default: null
    },
    // 是否显示查询条件(优先级高于config中的showSearch)
    searchable: {
      type: Boolean,
      default: null
    },
    // 是否显示操作按钮(优先级高于config中的showButton)
    showButton: {
      type: Boolean,
      default: null
    },
    // 接口名称
    fetchName: String,
    height: {
      type: String,
      default: ""
    },
    // 按钮组
    buttons: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 查询菜单配置
    searchRule: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  model: {
    prop: "tableData",
    event: "bind"
  },
  data() {
    return {
      // 默认为全局配置(根据用户配置动态更改)
      tableConfig: window.gisPluginConfig.table,
      // 表单加载
      loading: false,
      // 查询菜单显示状态
      searchVisible: false,
      // 查询条件的值
      searchData: {},
      // 查询菜单栏配置
      searchConfig: {
        poptip: true,
        span: 24,
        border: false,
        labelWidth: 70
      }
    };
  },
  computed: {
    // 表格数据(双向绑定)
    data: {
      get() {
        return this.tableData;
      },
      set(tableData) {
        this.$emit("bind", tableData);
      }
    }
  },
  methods: {
    // 触发查询
    handleSearch() {},
    // 初始化
    init() {
      // 将分页大小初始化设置为配置大小，将页面设置为起始页
      this.pageSize = this.tableConfig.page.pageSize;
      this.pageNumber = 1;
    }
  },
  created() {
    // 优先遵循调用者自定义的配置
    util.deepAssign(this.tableConfig, this.config);
  },
  mounted() {
    this.init();
    this.getDataList();
  }
};
</script>
