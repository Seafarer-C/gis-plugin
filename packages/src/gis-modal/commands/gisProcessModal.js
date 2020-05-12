import { confirm } from './gisModal'
import processForm from './../src/process-form'

export const gisProcessModal = (props = {}) => {
  // 是否显示右侧流程框
  const showProcessForm = props.mode !== 'show'
  props.render = function (h) {
    return h('div', {
      style: {
        display: 'flex',
        height: '100%'
      },
      class: {
        'process-form-modal': true
      }
    }, [
      h('Tabs', {
        props: {
          value: 'form',
          size: 'small',
          type: 'card'
        },
        style: {
          width: showProcessForm ? '80%' : '100%'
        }
      }, [
        h('TabPane', {
          props: {
            label: '表单信息',
            name: 'form'
          },
          class: {
            hello: true
          }
        }, [props.formRender(h)]),
        h('TabPane', {
          props: {
            label: '流程信息',
            name: 'process'
          }
        }, ['process'])
      ]),
      showProcessForm ? h(processForm, {
        style: {
          width: '19%',
          marginLeft: '1%'
        }
      }, []) : null
    ])
  }
  return confirm(props)
}
