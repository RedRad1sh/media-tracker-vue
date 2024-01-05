<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="1" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Книги</div>
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
                    :showDurations="true"
                    :durations="durations"
                    @addGenre="changeGenres"
                    @changeRate="changeRate"
                    @changeYearFrom="changeYearFrom"
                    @changeYearTo="changeYearTo"
                    @changeDuration="changeDuration"
                />
                <div class="content-cards" id="books-cards-container">
                    <CardComponent
                        :ObjectType="type"
                        v-for="item in booksData"
                        :key="item.id"
                        :contentData="createBookCard(item)"
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
import { ContentData } from '@/components/internal/CardComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';
import axios from 'axios';
import { config } from '@/config/config.js';

const lists = ["Запланировано", "Читаю", "Прочитано"];
const durations = [
  {
    name: 'Короткие',
    type: 'SHORT',
    tooltip: 'до 120 страниц'
  },
  {
    name: 'Средние',
    type: 'MEDIUM',
    tooltip: 'от 120 до 500 страниц'
  },
  {
    name: 'Длинные',
    type: 'LONG',
    tooltip: 'от 500 минут'
  }
];

export function createBookCard(bookResponse) {
    const id = bookResponse.const_content_id;
    const content_type = 'current-book'
    const image_src = bookResponse.img_url;
    const category = bookResponse.categories_ru ?? bookResponse.categories;
    const title = bookResponse.title;
    const description = bookResponse.description;
    const extra_prop = bookResponse.authors;
    return new ContentData(id, content_type, image_src, "", category, title, description, extra_prop)
}

export default {
    name: 'BooksPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        createBookCard: createBookCard,
        getBooks(query) {
            this.booksData = [];
            let backendUrl = `${config.backend.url}/books`
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
                    genres: Array.from(this.selectedGenres),
                    rate: this.searchRate,
                    yearFrom: this.yearFrom,
                    yearTo: this.yearTo,
                    durations: Array.from(this.selectedDurations)
                }
            }).then(response => {
                this.booksData = response.data.data;
                this.totalPages = response.data.totalPages
                this.scrollToTop()
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        getBooksGenres() {
            let backendUrl = `${config.backend.url}/books/genres`

            axios.get(backendUrl).then(response => {
                this.genres = response.data;
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        },
        changeGenres(genre) {
            if (this.selectedGenres.has(genre)) {
                this.selectedGenres.delete(genre);
            } else {
                this.selectedGenres.add(genre);
            }

            this.getBooks(this.$route.query);
        },
        changeRate(rate) {
            this.searchRate = Number(rate) !== 0 ? rate : undefined;
            this.getBooks(this.$route.query);
        },
        changeYearFrom(yearFrom) {
            this.yearFrom = Number(yearFrom) !== 0 ? yearFrom : undefined;
            this.getBooks(this.$route.query);
        },
        changeYearTo(yearTo) {
            this.yearTo = Number(yearTo) !== 0 ? yearTo : undefined;
            this.getBooks(this.$route.query);
        },
        changeDuration(duration) {
            if (this.selectedDurations.has(duration)) {
                this.selectedDurations.delete(duration);
            } else {
                this.selectedDurations.add(duration);
            }

            this.getBooks(this.$route.query);
        }
    },
    data() {
        return {
            type: "Book",
            booksData: [],
            genres: [],
            selectedGenres: new Set(),
            searchRate: undefined,
            yearFrom: undefined,
            yearTo: undefined,
            selectedDurations: new Set(),
            lists: lists,
            durations: durations,
            totalPages: 10
        }
    },
    mounted() {
        this.getBooks(this.$route.query);
        this.getBooksGenres();
    },
    watch: {
        '$route'(to) {
            this.getBooks(to.query);
            this.getBooksGenres();
        }
    }
}
</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>