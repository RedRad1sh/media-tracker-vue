import { createRouter, createWebHistory } from "vue-router"

import MainPage from '@/components/MainPage.vue'
import FilmsPage from '@/components/content-pages/FilmsPage.vue'
import BooksPage from '@/components/content-pages/BooksPage.vue'
import GamesPage from '@/components/content-pages/GamesPage.vue'
import RecommendationsPage from '@/components/RecommendationsPage.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import CurrentFilm from '@/components/content-pages/CurrentFilm.vue'
import CurrentGame from '@/components/content-pages/CurrentGame.vue'
import UserLists from "@/components/UserLists"

const routes = [
    {
        path: '/',
        meta: { title: 'Главная страница', showHeader: true },
        component: MainPage
    },
    {
        path: '/ProfilePage',
        meta: { title: 'Профиль', showHeader: true },
        component: ProfilePage
    },
    {
        path: '/FilmsPage',
        meta: { title: 'Фильмы', showHeader: true },
        component: FilmsPage
    },
    {
        path: '/GamesPage',
        meta: { title: 'Игры', showHeader: true },
        component: GamesPage
    },
    {
        path: '/BooksPage',
        meta: { title: 'Книги', showHeader: true },
        component: BooksPage
    },
    {
        path: '/RecommendationsPage',
        meta: { title: 'Рекомендации', showHeader: true },
        component: RecommendationsPage
    },
    {
        path: '/current-film/:id',
        meta: { title: 'Фильм', showHeader: true },
        component: CurrentFilm
    },
    {
        path: '/current-game/:id',
        meta: { title: 'Игра', showHeader: true },
        component: CurrentGame
    },
    {
        path: '/UserLists',
        meta: { title: 'Личные списки', showHeader: true },
        component: UserLists
    },
]

const router = createRouter ({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;