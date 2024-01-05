<template lang="">
  <div class="block">
    <MenuComponent id="menu-include" active-element="0" />
    <div class="content-main">
      <div class="block-row" style="justify-content: center">
        <div class="content-header">{{ filmobj.title }}</div>
      </div>
      <div class="obj-first-row">
        <div class="obj-img-element">
          <img
            :src="filmobj.img_url"
            alt="IMAGE"
            class="obj-image"
          />
        </div>
        <div class="obj-info-element">
          <div class="info-header">Информация</div>
          <div class="obj-info">
            <InfoforCurrentPage :titles="filminfo" :values="filmInfoObj" />
          </div>
        </div>
      </div>
      <div class="obj-first-row">
        <div class="obj-rating-element">
          <div class="info-header">Рейтинги</div>
          <div class="obj-info">
            <InfoforCurrentPage :typeinfo="'RATING'" :titles="filmrating" :values="filmRatingObj" />
          </div>
        </div>
        <div class="obj-rating-element">
        <div class="info-header">Действия</div>
          <div class="obj-actions">
            <span class="text-format">
              Оценка:
            </span>
            <SelectionMark id="rate" v-model="selectedValMark"> </SelectionMark>
          </div>
          <div class="obj-actions">
            <span class="text-format">
              Списки:
            </span>
            <SelectionContent :ObjectType="type" :ObjectId="filmobj.const_content_id" :ObjectAction="1"> </SelectionContent>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
      <div class="obj-description-element">
        <div class="info-header">Описание</div>
        <div class="text-block">
          {{ filmobj.description }}
        </div>
      </div>
    </div>
    <div v-if="filmobj.video" class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Трейлер</div>
          <iframe width="100%" height="720px" :src="filmobj.video" frameborder="0" allowfullscreen></iframe>
        </div>
      </div>
      <div class="create-review">
        <div class="create-review-container">
          <label class="text-block text-block-otz" for="review-field"
            >Оставьте отзыв к фильму:</label
          >
          <br />
          <textarea
            id="review-field"
            class="frame3-frame-inputlabels"
            v-model = "textareamsg"
          ></textarea>
        </div>
        <button
          id="review-button"
          class="button-create-review"
          @click="createMessageElement"
        >
          Опубликовать
        </button>
      </div>
      
      <div class="review-block">
        <ReviewMessage :revobj="rev" v-for = "rev in reviews" :key="rev.id"/>
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

export default {
  name: "CurrentFilm",
  components: { MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage, ReviewMessage },

  data() {
    return {
      type: "Movie",
      filmobj: { },
      filminfo: ['Тип:', 'Год производства:',  'Страны:', 'Длительность:', 'Жанры:', 'Режиссеры:', 'Актеры:'],
      filmrating: ['Оценка Кинопоиск:', 'Оценка IMB:', 'Оценка MediaTracker:'],

      reviews: [{id: 1, username: 'f',   profurl: "https://avtozaryad.ru/local/templates/main/assets/images/user.png", mark: 5, text: 'dddddddsfdfdfdfdfd'}, 
                {id: 2, username: 'f54', profurl: "https://avtozaryad.ru/local/templates/main/assets/images/user.png", mark: 10, text: 'dddddddsfdfdfdfdfd'},
               ],
      selectedValMark: '-',
      textareamsg: '',
    };
  },

  
  mounted() {
      this.getMoviebyId();
    },
  

  computed:{
    filmInfoObj() {
      return ['Фильм', this.filmobj.creation_year, this.filmobj.countries, this.filmobj.movie_length, this.filmobj.genres, this.filmobj.directors, this.filmobj.actors];
    },

    filmRatingObj() {
      return [this.filmobj.kp_rating, this.filmobj.imb_rating, this.filmobj.mtr_rating];
    },
  },

  methods: {
      getMoviebyId(){
        let backendUrl = `${config.backend.url}/movies/movie/` + this.$route.params.id;

        axios.get(backendUrl)
          .then(response => {
            this.filmobj = response.data;
            console.log(this.filmobj);
          })
        .catch(error => {
           console.error('Ошибка получения данных с бекенда', error);
        });
      },

      createMessageElement(){
        if (this.selectedValMark !== '-' && this.textareamsg !== ''){
          this.reviews.push({id: null, username: 'newuser', profurl: "https://avtozaryad.ru/local/templates/main/assets/images/user.png", mark: this.selectedValMark, text: this.textareamsg});
        }
      },

    },

};
</script>

<style scoped>
  @import "~@/assets/css/cur-obj-page.scss";
</style>
