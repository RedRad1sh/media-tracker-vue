<template>
    <section class="nav-men">
        <input type="checkbox" id="nav-toggle" hidden>
        <div class="mask-content" @click="closeMenu"></div>
        <nav class="nav">
            <ul v-if="isUserAuth()" id="nav" @click="closeMenu">
                <li><a @click="this.$router.push({ path: '/' })">Главная</a></li>
                <li><a @click="this.$router.push({ path: '/profile' })">Профиль</a></li>
                <li><a @click="this.$router.push({ path: '/profile/lists' })">Списки</a></li>
                <li><a id="exit" @click="logOut">Выйти</a></li>
            </ul>
            <ul v-else id="nav" @click="closeMenu">
                <li><a @click="this.$router.push({ path: '/' })">Главная</a></li>
                <li><a @click="this.$router.push({ path: '/login'})">Вход</a></li>
            </ul>
        </nav>
    </section>
</template>

<script>
import UserStorage from "@/service/user-storage-service";

export default {
  name: 'HamburgerMenu',
  methods: {
    closeMenu() {
      document.getElementById('nav-toggle').checked = false;
    },
    logOut() {
      UserStorage.logoutUser();
      this.$router.go();
    },
    isUserAuth() {
      return UserStorage.isUserAuth();
    }
  }
}

</script>

<style scoped>
@import "~@/assets/css/nav-right.scss";

a {
  cursor: pointer;
}
</style>