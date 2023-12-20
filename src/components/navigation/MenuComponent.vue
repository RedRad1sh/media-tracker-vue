<template>
  <div class="menu-tabs">
    <div :class="activeElement === '0' ? 'menu-tabbase-active' : 'menu-tabbase'">
      <a :class="activeElement === '0' ? 'menu-active-button' : 'menu-button'" href="/FilmsPage">Фильмы</a>
    </div>
    <div :class="activeElement === '1' ? 'menu-tabbase-active' : 'menu-tabbase'">
      <a :class="activeElement === '1' ? 'menu-active-button' : 'menu-button'" href="/BooksPage">Книги</a>
    </div>
    <div :class="activeElement === '2' ? 'menu-tabbase-active' : 'menu-tabbase'">
      <a :class="activeElement === '2' ? 'menu-active-button' : 'menu-button'" href="/GamesPage">Игры</a>
    </div>
    <div :class="activeElement === '3' ? 'menu-tabbase-active' : 'menu-tabbase'">
      <a :class="activeElement === '3' ? 'menu-active-button' : 'menu-button'" href="/RecommendationsPage">Рекомендации</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MenuComponent',
  props: ["activeElement"]
}

</script>

<style scoped>
#menu-include {
  z-index: 0;
  height: 60px;
  justify-content: center;
  width: 1400px;
}

.menu-tabs {
  display: flex !important;
  justify-content: space-around !important;
  align-items: center;
  flex-shrink: 0;
  border-radius: 3px;
  flex-direction: row;
  background-color: rgba(3, 0, 22, 0.32);
}

.menu-tabbase {
  display: flex;
  padding: 8px 16px;
  overflow: hidden;
  align-self: stretch;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  justify-content: center;
}

.menu-button {
  color: white;
  height: auto;
  text-align: center;
  line-height: 24px;
  font-size: 20px;
  font-stretch: normal;
  text-decoration: none;
}

.menu-tabbase-active {
  display: flex;
  padding: 8px 16px;
  overflow: hidden;
  align-self: stretch;
  align-items: center;
  flex-shrink: 0;
  border-radius: 5px;
  justify-content: center;
  background-color: var(--dl-color-base-white);
}

.menu-active-button {
  height: auto;
  font-size: 18px;
  text-align: center;
  font-weight: 500;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
  color: black;
}

.menu-active-button:visited {
  color: black;
}

@media screen and (max-width: 1400px) {
  .menu-button {
    font-size: 16px !important;
  }

  .menu-button-active {
    font-size: 16px !important;
  }

  #menu-include {
    height: 60px;
    justify-content: center;
    width: 95%;
  }
}

@media screen and (max-width: 850px) {
  .menu-tabbase {
    padding: 8px 4px;
  }

  .menu-tabbase {
    padding: 8px 4px;
  }
}
</style>