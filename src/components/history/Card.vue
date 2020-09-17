<template>
  <router-link :to="link">
    <div class="card">
      <div class="card-image">
        <i class="el-icon-picture" style="width: 100px ; height: 100px"></i>
      </div>
      <h2 class="card-title">{{title}}</h2>
    </div>
  </router-link>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Button extends Vue {
  @Prop({
    type: String,
    default: '/',
    required: true
  })
  link!: string
  @Prop({
    type: String,
    required: true
  })
  title!: string
}
</script>

<style scoped>
.card {
  width: 200px;
  height: 240px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 16px 8px rgba(203, 207, 211, .4);
  transition: all .3s ease-out;
  border-width: 2px;
  border-style: solid;
  border-color: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.card:hover {
  border-color: #ef233c;
}
.card:hover .card-image{
  color: #ef233c;
}
.card-image {
  font-size: 70px;
  color: #ececec;
  transition: all .3s ease;
  position: relative;
}
.card-title {
  font-size: 20px;
  font-weight: 700;
}
</style>