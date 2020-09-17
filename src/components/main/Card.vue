<template>
  <div class="card">
    <div class="card-image">
      <i class="el-icon-picture" style="width: 100px ; height: 100px"></i>
    </div>
    <div class="card-text">
      <h2 class="card-subtitle">{{title}}</h2>
      <p class="card-desc">{{desc}}</p>
    </div>
    <ff-button type="normal" size="big" @btn-event="handleLink">ADD</ff-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import ffButton from '@/components/public/Button.vue'
import { namespace } from 'vuex-class'
const appStore = namespace('app')
@Component({
  components: {
    ffButton
  }
})
export default class Button extends Vue {
  @appStore.State(state => state.isLogin) isLogin: boolean
  @Prop({
    type: String,
    default: '',
    required: true
  })
  title!: string
  @Prop({
    type: String,
    default: '',
    required: true
  })
  desc!: string
  @Prop({
    type: String,
    default: '/',
    required: true
  })
  link!: string

  handleLink (): void {
    if (this.isLogin) {
      this['$router'].push(this.link).catch(() => { return })
    } else {
      // 调用google 登录
      this['$notify'].error({
        title: 'Failed',
        message: `Please log in first!`,
        duration: 0,
        offset: 80
      })
    }
  }
}
</script>

<style scoped>
.card {
  width: 320px;
  height: 500px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 16px 8px rgba(203, 207, 211, .4);
  transition: all .3s ease-out;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}
.card:hover {
  border-color: #ef233c;
}
.card:hover .card-image{
  color: #ef233c;
}
.card-image {
  font-size: 90px;
  color: #ececec;
  height: 120px;
  transition: all .3s ease;
  position: relative;
}
.card-image::after {
  content: '';
  width: 100px;
  height: 1px;
  background-color: #ececec;
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -50%;
}
.card-subtitle {
  font-size: 30px;
  font-weight: 700;
}
.card-desc {
  color: #8d99ae;
  padding: 10px 0;
}
</style>