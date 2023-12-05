window.addEventListener("load", function () {
    var menu_include = document.getElementById("menu-include")
    var act_element = parseInt(menu_include.getAttribute("active-element"))
    menu_include.innerHTML = `
<style>
#menu-include{
    z-index: 0;
    height: 60px;
    justify-content: center;
    width: 80%;
}

.menu-tabs {
    display: flex !important;
    justify-content: space-around !important;
    padding: 4px;
    align-items: center;
    flex-shrink: 0;
    border-radius: 3px;
    flex-direction: row;
    background-color: rgba(3,0,22,0.32);
}

.menu-tabbase {
    display: flex;
    padding: 8px 16px;
    overflow: hidden;
    align-self: stretch;
    align-items: center;
    flex-shrink: 0;
    border-radius: 5px;
    justify-content: center;
}

.menu-button {
    color: white;
    height: auto;
    text-align: center;
    line-height: 24px;
        font-size: 20px;
    font-stretch: normal;
    text-decoration: none;
}

.menu-tabbase-active {
    display: flex;
    padding: 8px 16px;
    overflow: hidden;
    align-self: stretch;
    align-items: center;
    flex-shrink: 0;
    border-radius: 5px;
    justify-content: center;
    background-color: var(--dl-color-base-white);
}

.menu-active-button {
    height: auto;
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    line-height: 24px;
    font-stretch: normal;
    text-decoration: none;
    color: black;
}

.menu-active-button:visited {
    color: black;
}

@media screen and (max-width: 1200px) {
    .menu-button {
        font-size: 16px !important;
    }

    .menu-button-active {
        font-size: 16px !important;
    }

    #menu-include {
        height: 60px;
        justify-content: center;
        width: 95%;
    }
}

@media screen and (max-width: 850px) {
    .menu-tabbase {
        padding: 8px 4px;
    }

    .menu-tabbase {
        padding: 8px 4px;
    }
}

</style>
        <div class="menu-tabs">
            <div class="menu-tabbase">
                <a class="menu-button" href="../pages/films.html">Фильмы</a>
            </div>
            <div class="menu-tabbase">
                <a class="menu-button" href="../pages/books.html">Книги</a>
            </div>
            <div class="menu-tabbase">
                <a class="menu-button" href="../pages/games.html">Игры</a>
            </div>
            <div class="menu-tabbase">
                <a class="menu-button" href="../pages/recomendations.html">Рекомендации</a>
            </div>
        </div>`
    var tabs = menu_include.querySelector(".menu-tabs").getElementsByClassName("menu-tabbase")
    let active_element = tabs.item(act_element);

    active_element.setAttribute("class", "menu-tabbase-active")
    active_element.getElementsByClassName("menu-button").item(0)
        .setAttribute("class", "menu-active-button")
})
