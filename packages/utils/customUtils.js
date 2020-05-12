import store from '@/core/store'

// 注册dict方法
export const dict = (key, isEmpty) => {
  const dicts = store.state.dict

  if (JSON.stringify(dicts.all) === '{}') {
    dicts.all = JSON.parse(window.localStorage.getItem('dictsAll'))
  }

  const dic = dicts.all[key]
  const arr = isEmpty ? [{
    label: '-',
    value: ''
  }] : []
  if (Array.isArray(dic)) {
    return [...arr, ...dic.map(x => {
      return {
        label: x.title,
        value: x.value
      }
    })]
  } else {
    console.error(`dict值:${key}无效`)
    return [{
      label: '-',
      value: 0
    }]
  }
}

// 注册getRequest请求
export const getRequest = () => {

}

// 注册postRequest请求
export const postRequest = () => {

}
