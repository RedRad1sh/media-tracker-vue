<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="2" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Игры</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <ContentFilters :lists="lists" :genres="genres" />
                <div class="content-cards" id="film-cards-container">
                    <CardComponent :ObjectType="type" v-for="item in gamesData" :key="item.id"
                        :contentData="createGameCard(item)" />
                </div>
            </div>
            <PaginationElement :totalPages="this.totalPages"
                :currentPage="this.$route.query.page ? this.$route.query.page : 1" />
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';
import axios from 'axios';
import { config } from '@/config/config.js';

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
    const image_src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameResponse.steam_app_id}/hero_capsule.jpg`;
    const alt_image = gameResponse.img_url;
    const category = gameResponse.genres;
    const title = gameResponse.title;
    const description = gameResponse.short_description || gameResponse.description;
    const extra_prop = gameResponse.developers;
    return new ContentData(image_src, alt_image, category, title, description, extra_prop)
}

export default {
    name: 'GamesPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        getGameById(query) {
            console.log(config)
            let backendUrl = `${config.backend.url}/games?page=${query.page - 1 ?? 0}&size=20&search=${query.search ?? ""}`
            console.log(backendUrl);

            axios.get(backendUrl)
                .then(response => {
                    this.gamesData = response.data.data;
                    this.totalPages = response.data.totalPages
                    this.scrollToTop()
                })
                .catch(error => {
                    console.error('Ошибка получения данных с бекенда', error);
                });
        },
        createGameCard: createGameCard,
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    }, mounted() {
        this.getGameById(this.$route.query)
    }, data() {
        return {
            type: "GAME",
            gamesData: [],
            genres: genres,
            lists: lists,
            totalPages: 10
        }
    }, watch: {
        '$route'(to) {
            // Do something with the updated value.
            this.getGameById(to.query)
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