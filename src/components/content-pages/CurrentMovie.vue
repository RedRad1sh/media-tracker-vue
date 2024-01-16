<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="0"/>
    <div class="content-main">
      <div class="block-row" style="justify-content: center">
        <div class="content-header">{{ movieObj.title }}</div>
      </div>
      <div class="obj-first-row">
        <div class="obj-img-element">
          <img
              :src="movieObj.img_url"
              alt="IMAGE"
              class="obj-image"
          />
        </div>
        <div class="obj-info-element">
          <div class="info-header">Информация</div>
          <div class="obj-info">
            <InfoforCurrentPage :titles="movieInfo" :values="movieInfoObj"/>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-rating-element">
          <div class="info-header">Рейтинги</div>
          <div class="obj-info">
            <InfoforCurrentPage :typeInfo="'RATING'" :titles="movieRating" :values="movieRatingObj"/>
          </div>
        </div>
        <div class="obj-rating-element">
          <div class="info-header">Действия</div>
          <div class="obj-actions">
            <span class="text-format">
              Оценка:
            </span>
            <SelectionMark
                id="rate"
                v-model="selectedRating"
                :contentType="'Movie'"
                :contentId=this.movieObj.const_content_id
                @updateReview="getMovieById"
            />
          </div>
          <div class="obj-actions">
            <span class="text-format">
              Списки:
            </span>
            <SelectionContent :ObjectType="type"
                              :ObjectId="movieObj.const_content_id"
                              :ObjectAction="1"
            />
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Описание</div>
          <div class="text-block">
            {{ movieObj.description }}
          </div>
        </div>
      </div>
      <div v-if="movieObj.video" class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Трейлер</div>
          <iframe width="100%" height="720px" :src="movieObj.video" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="create-review">
        <div class="create-review-container">
          <label class="text-block text-block-otz" for="review-field">Оставьте отзыв к фильму:</label>
          <br/>
          <textarea
              id="review-field"
              class="frame3-frame-inputlabels"
              v-model="textAreaMsg"
          ></textarea>
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
        <ReviewMessage :revObj="rev" v-for="rev in reviews" :key="rev.id"/>
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
import router from "@/router/router";
import UserStorage from "@/service/user-storage-service";

export default {
  name: "CurrentMovie",
  components: {MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage, ReviewMessage},

  data() {
    return {
      type: "Movie",
      movieObj: {},
      movieInfo: ['Тип:', 'Год производства:', 'Страны:', 'Длительность:', 'Жанры:', 'Режиссеры:', 'Актеры:'],
      movieRating: ['Оценка Кинопоиск:', 'Оценка IMB:', 'Оценка MediaTracker:'],
      reviews: [],
      selectedRating: '-',
      textAreaMsg: '',
    };
  },

  mounted() {
    this.getMovieById();
  },

  computed: {
    movieInfoObj() {
      return ['Фильм',
        this.movieObj.creation_year,
        this.movieObj.countries,
        this.movieObj.movie_length,
        this.movieObj.genres,
        this.movieObj.directors,
        this.movieObj.actors];
    },

    movieRatingObj() {
      return [this.movieObj.kp_rating,
        this.movieObj.imb_rating,
        this.movieObj.user_rating];
    },
  },

  methods: {
    getMovieById() {
      let backendUrl = `${config.backend.url}/movies/movie/` + this.$route.params.id;

      axios.get(backendUrl)
          .then(response => {
            this.movieObj = response.data.movie;
            this.movieObj.user_rating = response.data.rating;
            this.getReviews();
          })
          .catch(error => {
            console.error('Ошибка получения данных с бекенда', error);
          });
    },

    createReview() {
      if (this.textAreaMsg !== '') {

        const review = {
          user_id: UserStorage.getUser().id,
          content_type: 'Movie',
          content_id: this.movieObj.const_content_id,
          review_message: this.textAreaMsg
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

      axios.get(backendUrl, {params: {content_id: this.movieObj.const_content_id, content_type: 'Movie'}})
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

<style lang="scss" scoped>
@import "~@/assets/css/cur-obj-page.scss";
</style>
