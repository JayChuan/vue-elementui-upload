<template>
  <el-container>
    <el-header class="header" height="60px">
      <router-link class="logo" to='/'></router-link>
      <div class="header-right">
        <ff-button v-if="!isLogin" @btn-event="handleLogin">Login</ff-button>
        <User v-else/>
      </div>
    </el-header>
    <el-main class="main">
      <slot></slot>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ffButton from '@/components/public/Button.vue'
import User from '@/components/public/User.vue'
import { namespace } from 'vuex-class'

const appStore = namespace('app')

@Component({
  components: {
    ffButton,
    User
  }
})
export default class Layout extends Vue {
  @appStore.State(state => state.isLogin) isLogin: boolean
  @appStore.Action('loginIn') loginIn: Function

  handleLogin (): void {
    // if (this['$route'].query['access_token']) {
    //   const token = this['$route'].query['access_token']
    //   this.loginIn(token)
    // } else {
    //   // 调用google登录
    //   console.log('google login')
    // }
    const token = 'adadassssbs'
    this.loginIn(token)
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 40px;
  background-color: #fff;
  width: 100%;
  min-width: 1080px;
}
.logo {
  width: 120px;
  height: 40px;
  background-image: url('../../assets/images/logo.png');
}
.header-right {
  display: flex;
  align-items: center;
}
.main {
 height: calc(100vh - 60px);
 margin-top: 60px;
}
</style>