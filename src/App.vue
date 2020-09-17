<template>
  <div id="app">
    <Layout>
      <router-view/>
    </Layout>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import Layout from '@/components/public/Layout.vue'
import { namespace} from 'vuex-class'
const appStore = namespace('app')
@Component({
  components: {
    Layout
  }
})
export default class App extends Vue {
  @appStore.State(state => state.isLogin) isLogin: boolean
  @appStore.State(state => state.uploading) uploading: boolean
  @appStore.Action('setUpload') setUpload: Function
  @Watch('isLogin')
  isLoginChange(val: boolean) {
    if (!val) {
      this['$router'].push({ path: '/' }).catch(() => { return })
    }
  }
}
</script>

<style>

</style>
