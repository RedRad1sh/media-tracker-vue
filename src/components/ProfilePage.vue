<template>
  <div class="block">
    <MenuComponent id="menu-include" active-element="-1" />
    <div class="content-main">
      <div class="profile-info container-row">
        <div class="image-frame">
          <div class="image_block" @click="openModal"  >
            <img
              :src="this.profileData.img_url" alt="image31416" class="image" @error="replaceByDefault"/>
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
import UserStorage from "@/service/user-storage-service";
const DEFAULT_IMG = "https://i.pinimg.com/originals/a6/15/46/a6154624251b16c421b23da5c9511000.jpg";
export default {
  name: "ProfilePage",
  props: {
    msg: String,
  },
  components: {
    MenuComponent, ChangeImgProfileModal, StatsRowType, DoughnutChart
  },
  data() {
    return {
      showModal: false,
      profileData: {},
      allContentStats: {},
      movieStats: [],
      gameStats: [],
      bookStats: [],
    };
  },

    computed: {
      chartDataAll() { return { data: { genres: this.allContentStats.contentType,
                                        count:  this.allContentStats.count 
                                      }
                              }
      },

      chartDataMovie() {
        return this.movieStats;
      },

      chartDataGame() {
        return this.gameStats;
      },

      chartDataBook() {
        return this.bookStats;
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
      let backendUrl = `${config.backend.url}/users/`+ UserStorage.getUser().id;
      axios.get(backendUrl)
            .then(response => {
              this.profileData = response.data;
            })
            .catch(error => {
               console.error('Ошибка получения данных с бекенда', error);
            });
    },
    getUserProfileStats(){
      let backendUrl = `${config.backend.url}/profile/stats/` + UserStorage.getUser().id;
      axios.get(backendUrl)
            .then(response => {
              this.allContentStats = response.data.allContentStats;
              this.movieStats = response.data.movieStats;
              this.gameStats = response.data.gameStats;
              this.bookStats = response.data.bookStats;
            })
            .catch(error => {
               console.error('Ошибка получения данных с бекенда', error);
            });
    },
    replaceByDefault(e) {
      e.target.src = DEFAULT_IMG
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
