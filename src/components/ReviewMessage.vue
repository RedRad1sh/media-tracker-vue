<template>
  <div class="review-container">
    <div v-if="showContentInfo" class="film-link">
      <!--Не ебу как сделать ссылку (потому что тупой) -->
      <a href="#" @click="openContentPage()">
        <img class="image-content" :src="revObj.contentPicture"/>
        <div class="user-name">{{ revObj.contentTitle }}</div>
      </a>
    </div>
    <div class="review-info">
      <div class="user-info">
        <img class="user-img" :src="revObj.userImage"/>
        <div class="user-name-rate">
          <div class="user-name">{{ revObj.username }}</div>
          <div class="user-rate">Оценка: {{ revObj.rating }}/10</div>
        </div>
      </div>
      <span class="review-text">{{ revObj.review_message }}</span>
    </div>

  </div>
</template>

<script>
import router from "@/router/router";

export default {
  props: {
    revObj: {
      type: Object,
      required: true
    },
    showContentInfo: {
      type: Boolean
    }
  },

  methods:{

    openContentPage(){
      let backendUrl = `/current-${this.revObj.contentType.toLowerCase()}/${this.revObj.contentId}`;
      router.push(backendUrl)
    }
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/review-messages.scss";
@import "~@/assets/css/user-reviews.scss";
</style>