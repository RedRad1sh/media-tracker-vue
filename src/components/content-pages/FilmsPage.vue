<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="0" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Фильмы</div>
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
                    @addGenre="changeGenres"
                />
                <div class="content-cards" id="film-cards-container">
                    <CardComponent
                        :ObjectType="type"
                        v-for="item in filmsData"
                        :key="item.id"
                        :contentData="createFilmCard(item)"
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
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import axios from 'axios';
import { config } from '@/config/config.js';

export function createFilmCard(filmResponse) {
    const id = filmResponse.const_content_id;
    const content_type = 'current-film'
    const image_src = filmResponse.img_url;
    const category = filmResponse.genres;
    const title = filmResponse.title;
    const description = filmResponse.description;
    const extra_prop = filmResponse.creation_year;
    return new ContentData(id, content_type, image_src, "", category, title, description, extra_prop)
}

const lists = ["Запланировано", "Смотрю", "Просмотрено"];

export default {
    name: 'FilmsPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        getMovies(query) {
            this.filmsData = [];
            let backendUrl = `${config.backend.url}/movies`
            const page = query.page ?
                query.page - 1
                : 0;
            const search = query.search ?
                query.search
                : "";

            axios.get(backendUrl, {
                params: {
                    page: page,
                    size: 20,
                    search: search,
                    genres: Array.from(this.selectedGenres)
                }
            }).then(response => {
                this.filmsData = response.data.data;
                this.totalPages = response.data.totalPages
                this.scrollToTop()
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        getMoviesGenres() {
            let backendUrl = `${config.backend.url}/movies/genres`

            axios.get(backendUrl).then(response => {
                this.genres = response.data;
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        createFilmCard: createFilmCard,
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        changeGenres(genre) {
            if (this.selectedGenres.has(genre)) {
                this.selectedGenres.delete(genre);
            } else {
                this.selectedGenres.add(genre);
            }

            this.getMovies(this.$route.query);
        }
    },
    mounted() {
        this.getMovies(this.$route.query);
        this.getMoviesGenres();
    },
    data() {
        return {
            type: "Movie",
            filmsData: [],
            genres: [],
            selectedGenres: new Set(),
            lists: lists,
            totalPages: 10
        }
    },
    watch: {
        '$route'(to) {
            this.getMovies(to.query);
            this.getMoviesGenres();
        }
    }
}

</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>