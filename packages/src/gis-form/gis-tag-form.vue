<template>
  <div style="display: flex;height:100%"
       :class="[direction === 'horizontal' ? 'step-form' : '']">
    <!-- 标签组 -->
    <div :class="[direction === 'vertical' ? 'vertical-tag' : '']">
      <Tag v-for="(tag, index) in tags"
           @click.native="setCurrent(index)"
           :key="index"
           :color="index === current ? 'blue' : 'default'"
           size="medium">
        <Icon :type="tag.icon" />
        {{ tag.title }}
      </Tag>
    </div>
    <!-- 对应步骤的表单 -->
    <div class="step-form-content"
         style="padding-left: 5px">
      <gis-form v-for="(rule, index) in rules"
                :key="index"
                v-show="index===current"
                v-model="tagData[index]"
                class="step-form-content--form"
                :config="config"
                :rule="rule"></gis-form>
    </div>
  </div>
</template>

<script>
import GisForm from './index'

export default {
  name: 'GisTagForm',
  components: {
    GisForm
  },
  props: {
    // 步骤条
    tags: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 各表单规则,顺序与步骤条一一对应
    rules: {
      type: Array,
      default: () => {
        return []
      }
    },
    // 排列方向
    direction: {
      type: String,
      default: 'horizontal' // horizontal vertical
    },
    // 配置
    config: {
      type: Object,
      default: () => {
        return {}
      }
    },
    // 双向绑定数据
    data: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data () {
    return {
      // 当前的tag
      current: 0
    }
  },
  model: {
    prop: 'data',
    event: 'bind'
  },
  computed: {
    // 表单组数据
    tagData: {
      get () {
        return this.data
      },
      set (tagData) {
        this.$emit('bind', tagData)
      }
    }
  },
  methods: {
    // 切换tag
    setCurrent (e) {
      this.current = e
    },
    // 上传
    handleSubmit (successCb = () => { }, errorCb = () => { }) {
      let valid = true
      // 表单验证不通过的页号
      let errorTagIndex = []
      this.tagData.forEach((element, index) => {
        element.handleSubmit(() => { }, () => {
          valid = false
          errorTagIndex.push(index)
        })
      })
      if (valid) {
        successCb()
      } else {
        errorCb()
        // 跳转至最小的验证不通过的tag
        this.current = errorTagIndex[0]
      }
    }
  }
}
</script>
