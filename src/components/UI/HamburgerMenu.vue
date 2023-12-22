<template>
    <section class="nav-men">
        <input type="checkbox" id="nav-toggle" hidden>
        <div class="mask-content"></div>
        <nav class="nav">
            <ul v-if="!this.$cookies.get('authorized=true')" id="nav">
                <li><a @click="this.$router.push({ path: '/' })">Главная</a></li>
                <li><a @click="this.$router.push({ path: '/profile' })">Профиль</a></li>
                <li><a @click="this.$router.push({ path: '/profile/lists' })">Списки</a></li>
                <li><a id="exit" @click="this.$router.push({ path: 'home' })">Выйти</a></li>
            </ul>
            <ul v-else id="nav">
                <li><a @click="this.$router.push({ path: '/' })">Главная</a></li>
                <li><a @click="this.$router.push({ path: '/login'})">Вход</a></li>
            </ul>
        </nav>
    </section>
</template>

<script>

export default {
  name: 'HamburgetMenu'
}

</script>

<style scoped>
@import "~@/assets/css/nav-right.scss";
</style>