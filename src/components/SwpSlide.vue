<template>
<swiper class="swiper-wrapper" :modules="modules" :navigation="navigation" :speed="600" > 
   <div class="buttons">
              <div class="swiper-button-prev"></div>
              <div class="swiper-button-next"></div>
   </div>
  <swiper-slide class="swiper-slide"  v-for = "obg in newsobj" :key="obg._id">
    <h1>{{ obg.title }}</h1>
    <p> {{ obg.description }}
    <br>
    <br> 
        {{ obg.subinfo }}
    </p>
    <form class="login-form" style="flex-direction: row">
      <p>
        <input type="submit" value="Открыть" @click.stop.prevent="$router.push({path: `/${typeurl}/${obg._id}`})"/>
      </p>
    </form>
   <img style="object-position: 0 0" class="img-movie" :src="obg.img_url" alt="Формирование рекомендаций">
  </swiper-slide>
</swiper>
</template>
<script>

import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';

export default {
  components: {
    Swiper,
    SwiperSlide,
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
    props: {
        typeurl: {
            type: String,
            required: true
        },
        newsobj: {
            type: Object,
            required: true
        }
    },   
}
</script>

<style scoped>
   @import "~@/assets/css/main-page.scss";
   @import "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"; 
</style>