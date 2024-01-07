<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="4"/>
    <div class="content-main">
      <div class="content-header">Оставленные рецензии</div>

      <div class="review-block">
        <ReviewMessage :revobj="rev" v-for = "rev in reviews" :key="rev.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "@/components/navigation/MenuComponent.vue";
import ReviewMessage from "@/components/ReviewMessage.vue";

export default {
  name: "UserReviews",
  components: {
    MenuComponent,
    ReviewMessage
  },

  data() {
    return {
      reviews: [{id: 1, username: 'f',   profurl: "https://avtozaryad.ru/local/templates/main/assets/images/user.png", mark: 5, text: 'dddddddsfdfdfdfdfd'},
        {id: 2, username: 'f54', profurl: "https://avtozaryad.ru/local/templates/main/assets/images/user.png", mark: 10, text: 'dddddddsfdfdfdfdfd'},
      ],
      selectedValMark: '-',
      textareamsg: '',
    };
  }

};
</script>

<style scoped>
@import "~@/assets/css/cur-obj-page.scss";
/*@import "~@/assets/css/review-messages.scss";
@import "~@/assets/css/user-reviews.scss";*/
</style>