<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="2" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Игры</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <ContentFilters :lists="lists" :genres="genres"/>
                <div class="content-cards" id="film-cards-container">
                    <CardComponent :ObjectType="type" v-for="item in gamesData" :key="item.id" :contentData="createGameCard(item)"/>
                </div>
            </div>
            <PaginationElement :totalPages="5" :currentPage="67"/>
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/games_presaved.js";
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';

const lists = ["Запланировано", "Играю", "Пройдено"];
const genres = [
  'Драма',
  'Комедия',
  'Фантастика',
  'Боевик',
  'Триллер',
  'Ужасы',
  'Приключения',
  'Мультфильм',
  'Романтика',
  'Фэнтези',
  'Детектив',
  'Исторический',
  'Вестерн',
  'Мелодрама',
  'Научная фантастика'
];

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
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        createGameCard: createGameCard
    }, data() {
        return {
            type: "GAME",
            gamesData: presaved_json,
            genres: genres,
            lists: lists
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