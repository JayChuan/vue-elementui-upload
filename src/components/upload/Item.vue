<template>
  <li class="upload-item">
    <div class="upload-item-left">
      <div class="upload-status" :class="classFormat(status)">
        <i v-if="status === 0" class="el-icon-refresh"></i>
        <i v-if="status === 1" class="el-icon-check"></i>
        <i v-if="status === 2" class="el-icon-close"></i>
      </div>
      <div class="upload-info">
        <span class="upload-name">{{name}}<span v-if="size" class="upload-size"> -{{sizeFormat(size)}}</span></span>
        <span v-show="time > 0" class="upload-time">{{timeFormat(time)}}</span>
      </div>
    </div>
    <div class="upload-item-right" v-if="status === 1">
      <span class="upload-link" :title="url">{{url}}</span>
      <el-popover
        placement="left"
        width="400"
        trigger="click">
          <img :src="url" :alt="name">
          <i slot="reference" class="el-icon-view" title="preview"></i>
      </el-popover>
      <i class="el-icon-document-copy" title="copy"
        v-clipboard:copy="url"
        v-clipboard:success="onCopy"
        v-clipboard:error="onError"></i>
    </div>
    <div class="upload-progress" v-show="status !== 1" :style="{ width: progress }"></div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class UploadItem extends Vue {
  @Prop({
    type: String,
    default: '',
    required: true
  })
  name!: string
  @Prop({
    type: Number,
    default: '',
    required: false
  })
  index!: number
  @Prop({
    type: String,
    default: '0%',
    required: true
  })
  progress!: string
  @Prop({
    type: Number,
    default: 0,
    required: false
  })
  status!: number
  @Prop({
    type: Number,
    default: 0,
    required: false
  })
  size!: number
  @Prop({
    type: Number,
    default: 0,
    required: false
  })
  time!: number
  @Prop({
    type: String,
    default: '',
    required: false
  })
  url!: string

  classFormat (status: number): string {
    switch (status) {
      case 0:
      case 3:
        return 'waiting'
      default:
        return ''
    }
  }
  timeFormat (time: number): string {
    const date = new Date(time * 1000)
    const [secs, mins, hours, day, month, year ] = [
      date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(),
      date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(),
      date.getHours() < 10 ? '0' + date.getHours() : date.getHours(),
      date.getDate() < 10 ? '0' + date.getDate() : date.getDate(),
      date.getMonth() + 1 < 10 ? '0' + (date.getMonth()+1) : date.getMonth()+1,
      date.getFullYear()
    ]
    return `${year}.${month}.${day} ${hours}:${mins}:${secs}`
  }
  sizeFormat (size: number): string {
    return (size / 1024).toFixed(1) + 'KB'
  }
  onCopy () {
    this['$notify']({
      title: 'success',
      message: 'Copy success',
      type: 'success',
      offset: 80
    })
  }
  onError () {
    this['$notify'].error({
      title: 'Failed',
      message: `Copy failed`,
      offset: 80
    })
  }
}
</script>

<style scoped>
.upload-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 76px;
  background-color: #fff;
  margin-bottom: 20px;
  padding: 20px 30px;
  box-shadow: 0 4px 4px 0 rgba(203, 207, 211, .4);
}
.upload-item:last-child {
  margin-bottom: 50px;
}
.upload-item-left, .upload-item-right {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 1;
}
.upload-item-left {
  animation: fadeLeftIn .5s ease-out;
}
.upload-info {
  display: flex;
  flex-direction: column;
  width: 300px;
  text-align: left;
}
.upload-time {
  font-size: 12px;
  color: #747e8f;
  margin-top: 10px;
}
.upload-link {
  font-weight: 600;
  font-size: 14px;
  width: 460px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.upload-status {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background-color: #fff;
  border: 1px solid #dfe3e8;
  border-radius: 50%;
  color: #ef233c;
  margin-right: 20px;
}
.upload-status.waiting {
  animation: rotate 2s linear infinite;
}
.upload-status .el-icon-refresh,
.upload-status .el-icon-check,
.upload-status .el-icon-close {
  font-weight: 700;
  font-size: 20px;
}
.upload-status .el-icon-check {
  color: #67C23A;
  font-size: 26px;
}
.upload-item-right {
  animation: moveTop .8s ease-out;
}
.upload-item-right .el-icon-document-copy,
.upload-item-right .el-icon-view {
  color: #747e8f;
  cursor: pointer;
  font-weight: 700;
  font-size: 16px;
}
.upload-item-right .el-icon-document-copy:hover,
.upload-item-right .el-icon-view:hover {
  color: #409EFF;
}
.upload-item-right .el-icon-view  {
  margin: 0 20px 0 10px;
}
.upload-name {
  font-size: 16px;
  font-weight: 600;
}
.upload-size {
  font-size: 12px;
  color: #747e8f;
}
.upload-progress {
  width: 0%;
  height: 100%;
  position: absolute;
  left: 0;
  background: rgba(223, 227, 232, .6);
  border-bottom: 3px solid #ef233c;
  transition: width .3s ease;
  box-shadow: 0 2px 4px 0 rgba(239, 35, 60, .2);
}
</style>