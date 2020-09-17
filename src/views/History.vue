<template>
  <section class="history">
    <section class="history-main">
      <section class="history-top">
        <h1 class="history-title">History</h1>
      </section>
      <section class="history-select">
        <Card
          class="home-card-item"
          link="/history-images"
          title="Images History"/>
      </section>
    </section>
  </section>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/history/Card.vue'
@Component({
  components: {
    Card
  }
})
export default class History extends Vue {}
</script>
<style>
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
.history-select {
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 50px auto;
  animation: topIn .5s ease-out;
}
.history-title {
  font-size: 40px;
  font-weight: 700;
  margin-bottom: 20px;
}


</style>