import { createRouter, createWebHistory } from "vue-router"

import MainPage from '@/components/MainPage.vue'
import FilmsPage from '@/components/content-pages/FilmsPage.vue'
import BooksPage from '@/components/content-pages/BooksPage.vue'
import GamesPage from '@/components/content-pages/GamesPage.vue'
import RecommendationsPage from '@/components/RecommendationsPage.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import CurrentMovie from '@/components/content-pages/CurrentMovie.vue'
import CurrentGame from '@/components/content-pages/CurrentGame.vue'
import UserLists from "@/components/UserLists"
import CurrentBook from '@/components/content-pages/CurrentBook.vue'
import LoginPage from "@/components/LoginPage";
import UserReviews from "@/components/UserReviews"

const routes = [
    {
        path: '/',
        meta: { title: 'Главная страница', showHeader: true },
        component: MainPage
    },
    {
        path: '/profile',
        meta: { title: 'Профиль', showHeader: true },
        component: ProfilePage
    },
    {
        path: '/movies',
        meta: { title: 'Фильмы', showHeader: true },
        component: FilmsPage
    },
    {
        path: '/games',
        meta: { title: 'Игры', showHeader: true },
        component: GamesPage
    },
    {
        path: '/books',
        meta: { title: 'Книги', showHeader: true },
        component: BooksPage
    },
    {
        path: '/recomendations',
        meta: { title: 'Рекомендации', showHeader: true },
        component: RecommendationsPage
    },
    {
        path: '/current-movie/:id',
        meta: { title: 'Фильм', showHeader: true },
        component: CurrentMovie
    },
    {
        path: '/current-game/:id',
        meta: { title: 'Игра', showHeader: true },
        component: CurrentGame
    },
    {
        path: '/profile/lists',
        meta: { title: 'Личные списки', showHeader: true },
        component: UserLists
    },
    {
        path: '/current-book/:id',
        meta: { title: 'Книга', showHeader: true },
        component: CurrentBook
    },
    {
        path: '/login',
        meta: { title: 'Авторизация', showHeader: true },
        component: LoginPage
    },
    {
        path: '/profile/user-reviews',
        meta: { title: 'Оставленные рецензии', showHeader: true },
        component: UserReviews
    },
]

const router = createRouter ({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;