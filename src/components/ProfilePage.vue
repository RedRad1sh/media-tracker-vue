<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="-1" />
    <div class="content-main">
      <div class="profile-info container-row">
        <div class="image-frame">
          <div class="image_block" @click="openModal">
            <img
              :src="this.profileData.img_url" alt="image31416" class="image"/>
            <div class="img-overfl">
              <img src="../assets/general_assets/plus-wt.svg" alt="" />
            </div>
          </div>
          <div class="image-text">
            <span>Добро пожаловать, {{ this.profileData.login }}!</span>
          </div>
        </div>
        <div class="chart-block">
           <div class="chart-title">Просмотренный контент</div>
           <DoughnutChart :chartData="chartDataAll" :chartOptions="chartOptions"/>
        </div>
        <div class="navigation">
          <a @click="this.$router.push({ path: `/profile/lists` })" class="text-s"> 📋 Списки контента </a>
          <a @click="this.$router.push({ path: `/profile/user-reviews` })" class="text-s"> 📒 Оставленные рецензии </a>
        </div>
      </div>
      <StatsRowType :rowTitle="'Статистика по жанрам фильмов:'" :chartData="chartDataMovie"/>
      <StatsRowType :rowTitle="'Статистика по жанрам игр:'"     :chartData="chartDataGame"/>
      <StatsRowType :rowTitle="'Статистика по жанрам книг:'"    :chartData="chartDataBook"/>
    </div>
    <ChangeImgProfileModal :show="showModal" @closeModal="closeModal"/>
  </div>
</template>

<script>
import MenuComponent from "./navigation/MenuComponent.vue";
import ChangeImgProfileModal from "./internal/ChangeImgProfileModal.vue";
import DoughnutChart from './DoughnutChart.vue';
import StatsRowType from './StatsRowType.vue';
import { config } from '@/config/config.js';
import axios from "axios";

export default {
  name: "ProfilePage",
  props: {
    msg: String,
  },
  components: {
    MenuComponent, ChangeImgProfileModal, DoughnutChart, StatsRowType
  },
  data() {
    return {
      showModal: false,
      profileData: {},
      allContentStats: {},
      movieStatsPlanningGenres: {},
      movieStatsWatchingGenres: {},
      movieStatsWatchedGenres: {},
      gameStatsPlanningGenres: {},
      gameStatsWatchingGenres: {},
      gameStatsWatchedGenres: {},
      bookStatsPlanningGenres: {},
      bookStatsWatchingGenres: {},
      bookStatsWatchedGenres: {},
      test1: [],


      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            align: 'start',
            display: true,
            font: {
              size: 24,
              family: 'sans-serif',
            },
            color: 'white',
         },
         legend: {
          position: "right",
          labels: {
            font: {
              size: 14,
            },
            color: "white",
          },    
         },
       },
      },
    };
  },

    computed: {
      chartDataAll() { return this.getChartData(this.allContentStats.contentType, this.allContentStats.count ) },

      chartDataMovie() {
        const actions = ['Запланировано', 'Смотрю', 'Просмотрено'];
        const moviePData =  this.getChartData(this.movieStatsPlanningGenres.genres, this.movieStatsPlanningGenres.count);
        const movieWData =  this.getChartData(this.movieStatsWatchingGenres.genres, this.movieStatsWatchingGenres.count);
        const movieWDData = this.getChartData(this.movieStatsWatchedGenres.genres,  this.movieStatsWatchedGenres.count );
       return {actions: actions,
               data: [moviePData, movieWData, movieWDData],
              };
      },

      chartDataGame() {
        const actions = ['Запланировано', 'Прохожу', 'Пройдено'];
        const gamePData =  this.getChartData(this.gameStatsPlanningGenres.genres, this.gameStatsPlanningGenres.count);
        const gameWData =  this.getChartData(this.gameStatsWatchingGenres.genres, this.gameStatsWatchingGenres.count);
        const gameWDData = this.getChartData(this.gameStatsWatchedGenres.genres,  this.gameStatsWatchedGenres.count );
       return {actions: actions,
               data: [gamePData, gameWData, gameWDData],
              };
      },

      chartDataBook() {
        const actions = ['Запланировано', 'Читаю', 'Прочитано'];
        const bookPData =  this.getChartData(this.bookStatsPlanningGenres.genres, this.bookStatsPlanningGenres.count);
        const bookWData =  this.getChartData(this.bookStatsWatchingGenres.genres, this.bookStatsWatchingGenres.count);
        const bookWDData = this.getChartData(this.bookStatsWatchedGenres.genres,  this.bookStatsWatchedGenres.count );
       return {actions: actions,
               data: [bookPData, bookWData, bookWDData],
              };
      },

  },

  methods: {
    openModal() {
      this.showModal = true;
    },
    closeModal(){
      this.showModal = false;
      this.getUserProfileInfo();
    },
    getUserProfileInfo(){
      let backendUrl = `${config.backend.url}/users/` + '658891c99f8aaf381016ebd0'
      axios.get(backendUrl)
            .then(response => {
              this.profileData = response.data;
            })
            .catch(error => {
               console.error('Ошибка получения данных с бекенда', error);
            });
    },
    getUserProfileStats(){
      let backendUrl = `${config.backend.url}/profile/stats/` + '658891c99f8aaf381016ebd0'
      console.log  (backendUrl);
      axios.get(backendUrl)
            .then(response => {
              this.allContentStats = response.data.allContentStats;
              this.movieStatsPlanningGenres = response.data.movieStats.planningGenres;
              this.movieStatsWatchingGenres = response.data.movieStats.watchingGenres;
              this.movieStatsWatchedGenres = response.data.movieStats.watchedGenres;

              this.gameStatsPlanningGenres = response.data.gameStats.planningGenres;
              this.gameStatsWatchingGenres = response.data.gameStats.watchingGenres;
              this.gameStatsWatchedGenres = response.data.gameStats.watchedGenres;

              this.bookStatsPlanningGenres = response.data.bookStats.planningGenres;
              this.bookStatsWatchingGenres = response.data.bookStats.watchingGenres;
              this.bookStatsWatchedGenres = response.data.bookStats.watchedGenres;

              this.test1 = response.data.bookStats;
            })
            .catch(error => {
               console.error('Ошибка получения данных с бекенда', error);
            });
    },
    getChartData(labels, data ){
      return { labels: labels,
               datasets: [{ data: data, },],
      };
    }
  },
  mounted() {
    this.getUserProfileInfo();
    this.getUserProfileStats();   
  },
};
</script>

<style scoped>
  @import "~@/assets/css/profile.scss";
  @import "~@/assets/css/styles.scss";
</style>
