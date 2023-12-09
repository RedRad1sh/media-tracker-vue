<template>
    <!-- TODO: перенести в Header -->
    <section class="nav-men">
        <input type="checkbox" id="nav-toggle" hidden>
        <div class="mask-content"></div>
        <nav class="nav">
            <ul id="nav"></ul>
        </nav>
    </section>
    <HeaderComponent />
    <div class="block">
        <MenuComponent id="menu-include" active-element="3" />
        <div class="content-main">
            <div class="rec-settings">
                <button type="button" @click="showModal" class="openHelp help-button">?</button>
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
                            <input :checked="filterDict.checkedMoviesContent" id="films-checkbox" type="checkbox" />

                            <label for="films-checkbox">
                                Фильмы
                            </label>
                        </div>
                        <div class="check-content-item">
                            <input :checked="filterDict.checkedBooksContent" id="books-checkbox" type="checkbox" />

                            <label for="books-checkbox">
                                Книги
                            </label>
                        </div>
                        <div class="check-content-item">
                            <input :checked="filterDict.checkedGamesContent" id="games-checkbox" type="checkbox" />

                            <label for="games-checkbox">
                                Игры
                            </label>
                        </div>
                    </div>
                </div>
                <div class="settings-menuitem">
                    <span>Рекомендуемый контент </span>
                    <div class="search-content-select">
                        <select aria-label="content-select" v-model="defaultSelectContent"
                            :value="filterDict.selectedContentType">
                            <option value="movies">Фильмы</option>
                            <option value="books">Книги</option>
                            <option value="games">Игры</option>
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
            </div>
            <div id="loader"></div>
            <div class="content-cards">
                <CardComponent v-for="item in contentData" :key="item.id" :contentData="createGameCard(item)">
                </CardComponent>
            </div>
        </div>
    </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';
import MenuComponent from '@/components/navigation/MenuComponent.vue';
import { presaved_json } from "@/assets/js/content-lists/pre-saved-jsons/games_presaved.js"
import { createGameCard } from "@/components/content-pages/GamesPage.vue"
import CardComponent from '@/components/internal/CardComponent.vue';
import HelpComponentModal from '@/components/internal/HelpComponentModal.vue';

export default {
    name: 'RecommendationsPage',
    components: {
        HeaderComponent, MenuComponent, CardComponent, HelpComponentModal
    },
    data() {
        return {
            defaultSelectContent: 'movies',
            isModalVisible: false,
            contentData: [],
            filterDict: {
                selectedContentType: '',
                genresList: '',
                minYear: '',
                maxYear: '',
                checkedMoviesContent: true,
                checkedBooksContent: false,
                checkedGamesContent: false
            }
        }
    },
    methods: {
        createGameCard: createGameCard,
        createRecomendations() {
            this.contentData = presaved_json
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

<style lang="scss" scoped>
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/recomendations.scss";
@import "~@/assets/css/styles.scss";
</style>