<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="2" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Игры</div>
                <div class="content-header" id="page-number">Страница №{{ this.$route.query.page ?? 1 }}
                    <span v-if="![undefined, null, ''].includes(this.$route.query.search)">
                        Поиск: {{ this.$route.query.search }}
                    </span>
                </div>
            </div>
            <div id="content-container">
                <ContentFilters
                    :lists="lists"
                    :genres="genres"
                    :showDurations="false"
                    @addGenre="changeGenres"
                    @changeRate="changeRate"
                    @changeYearFrom="changeYearFrom"
                    @changeYearTo="changeYearTo"
                    @changeList="changeList"
                />
                <div class="content-cards" id="film-cards-container">
                    <CardComponent
                        :ObjectType="type"
                        v-for="item in gamesData"
                        :key="item.id"
                        :contentData="createGameCard(item)"
                    />
                </div>
            </div>
            <PaginationElement
                :totalPages="this.totalPages"
                :currentPage="this.$route.query.page ? Number(this.$route.query.page) : 1"
            />
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

export function createGameCard(gameResponse) {
    const id = gameResponse.const_content_id;
    const content_type = 'current-game'
    const image_src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameResponse.steam_app_id}/hero_capsule.jpg`;
    const alt_image = gameResponse.img_url;
    const category = gameResponse.genres;
    const title = gameResponse.title;
    const description = gameResponse.short_description || gameResponse.description;
    const extra_prop = gameResponse.developers;
    return new ContentData(id, content_type, image_src, alt_image, category, title, description, extra_prop)
}

export default {
    name: 'GamesPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        getGames(query) {
            this.gamesData = [];
            let backendUrl = `${config.backend.url}/games`
            const page = query.page ?
                query.page - 1
                : 0;
            const search = query.search ?
                query.search
                : "";

            axios.get(backendUrl, {
                params: {
                    user_id : '658891c99f8aaf381016ebd0',
                    page: page,
                    size: 20,
                    search: search,
                    genres: Array.from(this.selectedGenres),
                    rate: this.searchRate,
                    yearFrom: this.yearFrom,
                    yearTo: this.yearTo,
                    durations: Array.from(this.selectedDurations),
                    selectedLists: Array.from(this.selectedLists)
                }
            }).then(response => {
                this.gamesData = response.data.data;
                this.totalPages = response.data.totalPages
                this.scrollToTop()
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        resetPageAndGetGames() {
            this.$router.push({query: {...this.$route.query, page: 1}});
            this.getGames(this.$route.query);
        },
        getGamesGenres() {
            let backendUrl = `${config.backend.url}/games/genres`

            axios.get(backendUrl).then(response => {
                this.genres = response.data;
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        createGameCard: createGameCard,
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        changeGenres(genre) {
            if (this.selectedGenres.has(genre)) {
                this.selectedGenres.delete(genre);
            } else {
                this.selectedGenres.add(genre);
            }

            this.resetPageAndGetGames();
        },
        changeRate(rate) {
            this.searchRate = Number(rate) !== 0 ? rate : undefined;
            this.resetPageAndGetGames();
        },
        changeYearFrom(yearFrom) {
            this.yearFrom = Number(yearFrom) !== 0 ? yearFrom : undefined;
            this.resetPageAndGetGames();
        },
        changeYearTo(yearTo) {
            this.yearTo = Number(yearTo) !== 0 ? yearTo : undefined;
            this.resetPageAndGetGames();
        },
        changeList(list) {
            if (this.selectedLists.has(list)) {
                this.selectedLists.delete(list);
            } else {
                this.selectedLists.add(list);
            }

            this.resetPageAndGetGames();
        }
    }, mounted() {
        this.getGames(this.$route.query);
        this.getGamesGenres();
    }, data() {
        return {
            type: "Game",
            gamesData: [],
            genres: [],
            selectedGenres: new Set(),
            selectedDurations: new Set(),
            selectedLists: new Set(),
            searchRate: undefined,
            yearFrom: undefined,
            yearTo: undefined,
            lists: lists,
            totalPages: 10
        }
    }, watch: {
        '$route'(to) {
            // Do something with the updated value.
            this.getGames(to.query);
            this.getGamesGenres();
        }
    }
}
</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>