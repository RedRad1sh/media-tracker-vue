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
        <MenuComponent id="menu-include" active-element="1" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Книги</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <div class="content-cards" id="books-cards-container">
                    <CardComponent v-for="item in booksData" :key="item.id" :contentData="createBookCard(item)">
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
import { ContentData } from '@/components/internal/CardComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/books_presaved.js"

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
    components: { HeaderComponent, MenuComponent, CardComponent },
    methods: {
        createBookCard: createBookCard
    },
    data() {
        return {
            booksData: presaved_json.items
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