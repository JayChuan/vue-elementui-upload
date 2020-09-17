<template>
  <section class="history">
    <section class="history-main">
      <section class="history-inner">
        <h1 class="history-title">{{title['images']}}</h1>
        <div class="history-search">
          <i class="el-icon-search search-icon"></i>
          <input class="search-input"
            type="search"
            v-model="searchVal"
            placeholder="Search for name"
            @keyup.13="search">
          <i v-show="searchVal" @click="searchVal = ''" class="el-icon-close clear-icon"></i>
        </div>
      </section>
      <section class="history-list">
        <ff-button class="sort-btn" type="icon" @btn-event="toggleSort">
          <i class="el-icon-top" :class="reverse ? 'active': ''"></i>
          <i class="el-icon-bottom" :class="!reverse ? 'active': ''"></i>
        </ff-button>
        <el-tabs v-model="activeName">
          <el-tab-pane label="Completed" name="completed">
            <history-List v-loading="loading" :list="completedList"/>
            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page.sync="completePage"
              :total="completedTotal"
              @current-change="changePage">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Processing" name="processing">
            <ff-button v-if="uploadingList.length > 0" class="refresh-btn" type="normal" @btn-event="refresh">
              <i class="el-icon-refresh-left"></i>
              <span class="refresh-text">Refresh</span>
            </ff-button>
            <history-List v-loading="loading" :list="uploadingList"/>
            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page.sync="progressPage"
              @current-change="changePage"
              :total="uploadingTotal">
            </el-pagination>
          </el-tab-pane>
          <el-tab-pane label="Failed" name="failed">
            <history-List v-loading="loading" :list="failedList"/>
            <el-pagination
              hide-on-single-page
              background
              layout="prev, pager, next"
              :page-size="pageSize"
              :current-page.sync="failedPage"
              @current-change="changePage"
              :total="failedTotal">
            </el-pagination>
          </el-tab-pane>
        </el-tabs>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import historyList from '@/components/history/List.vue'
import ffButton from '@/components/public/Button.vue'
@Component({
  components: {
    historyList,
    ffButton
  }
})
export default class HistoryListPage extends Vue {
  activeName = 'processing'
  title: object = {
    'images': 'Images History'
  }
  uploadingList: object[] = []
  completedList: object[] = []
  failedList: object[] = []
  uploadingTotal = 0
  completedTotal = 0
  failedTotal = 0
  pageSize = 30 // 每页展示数
  searchVal = '' // 搜索值
  loading = true // 加载
  reverse = true // 默认倒序
  completePage = 1 // 完成当前激活的页数
  failedPage = 1 // 失败当前激活页码
  progressPage = 1 // 进行当前激活页码
  refresh (): void {
    this.loading = true
    this.togglePage(0, 0) // 进行中的列表刷新状态
  }
  allHistory (): void {
    this['$api'].get(`/all?offset=0&limit=30&reverse=true`).then((res: object) => {
      const data = res['data']
      this.uploadingList = data['uploading']['records']
      this.uploadingTotal = data['uploading']['total']

      this.completedList = data['completed']['records']
      this.completedTotal = data['completed']['total']

      this.failedList = data['failed']['records']
      this.failedTotal = data['failed']['total']

      if (this.uploadingList.length === 0) {
        this.activeName = 'completed'
      }
      this.loading = false
    })
  }
  changePage (page: number): void {
    this.loading = true
    const offset = (page - 1) * 30
    switch (this.activeName) {
      case 'processing':
        this.togglePage(0, offset, this.reverse)
        break
      case 'completed':
        this.togglePage(1, offset, this.reverse)
        break
      case 'failed':
        this.togglePage(2, offset, this.reverse)
        break
      default:
        this.togglePage(1, offset, this.reverse)
        break
    }
  }
  search () {
    this.loading = true
    switch (this.activeName) {
      case 'processing':
        this.progressPage = 1
        this.togglePage(0, 0, this.reverse, this.searchVal)
        break
      case 'completed':
        this.completePage = 1
        this.togglePage(1, 0, this.reverse, this.searchVal)
        break
      case 'failed':
        this.failedPage = 1
        this.togglePage(2, 0, this.reverse, this.searchVal)
        break
      default:
        this.completePage = 1
        this.togglePage(1, 0, this.reverse, this.searchVal)
        break
    }
  }
  togglePage (status: number, offset: number, reverse = true, word?: string): void {
    this['$api'].get('/info', {
      params: {
        status: status,
        offset: offset,
        limit: 30,
        reverse: reverse,
        word: word
      }
    }).then((res: object) => {
      const data = res['data']
      if (status === 0) {
        this.uploadingList = data['records']
        this.uploadingTotal = data['total']
      }
      if (status === 1) {
        this.completedList = data['records']
        this.completedTotal = data['total']
      }
      if (status === 2) {
        this.failedList = data['records']
        this.failedTotal = data['total']
      }
      this.loading = false
    })
  }
  toggleSort (): void {
    this.reverse = !this.reverse
    this.search()
  }
  mounted(): void {
    this.allHistory()
  }
}
</script>
<style scoped>
.history {
  display: flex;
  flex-direction: column;
  padding: 40px;
  position: relative;
  width: 100%;
  height: 100%;
}
.history-main {
  width: 1000px;
  margin: 0 auto;
}
.history-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 50px;
}
.history-title {
  font-size: 30px;
  font-weight: 700;
}
.history-list {
  padding: 30px 0;
  position: relative;
}
.refresh-btn {
  margin-bottom: 20px;
}
.refresh-text {
  margin-left: 10px;
}
.history-search {
  display: flex;
  align-items: center;
  position: relative;
  width: 260px;
  height: 44px;
  font-size: 18px;
  background-color: #fff;
  padding: 0 30px 0 10px;
  border-radius: 6px;
  border: 1px solid #dfe3e8;
  color: #b7babe;
  line-height: 44px;
}
.search-input {
  flex: 1;
  margin-left: 10px;
  height: 100%;
  font-size: 16px;
}
.search-input::placeholder {
  color: #b7babe;
  font-size: 14px;
  vertical-align: middle;
}
.clear-icon {
  position: absolute;
  right: 5px;
}
.sort-btn {
  position: absolute;
  top: 30px;
  right: 0;
  z-index: 99;
  display: flex;
  align-items: center;
}
.sort-btn .el-icon-top, .sort-btn .el-icon-bottom {
  font-weight: 700;
}
.sort-btn .el-icon-top.active, .sort-btn .el-icon-bottom.active {
  color: #ef233c;
}
</style>