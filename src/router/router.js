import { createRouter, createWebHistory } from "vue-router"

import App from '@/App.vue'
import FilmsPage from '@/components/content-pages/FilmsPage.vue'
import BooksPage from '@/components/content-pages/BooksPage.vue'
import GamesPage from '@/components/content-pages/GamesPage.vue'
import RecommendationsPage from '@/components/RecommendationsPage.vue'
import ProfilePage from '@/components/ProfilePage.vue'
import CurrentContent from '@/components/content-pages/CurrentContent.vue'

const routes = [
    {
        path: '/',
        meta: { title: 'Главная страница', showHeader: true },
        component: App
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
        path: '/CurrentContent',
        meta: { title: 'Контент', showHeader: true },
        component: CurrentContent
    },
]


const router = createRouter ({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;