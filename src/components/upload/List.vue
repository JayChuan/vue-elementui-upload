<template>
  <ul class="upload-list">
    <template v-for="(item, index) of list">
     <Upload-Item 
     :progress="item.progress + '%'"
     :key="index"
     :index="index"
     :name="item.name"
     :size="item.size"
     :status="item.status"
     :time="item.time"
     :url="item.url"/>
    </template>
  </ul>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import UploadItem from '@/components/upload/Item.vue'
@Component({
  components: {
    UploadItem
  }
})
export default class UploadList extends Vue {
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
}
</script>

<style scoped>
.upload-list {
  width: 100%;
  height: auto;
  animation: moveTop .5s ease-out;
}

</style>