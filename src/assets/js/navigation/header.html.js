import {server} from "../env.js";

const rootPathWeb = getRootPath_web();
window.server = server;

window.addEventListener("load", function () {
    setNavigationLinks()
    setExitFunc();

    console.log(document.body.clientWidth)
    setScale()
    var header = document.getElementById("header")

    header.innerHTML = `
      <label for="nav-toggle" class="nav-toggle" onclick></label>
      <header>
        <div class="header-div">
          <img
            src="../../assets/general_assets/headerbackground7366-mdt-200h.png"
            alt="background"
            class="header-background"
          />
          <div class="search">
            <div class="search-field">
              <div class="search-content-select">
                             <select>
                                <option selected>Фильмы</option>
                                <option>Книги</option>
                                <option>Игры</option>
                            </select>
              </div>
              <input type="text" class="search-input"/>
              <a href="../../pages/films.html"><img
                src="../../assets/general_assets/tailicon7371-ey4g.svg"
                class="search-icon"
              /></a>
            </div>
          </div>
          <a href="${getRootPath_web()}/index.html" class="logo">
            <img
              src="../../assets/general_assets/onlinegaming17375-egk-200h.png"
              class="onlinegaming1"
            />
            <span class="logo-text"><span>Media Tracker</span></span>
          </a>
        </div>
    </header>
    <footer>
        <div class="footer-text">MediaTracker 2023</div>
    </footer>
<div class="background"></div>
<div class="background-filter"></div>`
})

function setScale() {
    let clientWidth = document.body.clientWidth;
    let scale = 1 - ((1519 - clientWidth) / 1519 / 1)
    document.documentElement.style.cssText = `--screen-width: ${scale}`;
}

window.addEventListener("resize", function () {
    setScale();
}, true)

function setExitFunc() {
    let exitButton = document.getElementById("exit")
    if (exitButton !== null) {
        let path = "/site-content";
        exitButton.onclick = function () {
            document.cookie = `authorized=false;path=${path};`
        }
    }
}

function setNavigationLinks() {
    let siteNav = document.getElementById("nav");
    if (document.cookie.includes('authorized=true')) {
        siteNav.innerHTML = `
            <li><a href="${rootPathWeb}/index.html">Главная</a>
            <li><a href="${rootPathWeb}/pages/profile.html">Профиль</a>
            <li><a href="${rootPathWeb}/pages/user-lists.html">Списки</a>
            <li><a id="exit" href="${rootPathWeb}/index.html">Выйти</a>
        `
    } else {
        siteNav.innerHTML = `
            <li><a href="${rootPathWeb}/index.html">Главная</a>
            <li><a href="${rootPathWeb}/pages/login.html">Вход</a>
        `
    }
}

function getRootPath_web() {
    if (server) {
        return window.location.origin;
    }
    let curWwwPath = window.document.location.href;
    let pathName = window.document.location.pathname;
    let pos = curWwwPath.indexOf(pathName);
    let localhostPath = curWwwPath.substring(0, pos);
    let projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
    return (localhostPath + projectName);
}
