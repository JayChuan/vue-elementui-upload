<template>
  <button class="button" :class="[type, size]" @click="$emit('btn-event')" :disabled="disabled">
    <slot/>
  </button>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({
  components: {
  }
})
export default class Button extends Vue {
  @Prop({
    type: String,
    default: 'normal',
    required: false
  })
  type!: string
  @Prop({
    type: Boolean,
    default: false,
    required: false
  })
  disabled!: boolean
  @Prop({
    type: String,
    default: '',
    required: false
  })
  size!: string
}
</script>

<style scoped>
.button {
  color: #fff;
  background: #fff;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  font-weight: 600;
  font-size: 14px;
  transition: all .3s ease;
}
.button.normal {
  width: 100px;
  height: 40px;
  color: #2b2d42;
  border: 1px solid #dfe3e8;
  padding: 0 5px;
}
.button.normal:hover,
.button.shadow:hover {
  background-color: #ef233c;
  color: #fff;
  border-color: #ef233c;
}
.button.shadow {
  color: #2b2d42;
  box-shadow: 0 0 4px 4px rgba(203, 207, 211, .4);
}
.button.big {
  width: 180px;
  height: 50px;
}
.button.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: #fff;
  font-size: 20px;
  font-weight: 700;
  background-color: #ef233c;
}
.button.icon {
  width: 66px;
  height: 40px;
  background: transparent;
  font-size: 18px;
  color: #2b2d42;
}
</style>