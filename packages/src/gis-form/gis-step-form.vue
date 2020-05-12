<template>
  <div style="display: flex;"
       :class="[direction === 'horizontal' ? 'step-form' : '']">
    <!-- 步骤条 -->
    <Steps :current="current"
           class="form-step"
           :direction="direction"
           :class="[direction === 'vertical' ? 'form-step-vertical' : '']">
      <Step v-for="(step, index) in steps"
            :key="index"
            :title="step.title"
            :icon="step.icon"
            :content="step.content"></Step>
    </Steps>
    <!-- 对应步骤的表单 -->
    <div class="step-form-content">
      <gis-form v-for="(rule, index) in rules"
                :key="index"
                v-show="index===current"
                v-model="stepData[index]"
                class="step-form-content--form"
                :config="config"
                :rule="rule"></gis-form>
      <!-- 按钮组 -->
      <ButtonGroup class="step-form-content--buttons">
        <Button v-for="btn in buttons"
                :key="btn.title"
                :type="btn.type"
                @click="btn.event">
          <Icon :type="btn.icon"
                v-if="btn.position === 'left'"></Icon>
          {{ btn.title }}
          <Icon :type="btn.icon"
                v-if="btn.position === 'right'"></Icon>
        </Button>
      </ButtonGroup>
    </div>
  </div>
</template>

<script>
import GisForm from './index'

export default {
  name: 'GisStepForm',
  components: {
    GisForm
  },
  props: {
    // 步骤条
    steps: {
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
        return {
          labelPosition: 'top',
          labelWidth: null,
          border: false,
          span: 24
        }
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
      // 当前的步骤
      current: 0
    }
  },
  model: {
    prop: 'data',
    event: 'bind'
  },
  computed: {
    // 表单组数据
    stepData: {
      get () {
        return this.data
      },
      set (stepData) {
        this.$emit('bind', stepData)
      }
    },
    // 按钮组
    buttons () {
      let btns = [
        {
          title: '返回上一步',
          event: this.stepBack,
          icon: 'ios-arrow-back',
          type: 'primary',
          position: 'left'
        },
        {
          title: '下一步',
          event: this.nextStep,
          icon: 'ios-arrow-forward',
          type: 'primary',
          position: 'right'
        }
      ]
      if (this.current === 0) {
        btns.splice(0, 1)
      } else if (this.current === this.steps.length - 1) {
        btns[1].title = '完成'
        btns[1].icon = "ios-checkmark-circle-outline"
        btns[1].type = 'success'
        btns[1].event = this.finish
      }
      return btns
    }
  },
  methods: {
    // 返回上一步
    stepBack () {
      this.current = this.current - 1
    },
    // 下一步
    nextStep () {
      this.current++
    },
    // 完成
    finish () {
      C(this.stepData)
      this.$emit('handleSubmit')
    }
  }
}
</script>
