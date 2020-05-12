<template>
  <div class="process-form">
    <gis-form ref="gisProcessForm"
              :rule="rule"
              :config="config"
              v-model="formData" />
    <Button type="success"
            class="process-submit"
            @click="processSubmit"
            long>SUBMIT</Button>
  </div>
</template>

<script>
import gisForm from './../../gis-form'

export default {
  name: 'gisProcessForm',
  data () {
    return {
      formData: {},
      config: {
        labelPosition: 'top',
        span: 24
      },
      rule: [
        {
          type: "input",
          title: "流程名称",
          field: 'input',
          validate: true
        },
        {
          type: "input",
          title: "自定义标题",
          field: 'title'
        },
        {
          type: "input",
          title: "选择下一步骤处理人",
          field: 'next',
          icon: 'ios-contact',
          validate: true
        },
        {
          type: "radio",
          title: "重要等级",
          field: 'level',
          options: [
            {
              value: 'London',
              label: '重要'
            },
            {
              value: 'New York',
              label: '普通'
            },
            {
              value: 'Ottawa',
              label: '一般'
            }
          ],
          value: '普通'
        },
        {
          type: "textarea",
          title: "备注",
          field: 'bz',
          autosize: true
        }
      ]
    }
  },
  methods: {
    // 提交流程
    processSubmit () {
      // 获取到表单所在的vNode
      const businessForm =
        this.$parent.$children[1].$children[2].$children[0]
      this.formData.handleSubmit((data) => {
        // 流程信息填写无误，执行业务表单信息的填写
        businessForm.handleSubmit(data)
      })
    }
  }
}
</script>
