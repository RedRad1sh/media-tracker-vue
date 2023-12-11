<template>
    <HeaderComponent />
    <section class="nav-men">
        <input type="checkbox" id="nav-toggle" hidden>
        <div class="mask-content"></div>
        <nav class="nav">
            <ul id="nav"></ul>
        </nav>
    </section>
    <div class="block">
        <MenuComponent id="menu-include" active-element="2" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Игры</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <div class="content-cards" id="film-cards-container">
                    <CardComponent v-for="item in gamesData" :key="item.id" :contentData="createGameCard(item)">
                    </CardComponent>
                </div>
            </div>
            <div class="pagination">
                <a href="#">&laquo;</a>
                <a href="?">1</a>
                <a href="?page=2">2</a>
                <a href="?page=3">3</a>
                <a href="?page=4">4</a>
                <a href="?page=5">5</a>
                <a href="?page=6">6</a>
                <a href="#">&raquo;</a>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/games_presaved.js"

export function createGameCard(gameResponse) {
    const image_src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameResponse.steam_appid}/hero_capsule.jpg`;
    const alt_image = gameResponse.header_image;
    const category = gameResponse.genres[0].description;
    const title = gameResponse.name;
    const description = gameResponse.short_description || gameResponse.detailed_description;
    const extra_prop = gameResponse.developers[0];
    return new ContentData(image_src, alt_image, category, title, description, extra_prop)
}

export default {
    name: 'GamesPage',
    components: { HeaderComponent, MenuComponent, CardComponent },
    methods: {
        createGameCard: createGameCard
    }, data() {
        return {
            gamesData: presaved_json
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/nav-right.scss";
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>