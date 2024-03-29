<template>
  <div class="block">
    <MenuComponent id="menu-include" :active-element="1" />
    <div class="content-main">
      <div class="content-header">Пользовательские списки</div>
      <ul class="tabs">
        <li
          :class="currentTab === 'FILM' ? 'tabbase-active' : 'tabbase'"
          @click="changeContent('FILM')"
        >
          <a href="#" class="text">Фильмы</a>
        </li>
        <li
          :class="currentTab === 'BOOK' ? 'tabbase-active' : 'tabbase'"
          @click="changeContent('BOOK')"
        >
          <a href="#" class="text">Книги</a>
        </li>
        <li
          :class="currentTab === 'GAME' ? 'tabbase-active' : 'tabbase'"
          @click="changeContent('GAME')"
        >
          <a href="#" class="text">Игры</a>
        </li>
      </ul>
      <div class="tabs-panel active" data-index="0">
        <div v-if="currentTab === 'FILM'" class="table-lists-block">
          <div v-if="userListsMovies.length">
            <div v-for="index in filmStatuses.length" :key="index" style="width: 100%">
              <span class="tab-header">{{ filmStatuses[index - 1] }}:</span>
              <ContentTableList
                :content="
                  userListsMovies.filter(
                    (film) => filmStatuses.indexOf(film.action) === index - 1
                  )
                "
                :statuses="filmStatuses"
                :tableHeaderUniq="'Режиссеры'"
                @updateInfoLists="getUserListsById"
              />
            </div>
          </div>
          <div v-else>
            <div class="content-header">
              Не найдено списков для контента: Фильмы
            </div>
          </div>
        </div>
        <div v-if="currentTab === 'GAME'" class="table-lists-block">
          <div v-if="userListsGames.length">
            <div v-for="index in gameStatuses.length" :key="index" style="width: 100%">
              <span class="tab-header">{{ gameStatuses[index - 1] }}:</span>
              <ContentTableList
                :content="
                  userListsGames.filter(
                    (film) => gameStatuses.indexOf(film.action) === index - 1
                  )
                "
                :statuses="gameStatuses"
                :tableHeaderUniq="'Издатели'"
                @updateInfoLists="getUserListsById"
              />
            </div>
          </div>
          <div v-else>
            <div class="content-header">
              Не найдено списков для контента: Игры
            </div>
          </div>
        </div>
        <div v-if="currentTab === 'BOOK'" class="table-lists-block">
          <div v-if="userListsBooks.length">
            <div v-for="index in bookStatuses.length" :key="index" style="width: 100%">
              <span class="tab-header">{{ bookStatuses[index - 1] }}:</span>
              <ContentTableList
                :content="
                  userListsBooks.filter(
                    (film) => bookStatuses.indexOf(film.action) === index - 1
                  )
                "
                :statuses="bookStatuses"
                :tableHeaderUniq="'Авторы'"
                @updateInfoLists="getUserListsById"
              />
            </div>
          </div>
          <div v-else>
            <div class="content-header">
              Не найдено списков для контента: Книги
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from "../components/navigation/MenuComponent.vue";
import ContentTableList from "@/components/UI/ContentTableList.vue";
import { config } from "@/config/config.js";
import axios from "axios";
import UserStorage from "@/service/user-storage-service";
import {filmStatuses, gameStatuses, bookStatuses} from "@/service/global-constants.js";

export default {
  name: "UserLists",
  components: {
    MenuComponent,
    ContentTableList,
  },
  data() {
    return {
      filmStatuses: filmStatuses,
      bookStatuses: bookStatuses,
      gameStatuses: gameStatuses,
      currentTab: "FILM",
      headers: [],
      userListsMovies: [],
      userListsGames: [],
      userListsBooks: [],
    };
  },

  mounted() {
    this.getUserListsById();
  },

  methods: {
    changeContent(contentType) {
      switch (contentType) {
        case "FILM":
          this.currentTab = "FILM";
          break;
        case "BOOK":
          this.currentTab = "BOOK";
          break;
        case "GAME":
          this.currentTab = "GAME";
          break;
      }
    },

    getUserListsById() {
      let backendUrl = `${config.backend.url}/lists/user/` + UserStorage.getUser().id;
      axios.get(backendUrl)
        .then((response) => {
          this.userListsMovies = response.data.movieList;
          this.userListsGames = response.data.gameList;
          this.userListsBooks = response.data.bookList;
        })
        .catch((error) => {
          console.error("Ошибка получения данных с бекенда", error);
          this.$notify({
                    group: 'nots',
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Не удалось получить списки пользователя'
                });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/css/styles.scss";
@import "~@/assets/css/user-lists.css";

.lists-block {
  display: flex;
  flex-direction: column;
  gap: 50px;
}
</style>
