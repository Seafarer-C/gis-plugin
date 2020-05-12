import Vue from 'vue'
import { Modal } from 'view-design'
import util from '../../../utils'

const prefixCls = 'ivu-modal-confirm'

Modal.newInstance = properties => {
  const _props = properties || {}

  const Instance = new Vue({
    data: Object.assign(_props, {
      visible: false,
      content: '',
      loading: false,
      buttonLoading: false,
      ...window.gisPluginConfig.modal
    }),
    ref: _props.ref,
    render(h) {
      // 根据配置渲染内容
      let bodyRender
      if (this.render) {
        bodyRender = h('div', {
          attrs: {
            class: `${prefixCls}-body ${prefixCls}-body-render`
          },
          style: {
            height: _props.fullscreen ? 'calc(100vh - 135px)'
              : _props.height ? `${_props.height}px` : null,
            overflowY: 'auto'
          }
        }, [this.render(h)])
      } else {
        bodyRender = h('div', {
          attrs: {
            class: `${prefixCls}-body`
          }
        }, [
          h('div', {
            domProps: {
              innerHTML: this.content
            }
          })
        ])
      }

      // 根据配置渲染页脚按钮组
      const footerVNodes = []
      if ('buttons' in _props && _props.showFooter) {
        _props.buttons.forEach(btn => {
          footerVNodes.push(h('Button', {
            props: {
              type: btn.type || 'default',
              loading: this.buttonLoading
            },
            on: {
              click: () => {
                // 若有自定义事件，执行并触发
                if (btn.event) {
                  // 将弹窗内部由render生成的vNode的context传递回去，
                  // 用户可以直接通过参数访问render元素内部的元素和方法
                  // TODO: 若为process,context需要改变
                  const context = bodyRender.children[0].child
                  btn.event(context)
                }
                // 若该按钮默认close，则点击之后触发关闭
                if (btn.close) {
                  this.cancel()
                }
              }
            }
          }, btn.title))
        })
      }
      return h(Modal, {
        props: Instance.$data,
        domProps: {
          value: this.visible
        },
        on: {
          input: (status) => {
            this.visible = status
          },
          'on-cancel': this.cancel
        }
      }, [
        h('div', {
          attrs: {
            class: prefixCls
          }
        }, [
          bodyRender,
          'buttons' in _props ? h('div', {
            attrs: {
              class: `${prefixCls}-footer`
            }
          }, footerVNodes) : h('div', { style: { height: '10px' } })
        ])
      ])
    },
    methods: {
      cancel() {
        if (this.closing) return
        this.$children[0].visible = false
        this.buttonLoading = false
        this.remove()
      },
      remove() {
        this.closing = true
        setTimeout(() => {
          this.closing = false
          this.destroy()
        }, 300)
      },
      destroy() {
        this.$destroy()
        if (this.$el) document.body.removeChild(this.$el)
        this.onRemove()
      },
      onRemove() { }
    }
  })

  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  const modal = Instance.$children[0]

  return {
    // 显示弹窗，并重新传入配置，如果配置发生改变即可动态修改
    show(props) {
      // 一旦显示弹窗就立刻根据props替换当前数据
      util.deepAssign(Instance.$data, props)
      // 设置组件销毁事件
      Instance.onRemove = props.onRemove

      modal.visible = true
    },
    // 销毁弹窗
    remove() {
      modal.visible = false
      Instance.buttonLoading = false
      Instance.remove()
    },
    component: modal
  }
}

export default Modal
