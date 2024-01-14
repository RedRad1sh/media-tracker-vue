<template>
  <select v-model="selectedValue" @change="updateRating()">
    <option value="-">-</option>
    <option v-for="number in numbers" :key="number" :value="number">{{ number }}</option>
  </select>
</template>

<script>
import UserStorage from "@/service/user-storage-service";
import {config} from "@/config/config";
import axios from "axios";

export default {
  props: {
    contentType: {
      type: String,
      required: true,
    },
    contentId: {
      type: String,
      required: true,
    },

  },

  data() {
    return {
      selectedValue: '-',
      numbers: Array.from({length: 10}, (_, index) => index + 1)
    };
  },

  methods: {
    updateRating() {
      const review = {
        user_id: UserStorage.getUser().id,
        content_type: this.contentType,
        content_id: this.contentId,
        rating: this.selectedValue
      }

      const backendUrl = `${config.backend.url}/reviews/rating`;
      axios.post(backendUrl, review)
          .then(() => this.$emit('updateReview'))
          .catch(error => {
            console.error('Ошибка при обновлении оценки отзыва', error);
          });
    }
  }

};
</script>

<style scoped>
select {
  position: relative;
  transition: border-color 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  border: 0;
  font-family: var(--dl-font-family);
  text-align: center;
  background: rgba(100, 100, 255, 0.3);
  color: white;
  font-size: 20px;
  padding: 5px;
  height: 35px;
}
</style>