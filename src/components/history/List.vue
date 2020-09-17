<template>
  <ul class="upload-list">
    <template v-for="(item, index) of list">
     <Histroy-Item :key="index"
      :name="item.file_name"
      :status="item.status"
      :url="item.url"
      :time="item.upload_time"
      :size="item.size"/>
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import HistroyItem from '@/components/history/Item.vue'
@Component({
  components: {
    HistroyItem
  }
})
export default class HistoryList extends Vue {
  @Prop({
    type: String,
    default: 'normal',
    required: false
  })
  type!: string
  @Prop({
    type: Array,
    required: true
  })
  list!: object[]

  statusFormat(status: string): number {
    switch (status) {
      case 'ready':
        return 3
      case 'success':
        return 1
      default:
        return 3
    }
  }
}
</script>

<style scoped>
.upload-list {
  width: 100%;
  height: auto;
  animation: moveTop .5s ease-out;
}

</style>