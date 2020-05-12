<template>
  <Form
    ref="gisForm"
    :labelPosition="formConfig.labelPosition"
    :model="formData"
    :class="[
          formConfig.border ? 'form-border' : '',
          formConfig.poptip ? 'form-poptip' : ''
        ]"
    :rules="formValidate"
    :label-width="formConfig.labelPosition==='top' ? null : formConfig.labelWidth"
  >
    <i-col v-for="(item, index) in formRule" :key="index" :span="item.span">
      <!-- gisPlugin或用户自定义组件 -->
      <component
        :ref="'component-' + item.field"
        v-if="item.custom && item.hiddenLabel"
        :is="item.component"
        v-bind="item"
        transfer
        :param="item"
        v-model="formData[item.field]"
        :readonly="item.readonly"
        :disabled="item.disabled"
        v-on="item.on"
      />
      <!-- iview原生组件 -->
      <gis-form-item
        :ref="'gisFormItem-' + item.field"
        v-else
        :type="item.component"
        :title="item.title"
        :param="item"
        :listener="item.on"
        :readonly="item.readonly"
        :disabled="item.disabled"
        v-model="formData[item.field]"
      ></gis-form-item>
    </i-col>
  </Form>
</template>

<script>
import util from "../../utils";
import GisFormItem from "./gis-form-item";

import { autoMixin, initMixin } from "./mixins";

export default {
  name: "GisForm",
  mixins: [autoMixin, initMixin],
  components: {
    GisFormItem
  },
  props: {
    // 当前的操作模式(add新增,edit编辑,show查看,approval审核)
    mode: {
      type: String,
      default: "add"
    },
    // 基础配置(默认继承全局)
    config: {
      type: Object,
      default: () => {
        return {};
      }
    },
    // 表单生成规则
    rule: {
      type: Array,
      default: () => {
        return [];
      }
    },
    // 接口名称
    portName: {
      type: String,
      default: null
    },
    // 主键(查询条件)
    param: {
      type: String,
      default: null
    },
    // 表单结果，双向绑定
    data: {
      type: Object,
      default: () => {
        return {};
      }
    }
  },
  data() {
    return {
      // 默认为全局配置(根据用户配置动态更改)
      formConfig: util.deepCopy(window.gisPluginConfig.form),
      // 经过转化后提供给form-create的配置
      formRule: [],
      // 表单验证数组
      formValidate: {}
    };
  },
  model: {
    prop: "data",
    event: "bind"
  },
  computed: {
    // 表单结果
    formData: {
      get() {
        return this.data;
      },
      set(formData) {
        this.$emit("bind", formData);
      }
    }
  },
  methods: {
    // 获取自定义组件
    // 判断组件是否为custom(gisPlugins也属于custom),若是，
    // 则逐级向下查找到自定义组件所在的vNode,供各生命周期访问其内部钩子函数
    getCustomComponent(element) {
      if (element.custom && element.hiddenLabel) {
        return this.$refs[`component-${element.field}`][0];
      } else if (element.custom && !element.hiddenLabel) {
        return this.$refs[`gisFormItem-${element.field}`][0].$refs.component;
      } else {
        return null;
      }
    },
    // 初始化
    handleInit() {
      this.formRule.forEach(element => {
        const customNode = this.getCustomComponent(element);
        if (customNode && customNode.onInit) {
          customNode.onInit(this.mode);
        }
      });
    },
    // 禁用
    handleDisabled() {},
    // 重置
    handleReset() {
      this.$refs.gisForm.resetFields();
    },
    /**
     * 操作自定义组件
     * @param {String} field rule中的field
     * @param {Function} cb 自定义组件触发onSet的回调函数
     */
    handleSet(field, cb) {
      const element = this.formRule.filter(v => v.field === field)[0];
      const customNode = this.getCustomComponent(element);
      if (customNode && customNode.onSubmit) {
        this.formData[element.field] = customNode.onSet(cb);
      }
    },
    // 上传
    handleSubmit(successCb = () => {}, errorCb = () => {}) {
      // 上传之前先调取所有自定义组件的onSubmit方法
      this.formRule.forEach(element => {
        const customNode = this.getCustomComponent(element);
        if (customNode && customNode.onSubmit) {
          this.formData[element.field] = customNode.onSubmit();
        }
      });
      // 获取到所有自定义组件内部的值之后，进行统一的表单验证
      this.$refs.gisForm.validate(valid => {
        if (valid) {
          // 解构获取不带有方法的formData
          let {
            handleInit,
            handleDisabled,
            handleSet,
            handleReset,
            handleSubmit,
            ...data
          } = this.formData;
          // 验证成功，执行回调
          successCb(data);
        } else {
          errorCb();
        }
      });
    }
  },
  created() {
    this.formRule = this.rule;
    // 优先遵循调用者自定义的配置
    util.deepAssign(this.formConfig, this.config);
    // 在渲染前对rule进行一次拦截过滤(包括根据formConfig初始化表单元素样式,收集表单验证依赖)
    this.ruleFilter(this.formRule);
  },
  mounted() {
    // 调用初始化函数
    this.handleInit();
    // 为formData绑定上初始化、禁用、重置、设置、上传五个方法，通过双向绑定供外界调用
    this.formData.handleInit = this.handleInit;
    this.formData.handleDisabled = this.handleDisabled;
    this.formData.handleReset = this.handleReset;
    this.formData.handleSet = this.handleSet;
    this.formData.handleSubmit = this.handleSubmit;
  }
};
</script>
