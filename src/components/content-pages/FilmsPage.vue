<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="0" />
        <div class="content-main">
            <div class="block-row" style="justify-content: center">
                <div class="content-header">Фильмы</div>
                <div class="content-header" id="page-number">1 страница</div>
            </div>
            <div id="content-container">
                <ContentFilters :lists="lists" :genres="genres"/>
                <div class="content-cards" id="film-cards-container" >
                    <CardComponent :ObjectType="type" v-for="item in filmsData" :key="item.id" :contentData="createFilmCard(item)"></CardComponent>
                </div>
            </div>
            <PaginationElement :totalPages="100" v-model:currentPage="this.$route.query.page"/>
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import CardComponent from '@/components/internal/CardComponent.vue';
import ContentFilters from '@/components/UI/ContentFilters.vue';
import PaginationElement from '@/components/UI/PaginationElement.vue';
import {ContentData} from '@/components/internal/CardComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/film_presaved.js";

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
        createFilmCard(filmResponse) {
            const image_src = filmResponse.poster.previewUrl;
            const category = filmResponse.genres[0].name;
            const title = filmResponse.name;
            const description = filmResponse.description;
            const extra_prop = filmResponse.year;
            return new ContentData(image_src, "", category, title, description, extra_prop)
        }
    },
    data() {
        return {
            type: "FILM",
            filmsData: presaved_json.docs,
            genres: genres,
            lists: lists
        }
    }
}
</script>

<style scoped>
@import "~@/assets/css/nav-right.scss";
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/content-list.scss";
@import "~@/assets/css/styles.scss";
</style>