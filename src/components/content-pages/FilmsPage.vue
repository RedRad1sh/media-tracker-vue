<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="0" />
        <div class="content-main">
          <div class="block-row" style="justify-content: center">
                <span class="search-text" v-if="![undefined, null, ''].includes(this.$route.query.search)">
                        Результаты по запросу: {{ this.$route.query.search }}
                </span>
          </div>
            <div id="content-container">
                <ContentFilters
                    :lists="lists"
                    :genres="genres"
                    :showDurations="true"
                    :durations="durations"
                    @addGenre="changeGenres"
                    @changeRate="changeRate"
                    @changeYearFrom="changeYearFrom"
                    @changeYearTo="changeYearTo"
                    @changeDuration="changeDuration"
                    @changeList="changeList"
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
import UserStorage from "@/service/user-storage-service";

export function createFilmCard(filmResponse) {
    const id = filmResponse.const_content_id;
    const content_type = 'current-movie'
    const image_src = filmResponse.img_url;
    const category = filmResponse.genres;
    const title = filmResponse.title;
    const description = filmResponse.description;
    const extra_prop = filmResponse.creation_year;
    return new ContentData(id, content_type, image_src, "", category, title, description, extra_prop)
}

const lists = ["Запланировано", "Смотрю", "Просмотрено"];
const durations = [
  {
    name: 'Короткие',
    type: 'SHORT',
    tooltip: 'до 90 минут'
  },
  {
    name: 'Средние',
    type: 'MEDIUM',
    tooltip: 'до 120 минут'
  },
  {
    name: 'Длинные',
    type: 'LONG',
    tooltip: 'от 120 минут'
  }
];

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
                    user_id : UserStorage.getUser().id,
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
                this.filmsData = response.data.data;
                this.totalPages = response.data.totalPages
                this.scrollToTop()
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        resetPageAndGetMovies() {
          this.$router.push({query: {...this.$route.query, page: 1}});
          this.getMovies(this.$route.query);
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

            this.resetPageAndGetMovies();
        },
        changeRate(rate) {
            this.searchRate = Number(rate) !== 0 ? rate : undefined;
            this.resetPageAndGetMovies();
        },
        changeYearFrom(yearFrom) {
            this.yearFrom = Number(yearFrom) !== 0 ? yearFrom : undefined;
            this.resetPageAndGetMovies();
        },
        changeYearTo(yearTo) {
            this.yearTo = Number(yearTo) !== 0 ? yearTo : undefined;
            this.resetPageAndGetMovies();
        },
        changeDuration(duration) {
            if (this.selectedDurations.has(duration)) {
                this.selectedDurations.delete(duration);
            } else {
                this.selectedDurations.add(duration);
            }

            this.resetPageAndGetMovies();
        },
        changeList(list) {
            if (this.selectedLists.has(list)) {
                this.selectedLists.delete(list);
            } else {
                this.selectedLists.add(list);
            }

            this.resetPageAndGetMovies();
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
            selectedDurations: new Set(),
            selectedLists: new Set(),
            searchRate: undefined,
            yearFrom: undefined,
            yearTo: undefined,
            lists: lists,
            durations: durations,
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