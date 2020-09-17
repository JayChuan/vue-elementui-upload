<template>
  <el-dropdown placement="bottom-end" trigger="click">
    <ffButton class="avatar" type="circle">{{email.split('')[0].toUpperCase()}}</ffButton>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item disabled icon="el-icon-user">{{email}}</el-dropdown-item>
      <el-dropdown-item icon="el-icon-time" @click.native="toHistory">History</el-dropdown-item>
      <el-dropdown-item icon="el-icon-back" @click.native="handleLoginOut">Logout</el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ffButton from '@/components/public/Button.vue'
import { namespace } from 'vuex-class'

const appStore = namespace('app')
@Component({
  components: {
    ffButton
  }
})
export default class Layout extends Vue {
  @appStore.State(state => state.email) email: string
  @appStore.Action('loginOut') loginOut: Function

  handleLoginOut (): void {
    this.loginOut()
  }
  toHistory (): void {
    this['$router'].push('/history').catch(() => { return })
  }
}
</script>

<style scoped>
.user-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  line-height: 1.2;
  color: #2b2d42;
}
.user-list-item:last-child {
  border-bottom: none;
}
.user-popover {
  padding: 0 !important;
}
</style>