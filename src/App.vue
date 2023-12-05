<template>
  <HeaderComponent/>
  <MainPage/>
</template>

<script>
import MainPage from './components/MainPage.vue'
import HeaderComponent from './components/HeaderComponent.vue'

export default {
  name: 'App',
  components: {
    MainPage, HeaderComponent
  },
}
</script>

<style>
@import "assets/css/styles.scss";
</style>
