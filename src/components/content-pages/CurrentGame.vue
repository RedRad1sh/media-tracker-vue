<template lang="">
    <div class="block">
      <MenuComponent id="menu-include" active-element="2" />
      <div class="content-main">
        <div class="block-row" style="justify-content: center">
          <div class="content-header">{{ gameobj.title }}</div>
        </div>
        <div class="obj-first-row">
          <div class="obj-img-element">
            <img
              :src= "gameobj.img_url"
              alt="IMAGE"
              class="obj-image"
            />
          </div>
          <div class="obj-info-element">
            <div class="info-header">Информация</div>
            <div class="obj-info">
              <InfoforCurrentPage :titles="gameinfo" :values="gameInfoObj" />
            </div>
          </div>
        </div>
        <div class="obj-first-row">
          <div class="obj-rating-element">
            <div class="info-header">Рейтинги</div>
            <div class="obj-info">
              <InfoforCurrentPage :typeinfo="'RATING'" :titles="gamerating" :values="gameRatingObj" />
            </div>
          </div>
          <div class="obj-rating-element">
          <div class="info-header">Действия</div>
            <div class="obj-actions">
              <span class="text-format">
                Оценка:
              </span>
              <SelectionMark id="rate"> </SelectionMark>
            </div>
            <div class="obj-actions">
              <span class="text-format">
                Списки:
              </span>
              <SelectionContent :ObjectType="type"> </SelectionContent>
            </div>
          </div>
        </div>
        <div class="obj-first-row">
        <div class="obj-description-element">
          <div class="info-header">Описание</div>
            <div class="text-block">
              <div class="game-block" v-html="gameobj.description">
            </div>
          </div>
        </div>
      </div>
      <div class="obj-first-row">
          <div class="obj-rating-element">
            <div class="info-header">Cистемные требования</div>
            <div class="row-rec">
                <div class="block-pc-rec"  v-html="gameobj.pc_req_min"> </div>
                <div class="block-pc-rec"  v-html="gameobj.pc_req_rec" ></div>       
              </div>   
          </div>
        </div>
      <div v-if="gameobj.video" class="obj-first-row">
          <div class="obj-description-element">
            <div class="info-header">Трейлер</div>
            <iframe width="100%" height="720px" :src="gameobj.video" frameborder="0" allowfullscreen></iframe>
          </div>
        </div>
        <div class="create-review">
          <div class="create-review-container">
            <label class="text-block text-block-otz" for="review-field"
              >Оставьте отзыв к игре:</label
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
        
        <div class="obj-first-row">
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
            <span class="review-text"></span>
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
  import axios from 'axios';
  
  export default {
    name: "CurrentFilm",
    components: { MenuComponent, SelectionMark, SelectionContent, InfoforCurrentPage },
  
    data() {
      return {
        type: "Game",
        gameobj: {},
        gameinfo: ['Тип:', 'Дата выхода:', 'Разработчик:', 'Жанры:'],
        gamerating: ['Оценка Metacritic:', 'Оценка MediaTracker:'],
      };
    },


    mounted() {
      this.getGamebyId();
    },
  
    computed:{
      gameInfoObj() {
        return ['Игра', this.gameobj.release_date, this.gameobj.developers, this.gameobj.genres, ];
      },
  
      gameRatingObj() {
        return [this.gameobj.metcrt_rating, this.gameobj.user_rating];
      },
    },

    methods: {
      getGamebyId(){
        let backendUrl = 'http://localhost:3000/games/game/' + this.$route.params.id;

        axios.get(backendUrl)
          .then(response => {
            this.gameobj = response.data;
            console.log(this.gameobj);
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
  @import "~@/assets/css/review-messages.scss";
  </style>
  
