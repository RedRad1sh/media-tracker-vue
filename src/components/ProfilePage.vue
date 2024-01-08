<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="-1" />
        <div class="content-main">
            <div class="profile-info container-row">
                <div class="image-frame">
                    <img src="../assets/general_assets/image31416-6yvs-400w.png" alt="image31416" class="image" />
                    <span class="image-text">
                        <span>Добро пожаловать, Radish!</span>
                    </span>
                </div>
                <div class="pie-frame">
                    <canvas id="contentChart">
                    </canvas>
                </div>
                <div class="navigation">
                    <a href="user-lists.html" class="text">
                        📋 Списки контента
                    </a>
                    <a href="/profile/user-reviews" class="text">
                        📒 Оставленные рецензии
                    </a>
                </div>
            </div>
            <div class="container-row">
                <div class="pie-frame">
                    <canvas id="kinoChart">
                    </canvas>
                </div>
                <div class="pie-frame">
                    <canvas id="booksChart">
                    </canvas>
                </div>
                <div class="pie-frame">
                    <canvas id="gameChart">
                    </canvas>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import MenuComponent from './navigation/MenuComponent.vue';
/* eslint no-unused-vars: 0 */
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables);
function createPieChart(elementName, header, keys, values) {
    const ctx = document.getElementById(elementName);

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: keys,
            datasets: [{
                data: values,
                borderWidth: 1
            }],
            options: {
                maintainAspectRatio: false,
            }
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: header,
                    font: {
                        family: 'sans-serif',
                        size: 24
                    },
                    color: 'white' // Изменение цвета текста заголовка
                },
                legend: {
                    padding: "20",
                    position: 'right',
                    labels: {
                        font: {
                            size: 14
                        },
                        color: 'white' // Изменение цвета текста легенды
                    }
                }
            }
        }
    });
}

export default {
    name: 'ProfilePage',
    props: {
        msg: String
    },
    components: {
        MenuComponent
    },
    methods: {
        createCharts() {
            createPieChart('contentChart', 'Просмотренный контент',
                ['Фильмы', 'Книги', 'Игры'],
                [19, 12, 3]);
            createPieChart('kinoChart', 'Фильмы',
                ['Комедия', 'Боевик', 'Фантастика', 'Драма', 'Триллер', 'Ужасы', 'Приключения', 'Мультфильм'],
                [7, 10, 23, 15, 8, 5, 12, 9]);
            createPieChart('booksChart', 'Книги',
                ['Детектив', 'Фэнтези', 'Ужасы', 'Роман', 'Классика', 'Приключения', 'Научная литература', 'Биография'],
                [19, 12, 3, 8, 15, 6, 10, 5]);
            createPieChart('gameChart', 'Игры',
                ['Шутер', 'Симулятор', 'Стратегия', 'Rogue-like', 'Платформер', 'Гонки', 'Ролевая', 'Аркада'],
                [19, 12, 3, 2, 8, 6, 15, 5]);
        }
    },
    mounted() {
        this.createCharts()
    },
    watch: {
        '$route'() {
            this.createCharts()
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/css/profile.scss";
@import "~@/assets/css/styles.scss";
</style>