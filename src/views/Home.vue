<template>
  <section class="home">
    <section class="home-main">
      <h1 class="home-title">Pick the feature</h1>
      <section class="home-cards">
        <Card
          class="home-card-item"
          link="/upload"
          title="Upload Images"
          desc="Upload Images from your device"/>
      </section>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Card from '@/components/main/Card.vue'
@Component({
  components: {
    Card
  }
})
export default class Home extends Vue {}
</script>
<style scoped>
.home {
  padding: 40px;
  width: 100%;
  height: 100%;
}
.home-main {
  width: 1000px;
  margin: 0 auto;
}
.home-title {
  font-size: 40px;
  font-weight: 700;
}
.home-cards {
  display: flex;
  justify-content: center;
  margin: 40px auto;
}
.home-card-item {
  animation: topIn .5s ease-out;
}
</style>