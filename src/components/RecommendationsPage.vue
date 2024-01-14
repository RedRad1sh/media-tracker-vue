<template>
    <div class="block">
        <MenuComponent id="menu-include" active-element="3" />
        <div class="content-main recomendations-content">
            <div class="rec-settings">
                <HelpComponentModal ref="modal" />
                <div class="header-settings">
                    <div class="header-settings-text">
                        <span class="rec-header PublicSansDisplayxsBold">
                            <h2>Рекомендации</h2>
                        </span>
                    </div>
                </div>
                <div class="settings-menuitem">
                    <span>Учитываемые списки </span>
                    <div class="rec-checboxes">
                        <div class="check-content-item">
                            <input v-model="filterDict.checkedMoviesContent" id="films-checkbox" type="checkbox" />

                            <label for="films-checkbox">
                                Фильмы
                            </label>
                        </div>
                        <div class="check-content-item">
                            <input v-model="filterDict.checkedBooksContent" id="books-checkbox" type="checkbox" />

                            <label for="books-checkbox">
                                Книги
                            </label>
                        </div>
                        <div class="check-content-item">
                            <input v-model="filterDict.checkedGamesContent" id="games-checkbox" type="checkbox" />

                            <label for="games-checkbox">
                                Игры
                            </label>
                        </div>
                    </div>
                </div>
                <div class="settings-menuitem">
                    <span>Рекомендуемый контент </span>
                    <div class="search-content-select">
                        <select aria-label="content-select" v-model="selectedContentType"
                            :value="filterDict.selectedContentType">
                            <option value="Movie">Фильмы</option>
                            <option value="Book">Книги</option>
                            <option value="Game">Игры</option>
                        </select>
                    </div>
                </div>
                <div class="settings-menuitem">
                    <div class="header-year-filter">
                        <span>Года</span>
                    </div>
                    <div class="year-filters">
                        <div class="max-year-filter">
                            <select :value="filterDict.minYear" class="settings-year-input">
                                <option value="0" disabled selected> Min. Year</option>
                                <option v-for="year in years" class="year-filter-input" :key="year.id">{{ year }} </option>
                            </select>
                        </div>
                        <div class="max-year-filter">
                            <select :value="filterDict.maxYear" class="settings-year-input">
                                <option value="0" disabled selected> Max. Year</option>
                                <option :value="year" v-for="year in years" class="year-filter-input" :key="year.id">{{ year
                                }} </option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="rec-buttons">
                    <button class="create-recs" @click="createRecomendations">
                        <span>Сформировать рекомендации</span>
                    </button>
                </div>
                <button type="button" @click="showModal" class="openHelp help-button">?</button>
            </div>
            <div class="content-cards">
                <h1 class="recomendations-info" v-if="contentData.length == 0">Здесь будут отображены ваши рекомендации</h1>
                <CardComponent :ObjectType="selectedContentType" v-for="item in contentData" :key="item.id"
                    :contentData="createCard(item)">
                </CardComponent>
            </div>
        </div>
    </div>
</template>

<script>
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import { createGameCard } from "@/components/content-pages/GamesPage.vue"
import { createFilmCard } from "@/components/content-pages/FilmsPage.vue"
import { createBookCard } from "@/components/content-pages/BooksPage.vue"
import CardComponent from '@/components/internal/CardComponent.vue';
import HelpComponentModal from '@/components/internal/HelpComponentModal.vue';
import axios from 'axios';
import { config } from '@/config/config.js';
import UserStorage from "@/service/user-storage-service";

export default {
    name: 'RecommendationsPage',
    components: {
        MenuComponent, CardComponent, HelpComponentModal
    },
    data() {
        return {
            selectedContentType: 'Movie',
            isModalVisible: false,
            contentData: [],
            filterDict: {
                genresList: '',
                minYear: '',
                maxYear: '',
                checkedMoviesContent: true,
                checkedBooksContent: false,
                checkedGamesContent: false
            },
            createCard: createGameCard,
            createCardMap: {
                'Movie': createFilmCard,
                'Game': createGameCard,
                'Book': createBookCard
            },
        }
    },
    methods: {
        createRecomendations() {
            this.contentData = []
            let backendUrl = `${config.backend.url}/lists/user/${UserStorage.getUser().id}/reccomendations`
            let usingContentTypes = []
            if (this.filterDict.checkedMoviesContent) {
                usingContentTypes.push('Movie')
            }
            if (this.filterDict.checkedBooksContent) {
                usingContentTypes.push('Book')
            }
            if (this.filterDict.checkedGamesContent) {
                usingContentTypes.push('Game')
            }
            axios.get(backendUrl, {
                params: {
                    usingContentTypes: usingContentTypes.join(','),
                    recommendContentType: this.selectedContentType
                }
            }).then(response => {
                this.createCard = this.createCardMap[this.selectedContentType]
                this.contentData = response.data.contentArray;
            }).catch(error => {
                console.error('Ошибка получения данных с бекенда', error);
                this.$notify({
                    group: 'nots',
                    type: 'error',
                    title: 'Ошибка',
                    text: 'Не удалось сформировать рекоммендации'
                });
            });
        },
        showModal() {
            this.$refs.modal.show = true
        }
    },
    computed: {
        years() {
            let yearsArr = []
            for (let i = new Date().getFullYear(); i > 1900; i--) {
                yearsArr.push(i)
            }
            console.log(yearsArr)
            return yearsArr
        }
    }
}


</script>

<style scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/recomendations.scss";
</style>