import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import './assets/css/animation.css'
import {
  Button,
  Select,
  Pagination,
  Container,
  Header,
  Main,
  Upload,
  Progress,
  Message,
  MessageBox,
  Notification,
  Tabs,
  TabPane,
  Autocomplete,
  Loading,
  Popover,
  Dropdown,
  DropdownMenu,
  DropdownItem
} from 'element-ui'
import { api } from './utils/request'
import VueClipboard from 'vue-clipboard2'

Vue.config.productionTip = false

Vue.component(Button.name, Button)
Vue.component(Select.name, Select)
Vue.component(Pagination.name, Pagination)
Vue.component(Pagination.name, Pagination)
Vue.component(Container.name, Container)
Vue.component(Header.name, Header)
Vue.component(Main.name, Main)
Vue.component(Upload.name, Upload)
Vue.component(Progress.name, Progress)
Vue.component(Tabs.name, Tabs)
Vue.component(TabPane.name, TabPane)
Vue.component(Autocomplete.name, Autocomplete)
Vue.component(Popover.name, Popover)
Vue.component(Dropdown.name, Dropdown)
Vue.component(DropdownMenu.name, DropdownMenu)
Vue.component(DropdownItem.name, DropdownItem)

Vue.use(Loading.directive)
Vue.use(VueClipboard)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message
Vue.prototype.$notify = Notification

Vue.prototype.$api = api

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
