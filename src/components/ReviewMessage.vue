<template>
  <div class="review-container">
    <div class="user-info">
      <div class="film-link">
        <!--Не ебу как сделать ссылку  -->
        <a href="film-page.html">
          <img :src="revobj.coverPicture"/>
          <div class="user-name">{{ revobj.name }}</div>
        </a>
      </div>
      <img class="user-img" :src="revobj.profurl"/>
      <div class="user-name-rate">
        <div class="user-name">{{ revobj.username }}</div>
        <div class="user-rate">Оценка: {{ revobj.mark }}/10</div>
      </div>
    </div>
    <span class="review-text">{{ revobj.text }}</span>
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
@import "~@/assets/css/user-reviews.scss";
</style>