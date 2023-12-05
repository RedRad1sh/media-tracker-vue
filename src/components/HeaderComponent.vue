<template>
      <label for="nav-toggle" class="nav-toggle" onclick></label>
      <header>
        <div class="header-div">
          <img
            src="~@/assets/general_assets/headerbackground7366-mdt-200h.png"
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
              <a href="/films"><img
                src="~@/assets/general_assets/tailicon7371-ey4g.svg"
                class="search-icon"
              /></a>
            </div>
          </div>
          <a href="/" class="logo">
            <img
              src="~@/assets/general_assets/onlinegaming17375-egk-200h.png"
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
</template>

<script>
export default {
  name: 'HeaderComponent'
}

function setScale() {
    let clientWidth = document.body.clientWidth;
    let scale = 1 - ((1519 - clientWidth) / 1519 / 1)
    document.documentElement.style.cssText = `--screen-width: ${scale}`;
}

window.addEventListener("resize", function () {
    setScale();
}, true)
</script>