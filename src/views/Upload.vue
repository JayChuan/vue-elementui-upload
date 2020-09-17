<template>
  <section class="upload">
    <section class="upload-main" v-show="!uploading">
      <el-upload ref="upload" class="upload-input"
        :accept="uploadInfo.accept"
        :limit="uploadInfo.limit"
        :show-file-list="uploadInfo.showFileList"
        :auto-upload="uploadInfo.autoUpload"
        :on-exceed="handleExceed"
        :on-change="changeUpload"
        :before-upload="beforeUpload"
        :http-request="upload"
        :file-list="uploadList"
        drag multiple action="/upload">
        <section class="upload-main-left">
          <h1 class="upload-main-title">Upload Images</h1>
          <p class="upload-main-desc">Drop Your Images</p>
          <p class="upload-main-tip">or</p>
          <p class="upload-main-desc">Click and Pick Your Images </p>
          <p class="upload-main-support">
            support formats: PNG, JPEG, JPG, GIF, up to 30 images, max 1MB each.
          </p>
        </section>
        <section class="upload-main-right">
          <div class="upload-main-file">
            <div class="upload-main-file-top"></div>
            <div class="upload-main-file-process"></div>
            <div class="upload-main-file-module">
              <i class="el-icon-upload"></i>
            </div>
            <div class="upload-main-file-module">
              <i class="el-icon-upload"></i>
            </div>
            <div class="upload-main-file-module">
              <i class="el-icon-upload"></i>
            </div>
            <div class="upload-main-file-float"></div>
          </div>
        </section>
      </el-upload>
    </section>
    <section v-show="uploading" class="upload-main-list">
      <h2 class="upload-main-list-title">
        Uploading List
      </h2>
      <div class="upload-btn-group">
        <ff-button type="normal" @btn-event="handleLeave(handleContinue)">Continue</ff-button>
        <ff-button type="normal" @btn-event="toHistory">History</ff-button>
      </div>
      <Upload-List :list="fileList"/>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UploadList from '@/components/upload/List.vue'
import ffButton from '@/components/public/Button.vue'
import { namespace} from 'vuex-class'
const appStore = namespace('app')
@Component({
  components: {
    UploadList,
    ffButton
  }
})
export default class Upload extends Vue {
  uploadInfo: object = {
    limit: 30,
    showFileList: false,
    autoUpload: true,
    accept: '.png,.jpeg,.jpg,.gif'
  }
  fileList: object[] = []
  uploadList: object[] = []
  @appStore.State(state => state.uploading) uploading: boolean
  @appStore.Action('setUpload') setUpload: Function

  handleExceed (): void {
    const limit = this.uploadInfo['limit']
    this['$alert'](`Only upload ${limit} images at once`, 'Warn', {
      confirmButtonText: 'Confirm',
      callback: () => {
        return
      }
    })
  }
  beforeUpload (file: any) {
    const fileSize = file.size
    if (fileSize > 1024 * 1024 ) {
      this['$notify'].error({
        title: 'Failed',
        message: `[ ${file.name} ] size is greater than 1MB, please compress!`,
        duration: 0,
        offset: 80
      })
      return false
    } else {
      this.fileList.push({
        file: file,
        name: file.name,
        size: file.size,
        progress: 0,
        status: 0,
        url: '',
        time: 0
      })
    }
    this.setUpload(true)
  }
  handleContinue (): void {
    this.setUpload(false)
    this.fileList = [] // 赋值情空
    this.uploadList = [] // 赋值情空
  }
  changeUpload (file: any, fileList: any): void {
    this.uploadList = fileList
  }
  handleLeave (resolve: Function): void {
    this['$confirm'](`Are you sure to leave? Upload list will be cleared，You can go to the history to find the successful upload record`, 'Confirm', {
      distinguishCancelAndClose: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(() => {
      resolve()
    }).catch(() => {
      return
    })
  }
  toHistory (): void {
    this.handleLeave(() => {
      this.setUpload(false)
      this['$router'].push('/history-images').catch(() => { return })
    })
  }
  uploadFileInfo (uid: number): object {
    return this.fileList.filter((item: object) => item['file'].uid === uid)[0]
  }
  upload (data: any): void {
    const fileItem = data.file
    const formData = new FormData()
    const fileInfo = this.uploadFileInfo(fileItem.uid)
    formData.append('file', fileItem)
    this['$api'].post('/upload', formData, {
      header: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress: (progressEvent: any) => {
        const complete = (progressEvent.loaded / progressEvent.total * 100 | 0)
        fileInfo['progress'] = complete
      }
    }).then((res: object) => {
        const data = res['data']
        fileInfo['status'] = data['status']
        fileInfo['url'] = data['url']
        if (data['upload_time']) {
          fileInfo['time'] = data['upload_time']
        }
        if (data['status'] === 2) {
          this['$notify'].error({
            title: 'Failed',
            message: `[ ${fileInfo['name']} ] upload failed!`,
            duration: 0,
            offset: 80
          })
        }
    })
  }
  mounted (): void {
    window.onbeforeunload =  (e: any) => {
      e = e || window.event
      if (this.uploading) {
        if (e) {
          e.returnValue = 'notice'
        }
        return 'notice'
      }
    }
  }
}
</script>
<style>
.upload {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 40px;
  position: relative;
  width: 100%;
  height: 100%;
}
.upload-main {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 600px;
  width: 1000px;
  border: 2px dashed #cbcfd3;
  margin: 0 auto;
  border-radius: 30px;
  background-color: #fff;
  overflow: hidden;
  transition: all .3s ease-out;
  box-shadow: 0 0 16px 10px rgba(203, 207, 211, .4);
  cursor: pointer;
}
.upload-main:hover {
  border-color: #ef233c;
  border-style: solid;
}
.upload-main-left {
  width: 50%;
  animation: fadeLeftIn .5s ease-out;
}
.upload-main-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
}
.upload-main-desc {
  font-weight: 700;
  font-size: 20px;
  color: #000;
}
.upload-main-tip {
  margin: 10px 0;
}
.upload-main-tip, .upload-main-support {
  font-size: 16px;
  color: #8d99ae;
}
.upload-main-support {
  margin-top: 20px;
}
.upload-main-right {
  position: relative;
  z-index: 1;
  width: 50%;
  animation: fadeRightIn .5s ease-out;
}
.upload-main-file {
  position: relative;
  width: 240px;
  height: 320px;
  margin: 0 auto;
  background-color: #fff;
  border: 2px solid #ef233c;
}
.upload-main-right::before, .upload-main-right::after {
  content: '';
  position: absolute;
  z-index: -1;
} 
.upload-main-right::before {
  width: 440px;
  height: 440px;
  left: 50%;
  top: 50%;
  margin: -220px 0 0 -220px;
  background-color: #f4f5f7;
  border-radius: 50%;
}
.upload-main-right::after {
  left: 50%;
  bottom: -12px;
  width: 264px;
  height: 20px;
  margin-left: -132px;
  border-radius: 50%;
  background-color: #fde9eb;
}
.upload-main-file-top {
  width: 100%;
  height: 15px;
  background: #dfe3e7;
}
.upload-main-file-module {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 70px;
  margin: 20px auto;
  background-color: #f4f5f7;
  border: 2px dashed #cbcfd3;
  border-radius: 3px;
}
.upload-main-file-module > .el-icon-upload {
  font-size: 40px;
  color: #dbe0e6;
  margin: 0;
}
.upload-main-file-float {
  position: absolute;
  top: 18%;
  left: -36%;
  width: 80%;
  height: 70px;
  background-color: rgba(141, 153, 174, .5);
  border-radius: 3px;
  transform: rotate(-15deg);
  backdrop-filter: blur(6px);
  box-shadow: 0 4px 6px 0 rgba(141, 153, 174, .8);
}
.upload-main-file-float::after {
  content: '';
  position: absolute;
  top: 5px;
  right: 10px;
  width: 20px;
  height: 3px;
  background: #fff;
  border-radius: 3px;
}
.upload-main-file-process {
  position: relative;
  width: 80%;
  height: 6px;
  margin: 10px auto 0;
  background-color: #fbd1d6;
  overflow: hidden;
}
.upload-main-file-process::after {
  content: '';
  position: absolute;
  left: 0;
  height: 100%;
  width: 20%;
  background-color: #eb1d38;
  animation: move 1.5s ease-in infinite;
}
/* element ui */
.upload-input {
  width: 100%;
  height: 100%;
}
.upload-main-list {
  width: 1000px;
  min-height: 100%;
  margin: 0 auto;
}
.upload-main-list-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
  animation: moveBot .3s ease-out;
}
.upload-btn-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 100%;
  margin: 0 auto 20px;
}
</style>