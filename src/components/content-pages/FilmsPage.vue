<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="0" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Фильмы</div>
                <div class="content-header" id="page-number">Страница №{{this.$route.query.page??1}}
                <span v-if="![undefined, null, ''].includes(this.$route.query.search)">Поиск: {{ this.$route.query.search }}</span>
                </div>
            </div>
            <div id="content-container">
                <ContentFilters :lists="lists" :genres="genres" />
                <div class="content-cards" id="film-cards-container">
                    <CardComponent :ObjectType="type" v-for="item in filmsData" :key="item.id"
                        :contentData="createFilmCard(item)"></CardComponent>
                </div>
            </div>
            <PaginationElement :totalPages="this.totalPages" :currentPage="this.$route.query.page ? this.$route.query.page : 1" />
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import axios from 'axios';
import {config} from '@/config/config.js';

const lists = ["Запланировано", "Смотрю", "Просмотрено"];
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

export default {
    name: 'FilmsPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        getMoviesById(query) {
            console.log(config)
            let backendUrl = `${config.backend.url}/movies?page=${query.page-1 ?? 0}&size=20&search=${query.search ?? ""}`
            console.log(backendUrl);

            axios.get(backendUrl)
                .then(response => {
                    this.filmsData = response.data.data;
                    this.totalPages = response.data.totalPages
                    this.scrollToTop()
                })
                .catch(error => {
                    console.error('Ошибка получения данных с бекенда', error);
                });
        },
        createFilmCard(filmResponse) {
            const image_src = filmResponse.img_url;
            const category = filmResponse.genres;
            const title = filmResponse.title;
            const description = filmResponse.description;
            const extra_prop = filmResponse.creation_year;
            return new ContentData(image_src, "", category, title, description, extra_prop)
        },
        
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    mounted() {
        this.getMoviesById(this.$route.query)
    },
    data() {
        return {
            type: "FILM",
            filmsData: [],
            genres: genres,
            lists: lists,
            totalPages: 10
        }
    },
    watch: {
        '$route'(to) {
            this.getMoviesById(to.query)
        }
    }
}

</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>