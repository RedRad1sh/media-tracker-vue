<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="1"/>
    <div class="content-main">
      <div class="block-row" style="justify-content: center">
        <div class="content-header">{{ bookObj.title }}</div>
      </div>
      <div class="obj-first-row">
        <div class="obj-img-element">
          <img
              :src="bookObj.img_url"
              alt="IMAGE"
              class="obj-image"
          />
        </div>
        <div class="obj-info-element">
          <div class="info-header">Информация</div>
          <div class="obj-info">
            <InfoforCurrentPage :titles="bookInfo" :values="bookInfoObj"/>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-rating-element">
          <div class="info-header">Рейтинг</div>
          <div class="obj-info">
            <InfoforCurrentPage :typeinfo="'RATING'" :titles="bookRating" :values="bookRatingObj"/>
          </div>
        </div>
        <div class="obj-rating-element">
          <div class="info-header">Действия</div>
          <div class="obj-actions">
            <span class="text-format">
              Оценка:
            </span>
            <SelectionMark id="rate" v-model="selectedValMark"></SelectionMark>
          </div>
          <div class="obj-actions">
            <span class="text-format">
              Списки:
            </span>
            <SelectionContent :ObjectType="type"></SelectionContent>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Описание</div>
          <div class="text-block">
            {{ bookObj.description }}
          </div>
        </div>
      </div>
      <div class="create-review">
        <div class="create-review-container">
          <label class="text-block text-block-otz" for="review-field">Оставьте отзыв к книге:</label>
          <br/>
          <textarea
              id="review-field"
              class="frame3-frame-inputlabels"
              v-model="textareamsg">
          </textarea>
        </div>
        <button
            id="review-button"
            class="button-create-review"
            @click="createReview"
        >
          Опубликовать
        </button>
      </div>

      <div class="review-block">
        <ReviewMessage :revobj="rev" v-for="rev in reviews" :key="rev.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "@/components/navigation/MenuComponent.vue";
import SelectionMark from "@/components/UI/SelectionMark.vue";
import SelectionContent from "@/components/UI/SelectionContent.vue";
import InfoforCurrentPage from "@/components/InfoforCurrentPage.vue";
import ReviewMessage from "@/components/ReviewMessage.vue";
import axios from 'axios';
import {config} from '@/config/config.js';
import reviewMessage from "@/components/ReviewMessage";
import router from "@/router/router";

export default {
  name: "CurrentBook",
  components: {MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage, ReviewMessage},

  data() {
    return {
      type: "Book",
      bookObj: {},
      bookInfo: ['Тип:', 'Категория:', 'Автор:', 'Издательство:', 'Год издания:', 'Количество страниц:'],
      bookRating: ['Оценка MediaTracker:'],

      reviews: [],
      selectedValMark: '-',
      textareamsg: '',
    };
  },

  mounted() {
    this.getBookById();
  },

  computed: {
    bookInfoObj() {
      return ['Книга',
        this.bookObj.category,
        this.bookObj.author,
        this.bookObj.publisher,
        this.bookObj.published_date,
        this.bookObj.page_count];
    },

    bookRatingObj() {
      return [this.bookObj.mtr_rating];
    },
  },

  methods: {
    getBookById() {
      let backendUrl = `${config.backend.url}/books/book/` + this.$route.params.id;

      axios.get(backendUrl)
          .then(response => {
            this.bookObj = response.data;
            this.getReviews();
          })
          .catch(error => {
            console.error('Ошибка получения данных с бекенда', error);
          });
    },

    createReview() {
      if (this.textareamsg !== '') {

        const review = {
          user_id: '658891c99f8aaf381016ebd0',
          content_type: 'Book',
          content_id: this.bookObj.const_content_id,
          review_message: this.textareamsg
        }

        const backendUrl = `${config.backend.url}/reviews`;
        axios.post(backendUrl, review)
            .then(response => {
              router.go();
            })
            .catch(error => {
              console.error('Ошибка при создании отзыва', error);
            });

      }
    },

    getReviews() {
      const backendUrl = `${config.backend.url}/reviews`;

      axios.get(backendUrl, {params: {content_id: this.bookObj.const_content_id, content_type: 'Book'}})
          .then(response => {
            this.reviews = response.data;
            console.log(this.reviews);
          })
          .catch(error => {
            console.error('Ошибка получения данных с бекенда', error);
          });
    },

  },

};
</script>

<style scoped>
@import "~@/assets/css/cur-obj-page.scss";
</style>
  
