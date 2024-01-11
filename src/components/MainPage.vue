<template>
  <input type="checkbox" id="nav-toggle" hidden>
  <div class="mask-content"></div>
  <nav class="nav">
    <ul id="nav"></ul>
  </nav>
  <div class="block">
    <div class="content-main">
      <div class="description">
        <h1>Добро пожаловать на MediaTracker</h1>
        <div class="block-row">
          <div class="information">
            <br>
            <h2>Ваш личный гид в мире развлечений!</h2>
            <br>
            <p>
              Здесь, на MediaTracker, мы предлагаем вам полный контроль над вашими развлекательными
              предпочтениями.
            </p>
            <p>
              Отслеживайте свои любимые фильмы, сериалы, книги и игры, создавайте список просмотра и чтения, и
              получайте персонализированные рекомендации, основанные на ваших интересах.
            </p>
          </div>
          <div class="swiper-container features-container">
            <swiper class="swiper-wrapper" :loop="true" :speed="800" :modules="modules" :autoplay="{delay: 2000}">
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Ведение списков</h3>
                  <p>Создавайте и управляйте списками фильмов, книг и игр, чтобы всегда быть в курсе своих
                    предпочтений.</p>
                  <img src="~@/assets/main-page-images/list-ico.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Рекомендации</h3>
                  <p>Получайте персонализированные рекомендации на основе ваших интересов и
                    предпочтений.</p>
                  <img src="~@/assets/main-page-images/recommend.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
              <swiper-slide class="swiper-slide">
                <div class="feature box">
                  <h3>Коллекция контента</h3>
                  <p>Откройте для себя бесконечный мир развлечений через нашу обширную коллекцию.</p>
                  <img src="~@/assets/main-page-images/library.svg" alt="Формирование рекомендаций">
                </div>
              </swiper-slide>
            </swiper>

          </div>
        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Популярные фильмы</div>
          <a class="move-content-link" @click="$router.push({path: '/movies'})"><span>Открыть фильмы</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->
            <SwpSlide :typeurl="'current-movie'" :newsobj="newsf" />
        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Популярные игры</div>
          <a class="move-content-link" @click="$router.push({path: '/games'})"><span>Открыть игры</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->
          <SwpSlide :typeurl="'current-game'" :newsobj="newsg" />
        </div>

        <div class="block-row" style="justify-content: center">
          <div class="content-header">Бестстеллеры литературы</div>
          <a class="move-content-link" @click="$router.push({path: '/books'})"><span>Открыть книги</span></a>
        </div>

        <div class="swiper-container contents">
          <!-- Additional required wrapper -->
          <SwpSlide :typeurl="'current-book'" :newsobj="newsb" />
        </div>

        <form class="login-form" style="flex-direction: row">
          <p>
            <input type="submit" value="Вход" @click.stop.prevent="$router.push({path: '/login'})"/>
          </p>
          <p>
            <input type="submit" value="Регистрация" @click.stop.prevent="$router.push({path: '/registration'})"/>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { newsmovies, newsgames, newsbooks } from "@/assets/js/mainpage/newscontent.js"; 
import SwpSlide from "@/components/SwpSlide.vue";

export default {

  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    Swiper,
    SwiperSlide,
    SwpSlide,
  },
  setup() {
    return {
      swiperOptions: {
        // cycle
        loop: true,
        // Indicator
        pagination: {
          el: '.swiper-pagination',
          clickable: true 
        },
        // Direction: horizontal or portrait vertical
        direction: 'horizontal',
        // Autoplay
        autoplay: {
          delay: 5000,
          disableOnInteraction: false
        },
        // Switching speed
        speed: 600,
        // Left and right arrow buttons
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      modules: [Navigation, Pagination, Scrollbar, A11y, Autoplay],
    }
  },

  data() {
    return {
      newsf: newsmovies,
      newsg: newsgames,
      newsb: newsbooks,
    };
  },
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import "~@/assets/css/main-page.scss";
@import "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css";
</style>
