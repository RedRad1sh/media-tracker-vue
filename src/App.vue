<template>
  <div class="app">
    <HeaderComponent/>
    <router-view></router-view>
  </div>
  <notifications position="bottom left" group="nots" />
</template>

<script>
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  components: {
    HeaderComponent
  },
  watch: {
    '$route'(to) {
      document.title = to.meta.title || 'MediaTracker';
    },
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/styles.scss";
</style>
