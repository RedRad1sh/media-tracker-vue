<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="4"/>
    <div class="content-main">
      <div class="content-header">Оставленные рецензии</div>
      <ReviewMessage :showContentInfo="true"
                     :revobj="rev" v-for="rev in reviews" :key="rev.id"/>
    </div>
  </div>
</template>

<script>
import MenuComponent from "@/components/navigation/MenuComponent.vue";
import ReviewMessage from "@/components/ReviewMessage.vue";
import {config} from "@/config/config";
import axios from "axios";

export default {
  name: "UserReviews",
  components: {
    MenuComponent,
    ReviewMessage
  },

  methods: {
    getUserReviews() {
      // let backendUrl = `${config.backend.url}/reviews/` + this.$route.params.id;
      let backendUrl = `${config.backend.url}/reviews/user/658891c99f8aaf381016ebd0`;

      axios.get(backendUrl)
          .then(response => {
            this.reviews = response.data;
          })
          .catch(error => {
            console.error('Ошибка получения данных с бекенда', error);
          });
    }
  },

  mounted() {
    this.getUserReviews();
  },

  data() {
    return {
      reviews: [],
      selectedValMark: '-',
      textareamsg: '',
    };
  }

};
</script>

<style scoped>
@import "~@/assets/css/cur-obj-page.scss";
</style>