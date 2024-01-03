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
                <ContentFilters :lists="lists" :genres="genres" />
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
                    search: search
                }
            }).then(response => {
                this.booksData = response.data.data;
                this.totalPages = response.data.totalPages
                this.scrollToTop()
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
            });
        },
        scrollToTop() {
            window.scrollTo(0, 0);
        }
    },
    data() {
        return {
            type: "Book",
            booksData: [],
            genres: genres,
            lists: lists,
            totalPages: 10
        }
    },
    mounted() {
        this.getBooks(this.$route.query)
    },
    watch: {
        '$route'(to) {
            this.getBooks(to.query)
        }
    }
}
</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>