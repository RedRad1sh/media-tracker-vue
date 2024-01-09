<template>
  <label for="nav-toggle" class="nav-toggle" onclick></label>
  <header>
    <div class="header-div">
      <div class="logo" @click="$router.push('/')">
        <span class="logo-text">Media Tracker</span>
        <img src="~@/assets/general_assets/onlinegaming17375-egk-200h.png" class="onlinegaming1" />
      </div>
      <div class="search">
        <div class="search-field">
          <div class="search-content-select">
            <select v-model="content">
              <option selected value="movies">Фильмы</option>
              <option value="books">Книги</option>
              <option value="games">Игры</option>
            </select>
          </div>
          <input v-model="message" type="text" class="search-input" />
          <a href="#" @click="$router.push(`/${content}?search=${message}`)">
            <img src="~@/assets/general_assets/tailicon7371-ey4g.svg" class="search-icon" />
          </a>
        </div>
      </div>
    </div>
  </header>
  <footer>
    <div class="footer-text">MediaTracker 2023</div>
  </footer>
  <HamburgerMenu />
  <div class="background"></div>
  <div class="background-filter"></div>
</template>

<script>
import HamburgerMenu from '@/components/UI/HamburgerMenu.vue';


export default {
  name: 'HeaderComponent',
  components: { HamburgerMenu },
  data() {
    return {
      content: 'movies'
    }
  }
}

</script>