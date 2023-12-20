<template lang="">
  <div class="block">
    <MenuComponent id="menu-include" active-element="1" />
    <div class="content-main">
      <div class="block-row" style="justify-content: center">
        <div class="content-header">{{ filmobj.title }}</div>
      </div>
      <div class="film-first-row">
        <div class="film-img-element">
          <img
            src="@/assets/general_assets/image2415-6yy-400w.png"
            alt="IMAGE2415"
            class="film-image"
          />
        </div>
        <div class="film-info-element">
          <div class="info-header">{{this.$route.params.id}}</div>
          <div class="obj-info">
            <InfoforCurrentPage :titles="filminfo" :values="filmInfoObj" />
          </div>
        </div>
        <div class="film-rating-element">
          <div class="info-header">Рейтинги</div>
          <div class="obj-info">
            <InfoforCurrentPage :typeinfo="'RATING'" :titles="filmrating" :values="filmRatingObj" />
          </div>
        </div>
        <div class="film-rating-element">
        <div class="info-header">Действия</div>
          <div class="film-actions">
            <span class="text-format">
              Оценка:
            </span>
            <SelectionMark id="rate"> </SelectionMark>
          </div>
          <div class="film-actions">
            <span class="text-format">
              Списки:
            </span>
            <SelectionContent :ObjectType="type"> </SelectionContent>
          </div>
      </div>
      </div>
      <div class="film-first-row">
      <div class="film-description-element">
        <div class="info-header">Описание</div>
        <div class="text-block">
          {{ filmobj.description }}
        </div>
      </div>
    </div>
    <div class="film-first-row">
        <div class="film-description-element">
          <div class="info-header">Трейлер</div>
          <iframe width="100%" height="850px" :src="filmobj.video" frameborder="0" allowfullscreen></iframe>
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
          ></textarea>
        </div>
        <button
          id="review-button"
          class="button-create-review"
          onclick="createMessageElement()"
        >
          Опубликовать
        </button>
      </div>
      
      <div class="film-first-row">
        <div class="review-container">
          <div class="user-info">
            <img
              class="user-img"
              src="https://avtozaryad.ru/local/templates/main/assets/images/user.png"
            />
            <div class="user-name-rate">
              <div class="user-name">@username</div>
              <div class="user-rate">Оценка: 7/10</div>
            </div>
          </div>
          <span class="review-text"> </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "@/components/navigation/MenuComponent.vue";
import SelectionMark from "@/components/UI/SelectionMark.vue";
import SelectionContent from "@/components/UI/SelectionContent.vue";
import InfoforCurrentPage from "@/components/InfoforCurrentPage.vue";

export default {
  name: "CurrentFilm",
  components: { MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage },

  data() {
    return {
      type: "FILM",
      filmobj: {
        id: 4647040,
        type: "FILM",
        image_url: ".png",
        title: "Залечь на дно в Брюгге",
        description:
          "Lorem ipsum dolor sit amet consectetur. Magna etiam nulla natoque risus donec laoreet massa. Enim massa auctor urna cras aliquet eget mauris justo. Morbi tristique nascetur sagittis rhoncus massa imperdiet in auctor netus. Libero ipsum proin vitae quis. Tempor aliquet mi tristique ornare facilisis neque justo iaculis. Magna sapien tristique ultricies vel arcu. Dictum ut integer rhoncus tristique enim mattis in sed. Dictum vel nunc velit massa nisl duis nunc netus. Tortor justo elit faucibus sed in risus quam aliquambibendum.",
        kp_rating: 7.68,
        imb_rating: 5.1,
        mtr_rating: 3,
        creation_year: "2008",
        genres: "комедия, преступление, триллер, драма",
        movie_length: "107 мин",
        countries: "Великобритания, США",
        directors: "Мартин Макдона",
        actors:
          "Колин Фаррелл, Брендан Глисон, Рэйф Файнс, Клеманс Поэзи, Джордан Прентис",
        video: "https://www.youtube.com/embed/RcNhbJndBv8",
      },
      filminfo: ['Тип:', 'Год производства:',  'Страны:', 'Длительность:', 'Жанры:', 'Режиссеры:', 'Актеры:'],
      filmrating: ['Оценка Кинопоиск:', 'Оценка IMB:', 'Оценка MediaTracker:'],
    };
  },

  computed:{
    filmInfoObj() {
      return ['Фильм', this.filmobj.creation_year, this.filmobj.countries, this.filmobj.movie_length, this.filmobj.genres, this.filmobj.directors, this.filmobj.actors];
    },

    filmRatingObj() {
      return [this.filmobj.kp_rating, this.filmobj.imb_rating, this.filmobj.mtr_rating];
    },
  },

};
</script>

<style scoped>

@import "~@/assets/css/film-page.css";
@import "~@/assets/css/review-messages.css";
</style>
