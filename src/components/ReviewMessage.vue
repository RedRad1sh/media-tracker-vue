<template>
  <div class="review-container">
    <div v-if="showContentInfo" class="film-link">
      <!--Не ебу как сделать ссылку (потому что тупой) -->
      <a href="film-page.html">
        <img :src="revobj.contentPicture"/>
        <div class="user-name">{{ revobj.contentTitle }}</div>
      </a>
    </div>
    <div class="review-info">
      <div class="user-info">
        <img class="user-img" :src="revobj.userImage"/>
        <div class="user-name-rate">
          <div class="user-name">{{ revobj.username }}</div>
          <div class="user-rate">Оценка: {{ revobj.rating }}/10</div>
        </div>
      </div>
      <span class="review-text">{{ revobj.review_message }}</span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    revobj: {
      type: Object,
      required: true
    },
    showContentInfo: {
      type: Boolean
    }
  },

}
</script>

<style scoped>
@import "~@/assets/css/review-messages.scss";
@import "~@/assets/css/user-reviews.scss";
</style>