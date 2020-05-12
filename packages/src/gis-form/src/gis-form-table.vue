<template>
  <div>
    <div class="gis-form-title nav">
      {{ label }}
      <Icon class="title-button" title="新增" @click="handleAdd" type="md-add-circle"></Icon>
    </div>
    <Table
      border
      :columns="tableColumn"
      size="small"
      @on-drag-drop="onDragDrop"
      :data="tableData"
      v-bind="param"
    ></Table>
  </div>
</template>

<script>
import util from "../../../utils";
// json中type于iview组件名称之间的映射
const iviewMap = {
  input: "Input",
  radio: "RadioGroup",
  check: "CheckboxGroup",
  select: "Select",
  switch: "Switch",
  date: "DatePicker",
  time: "TimePicker",
  number: "InputNumber",
  Input: "Input",
  RadioGroup: "RadioGroup",
  CheckboxGroup: "CheckboxGroup",
  Select: "Select",
  Switch: "Switch",
  DatePicker: "DatePicker",
  TimePicker: "TimePicker",
  InputNumber: "InputNumber"
};

export default {
  name: "gisFormTable",
  props: {
    column: {
      type: Array,
      default: () => {
        return [];
      }
    },
    label: String,
    data: {
      type: Array,
      default: () => {
        return [];
      }
    },
    param: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  model: {
    prop: "data",
    event: "bind"
  },
  computed: {
    tableData: {
      get() {
        return this.data;
      },
      set(tableData) {
        this.$emit("bind", tableData);
      }
    }
  },
  data() {
    return {
      // 经过转换的column
      tableColumn: []
    };
  },
  methods: {
    // A: 组件内部事件
    // 新增数据
    handleAdd() {
      this.tableData.push({});
    },
    // 删除数据
    handleRemove(index) {
      const item = this.tableData.splice(index, 1)[0];
      this.$emit("on-remove", item);
    },
    // 拖拽事件
    onDragDrop(start, end) {
      util.swapArr(this.data, start, end);
    },
    // 过滤处理column
    tableColumnGenerator(column) {
      const vm = this;
      column.forEach(element => {
        if (element.type in iviewMap) {
          element.render = function(h, params) {
            return h(iviewMap[element.type], {
              props: {
                value: params.row[element.key],
                // 不受父级影响,不会被遮罩
                transfer: true
              },
              on: {
                "on-change": function(event) {
                  if (element.type === "input" || element.type === "Input") {
                    vm.tableData[params.index][element.key] =
                      event.target.value;
                  } else {
                    vm.tableData[params.index][element.key] = event;
                  }
                }
              }
            });
          };
        }
      });
      column.push({
        title: "操作",
        width: 40,
        align: "center",
        render: (h, params) => {
          return h("Button", {
            props: {
              type: "text",
              size: "small",
              icon: "md-remove-circle"
            },
            domProps: {
              title: "移除"
            },
            style: {
              color: "#ed4014"
            },
            on: {
              click: () => {
                vm.handleRemove(params.index);
              }
            }
          });
        }
      });
    },

    // B: 组件响应外部事件
    onInit() {
      this.tableData = [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        }
      ];
    }
  },
  mounted() {
    this.tableColumn = util.deepCopy(this.column);
    this.tableColumnGenerator(this.tableColumn);
  }
};
</script>

<style>
.title-button {
  margin-right: 20px;
  float: right;
  line-height: 28px;
  cursor: pointer;
}
.ivu-input-number {
  width: 100% !important;
}
</style>
