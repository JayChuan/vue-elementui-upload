import { api } from '../utils/request'
import { getCookie, setCookie, deleteCookie } from '../utils'
import { Notification } from 'element-ui'

const state = {
  isLogin: getCookie('islogin') === '1' || false,
  email: getCookie('email') || '',
  uploading: false,
  errorInfo: ''
}
const mutations = {
  setValue (state: any, data: any) {
    state[data.key] = data.value
  }
}
const actions = {
  loginIn ({commit}: any, token = '') {
    api.post(`/login`, {'id_token': token}).then((res: object) => {
      const data = res['data']
      setCookie('email', data['email'], 7)
      setCookie('islogin', '1', 7)
      commit('setValue', {
        key: 'isLogin',
        value: true
      })
      commit('setValue', {
        key: 'email',
        value: data['email']
      })
      if (token) {
        Notification({
          title: 'Login success',
          message: '',
          type: 'success',
          offset: 80
        })
      }
    })
  },
  loginOut ({commit}: any) {
    api.post(`/logout`).then(() => {
      deleteCookie('email')
      deleteCookie('islogin')
      commit('setValue', {
        key: 'isLogin',
        value: false
      })
      commit('setValue', {
        key: 'email',
        value: ''
      })
      Notification.error({
        title: 'Login out',
        message: ``,
        offset: 80
      })
    })
  },
  setUpload ({commit}: any, val: boolean) {
    commit('setValue', {
      key: 'uploading',
      value: val
    })
  },
  handleError ({commit}: any, msg = '') {
    commit('setValue', {
      key: 'errorInfo',
      value: msg
    })
    Notification.error({
      title: 'Failed',
      message: msg,
      offset: 80
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}