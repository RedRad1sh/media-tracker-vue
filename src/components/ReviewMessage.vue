<template>
  <div class="review-container">
    <div class="user-info">
      <img class="user-img" :src="revobj.profurl"/>
      <div class="user-name-rate">
        <div class="user-name">{{revobj.username}}</div>
        <div class="user-rate">Оценка: {{revobj.mark}}/10</div>
      </div>
    </div>
    <span class="review-text">{{revobj.text}}</span>
  </div>
</template>

<script>
export default {
    props: {
        revobj: {
            type: Object,
            required: true
        }
    },
 
}
</script>

<style scoped>
  @import "~@/assets/css/review-messages.scss";
</style>