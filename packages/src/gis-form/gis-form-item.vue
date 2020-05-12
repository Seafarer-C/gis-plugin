<template>
  <FormItem :label="title" :prop="param.field">
    <!-- 带有labelWarp的组件 -->
    <component
      ref="component"
      :is="type"
      :param="itemParam"
      :readonly="readonly"
      :disabled="disabled"
      :type="itemParam.iType"
      transfer
      v-bind="itemParam"
      v-on="listener"
      v-model="itemValue"
    >
      <!-- 支持组件带有子级元素 -->
      <template v-if="itemParam.options">
        <component
          v-for="option in itemParam.options"
          :key="option.value"
          :label="type === 'RadioGroup' || type === 'CheckboxGroup' ?
                     option.value : option.label"
          :disabled="option.disabled"
          :is="optionNames[type]"
          v-bind="option"
        >
          <Icon :type="option.icon" />
          {{ option.label }}
        </component>
      </template>
    </component>
  </FormItem>
</template>

<script>
import util from "../../utils";

export default {
  name: "GisFormItem",
  props: {
    // 组件类型
    type: {
      type: String | Object,
      default: null
    },
    // 组件值(双向绑定)
    value: {
      type: Object | Array | Number | String | Date,
      default: null
    },
    // 标题
    title: {
      type: String,
      default: ""
    },
    // 该组件的参数
    param: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 组件事件
    listener: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 是否只读
    readonly: {
      type: Boolean,
      default: false
    },
    // 是否无效
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      // 组件的参数
      itemParam: {},
      optionNames: {
        Select: "Option",
        RadioGroup: "Radio",
        CheckboxGroup: "Checkbox"
      }
    };
  },
  model: {
    prop: "value",
    event: "bind"
  },
  computed: {
    itemValue: {
      get() {
        return this.value;
      },
      set(itemValue) {
        this.$emit("bind", itemValue);
      }
    }
  },
  created() {
    this.itemParam = util.deepCopy(this.param);
    delete this.itemParam.type;
    delete this.itemParam.title;
  }
};
</script>

<style>
</style>
