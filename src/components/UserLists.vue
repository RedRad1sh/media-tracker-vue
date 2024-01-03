<template>
  <div class="block">
    <MenuComponent id="menu-include" :active-element="1"/>
    <div class="content-main">
      <div class="content-header">Пользовательские списки</div>
      <ul class="tabs">
        <li :class="content.value === films ? 'tabbase-active' : 'tabbase'" @click="changeContent('FILM')">
          <a href="#" class="text">Фильмы</a>
        </li>
        <li :class="content.value === books ? 'tabbase-active' : 'tabbase'" @click="changeContent('BOOK')">
          <a href="#" class="text">Книги</a>
        </li>
        <li :class="content.value === games ? 'tabbase-active' : 'tabbase'" @click="changeContent('GAME')">
          <a href="#" class="text">Игры</a>
        </li>
      </ul>
      <div class="tabs-panel active" data-index="0">
        <div v-for="index in 3" :key="index" style="width: 100%">
          <span class="tab-header">{{ content.statuses[index - 1] }}:</span>
          <ContentTableList
              :content="content.value.filter(film => film.statusType === index - 1)"
              :statuses="content.statuses"
              @removeElement="removeInList"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MenuComponent from '../components/navigation/MenuComponent.vue';
import ContentTableList from "@/components/UI/ContentTableList.vue";
import {films} from "@/assets/js/user-lists/films";
import {books} from "@/assets/js/user-lists/books";
import {games} from "@/assets/js/user-lists/games";

const filmStatuses = ['Запланировано', 'Смотрю', 'Просмотрено'];
const bookStatuses = ['Запланировано', 'Читаю', 'Прочитано'];
const gameStatuses = ['Запланировано', 'Играю', 'Пройдено'];

export default {
  name: "UserLists",
  components: {
    MenuComponent,
    ContentTableList
  },
  data() {
    return {
      films: films,
      books: books,
      games: games,
      filmStatuses: filmStatuses,
      bookStatuses: bookStatuses,
      gameStatuses: gameStatuses,
      content: {
        value: films,
        statuses: filmStatuses
      },
      headers: []
    }
  },
  methods: {
    changeContent(contentType) {
      const filmHeaders = ["Запланированное", "Смотрю", "Просмотренное"];
      const bookHeaders = ["Запланированное", "Читаю", "Прочитанное"];
      const gameHeaders = ["Запланированное", "Играю", "Пройденное"];

      switch (contentType) {
        case "FILM":
          this.content.value = films;
          this.content.statuses = filmStatuses;
          this.headers = filmHeaders;
          break;
        case "BOOK":
          this.content.value = [];
          this.content.value = books;
          this.content.statuses = bookStatuses;
          this.headers = bookHeaders;
          break;
        case "GAME":
          this.content.value = [];
          this.content.value = games;
          this.content.statuses = gameStatuses;
          this.headers = gameHeaders;
          break;
      }
    },
    removeInList(index){
        console.log (index);
        this.content.value.splice(this.content.value.indexOf(index), 1);
    },
  }
}
</script>

<style scoped>
@import '~@/assets/css/styles.scss';
@import '~@/assets/css/user-lists.scss';
</style>