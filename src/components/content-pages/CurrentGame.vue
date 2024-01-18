<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="2"/>
    <div class="content-main">
      <div class="block-row" style="justify-content: center">
        <div class="content-header">{{ gameObj.title }}</div>
      </div>
      <div class="obj-first-row">
        <div class="obj-img-element">
          <img
              :src="gameObj.img_url"
              alt="IMAGE"
              class="obj-image"
          />
        </div>
        <div class="obj-info-element">
          <div class="info-header">Информация</div>
          <div class="obj-info">
            <InfoforCurrentPage :titles="gameInfo" :values="gameInfoObj"/>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-rating-element">
          <div class="info-header">Рейтинги</div>
          <div class="obj-info">
            <InfoforCurrentPage :typeInfo="'RATING'" :titles="gameRating" :values="gameRatingObj"/>
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
                :contentType="'Game'"
                :contentId="gameObj.const_content_id"
                :ObjectMark="gameObj.rating"
                @updateReview="getGameById"
            />
          </div>
          <div class="obj-actions">
              <span class="text-format">
                Списки:
              </span>
            <SelectionContent :ObjectType="type"
                              :ObjectId="gameObj.const_content_id"
                              :ObjectAction="gameObj.user_action"
                              @selectChanged="getGameById"/>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Описание</div>
          <div class="text-block">
            <div class="game-block" v-html="gameObj.description">
            </div>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-rating-element">
          <div class="info-header">Cистемные требования</div>
          <div class="row-rec">
            <div class="block-pc-rec" v-html="gameObj.pc_req_min"></div>
            <div class="block-pc-rec" v-html="gameObj.pc_req_rec"></div>
          </div>
        </div>
      </div>
      <div v-if="gameObj.video" class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Трейлер</div>
          <iframe width="100%" height="720px" :src="gameObj.video" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="create-review">
        <div class="create-review-container">
          <label class="text-block text-block-otz" for="review-field">
            Оставьте отзыв к игре:
          </label>
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
  name: "CurrentGame",
  components: {MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage, ReviewMessage},

  data() {
    return {
      type: "Game",
      gameObj: {},
      gameInfo: ['Тип:', 'Дата выхода:', 'Разработчик:', 'Жанры:'],
      gameRating: ['Оценка Metacritic:', 'Оценка MediaTracker:'],
      reviews: [],
      selectedRating: '-',
      textAreaMsg: '',
    };
  },

  mounted() {
    this.getGameById();
  },

  computed: {
    gameInfoObj() {
      return ['Игра',
        this.gameObj.release_date,
        this.gameObj.developers,
        this.gameObj.genres];
    },

    gameRatingObj() {
      return [this.gameObj.metcrt_rating, this.gameObj.user_rating];
    },
  },

  methods: {
    getGameById() {
      let backendUrl = `${config.backend.url}/games/game/` + this.$route.params.id + '/' + UserStorage.getUser().id;

      axios.get(backendUrl)
          .then(response => {
            this.gameObj = response.data.game;
            this.gameObj.rating = response.data.rating;
            this.gameObj.user_action = response.data.userList.action;
            this.gameObj.video = this.gameObj.video ? this.gameObj.video.replace('http', 'https') : ""
            this.getReviews();
          })
          .catch(error => {
            console.error('Ошибка получения данных с бекенда', error);
            this.$notify({
            group: 'nots',
            type: 'error',
            title: 'Ошибка',
            text: 'Не удалось получить информацию по игре'
          });
          });
    },

    createReview() {
      if (this.textAreaMsg !== '') {

        const review = {
          user_id: UserStorage.getUser().id,
          content_type: 'Game',
          content_id: this.gameObj.const_content_id,
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

      axios.get(backendUrl, {params: {content_id: this.gameObj.const_content_id, content_type: 'Game'}})
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

<style lang="scss"  scoped>

@import "~@/assets/css/cur-obj-page.scss";

</style>
  
