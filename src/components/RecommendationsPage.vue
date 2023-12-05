<template>
    <section class="nav-men">
        <input type="checkbox" id="nav-toggle" hidden>
        <div class="mask-content"></div>
        <nav class="nav">
            <ul id="nav"></ul>
        </nav>
    </section>
    <HeaderComponent/>
    <div class="block">
        <MenuComponent id="menu-include" active-element="3"/>
        <div class="content-main">
            <div class="rec-settings">
                <div class="header-settings">
                    <div class="header-settings-text">
                        <span class="rec-header PublicSansDisplayxsBold">
                            <h2>Настройки рекомендаций</h2>
                        </span>
                    </div>
                </div>
                <div class="settings-section">
                    <div class="settings-menuitem">
                        <span>Учитываемые списки </span>
                        <div class="block-row">
                            <div class="check-content-item">
                                <input id="films-checkbox" type="checkbox" />
                                <label for="films-checkbox">
                                    Фильмы
                                </label>
                            </div>
                            <div class="check-content-item">
                                <input id="books-checkbox" type="checkbox" />
                                <label for="books-checkbox">
                                    Книги
                                </label>
                            </div>
                            <div class="check-content-item">
                                <input id="games-checkbox" type="checkbox" />
                                <label for="games-checkbox">
                                    Игры
                                </label>
                            </div>
                        </div>
                    </div>
                    <div class="settings-menuitem">
                        <span>Рекомендуемый контент </span>
                        <div class="search-content-select">
                            <select>
                                <option selected>Фильмы</option>
                                <option>Книги</option>
                                <option>Игры</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="settings-input">
                    <div class="tag-area">
                        <label for="tag-input" class="label">Добавить жанры</label>
                        <ul>
                            <input type="text" class="tag-input" id="tag-input" />
                        </ul>
                    </div>
                </div>
                <div class="year-settings">
                    <div class="header-year-filter">
                        <span>Года</span>
                    </div>
                    <div class="year-filters">
                        <div class="max-year-filter">
                            <div class="settings-year-input">
                                <input type="text" placeholder="Min." class="year-filter-input" />
                            </div>
                        </div>
                        <div class="max-year-filter">
                            <div class="settings-year-input">
                                <input type="text" placeholder="Max." class="year-filter-input" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="rec-buttons">
                    <button class="create-recs" onclick="asyncMultipleContents(getBooks, itemsCount)">
                        <span>Сформировать рекомендации</span>
                    </button>
                </div>
            </div>
            <details open class="recommendations-help">
                <summary>Как настроить систему рекомендаций?</summary>
                <span class="help-description">
                    <span>
                        1. Выберите списки, на основе которых будут формироваться
                        рекомендации (пункт "Учитываемые списки")
                    </span>
                    <br />
                    <span>
                        2. Выберите тип контента для рекомендаций.
                    </span>
                    <br />
                    <span>
                        3. Добавьте фильтрацию по жанрам и годам выпуска
                    </span>
                    <br />
                    <span>Нажмите кнопку “Сформировать рекомендации”</span>
                </span>
            </details>
            <div id="loader"></div>
            <div class="content-cards" id="books-cards-container"></div>
        </div>
    </div>
    <div class="content-header" id="page-number">1 страница</div>
</template>

<script>
import HeaderComponent from './HeaderComponent.vue';
import MenuComponent from './navigation/MenuComponent.vue';
/* eslint no-unused-vars: 0 */
import Books from '../assets/js/content-lists/books-examples.js'

export default {
    name: 'RecommendationsPage',
    props: {
        msg: String
    },
    components: {
        HeaderComponent, MenuComponent
    }
}

</script>

<style lang="scss">
@import "~@/assets/css/cards.scss";
@import "~@/assets/css/recomendations.scss";
@import "~@/assets/css/styles.scss";
</style>