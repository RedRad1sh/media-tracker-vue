<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="1" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Книги</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <ContentFilters :lists="lists" :genres="genres" />
                <div class="content-cards" id="books-cards-container">
                    <CardComponent :ObjectType="type" v-for="item in booksData" :key="item.id"
                        :contentData="createBookCard(item)" />
                </div>
            </div>
            <PaginationElement :totalPages="23" :currentPage="1" />
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import { ContentData } from '@/components/internal/CardComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/books_presaved.js";
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';

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
    const image_src = bookResponse.volumeInfo.imageLinks.large
        || bookResponse.volumeInfo.imageLinks.medium
        || bookResponse.volumeInfo.imageLinks.small ||
        bookResponse.volumeInfo.imageLinks.thumbnail;
    const category = bookResponse.volumeInfo.categories[0];
    const title = bookResponse.volumeInfo.title;
    const description = bookResponse.volumeInfo.description;
    const extra_prop = bookResponse.volumeInfo.authors[0];
    return new ContentData(image_src, "", category, title, description, extra_prop)
}

export default {
    name: 'BooksPage',
    components: { MenuComponent, CardComponent, ContentFilters, PaginationElement },
    methods: {
        createBookCard: createBookCard
    },
    data() {
        return {
            type: "BOOK",
            booksData: presaved_json.items,
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