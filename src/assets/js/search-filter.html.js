window.genres;

window.addEventListener("load", function () {
    var contentContainer = document.getElementById("content-container")
    let aside = document.createElement("l-menu")
    let genresHtml = "";
    for (let i = 0; i < window.genres.length; i++) {
        genresHtml += `
        <li>
           <input autocomplete="off" type="checkbox">
           <label class="genre-ru">${window.genres[i]}</label>
        </li>
        `
    }
    aside.innerHTML = `
    <div class="collection-filters" data-base_path="/animes">
                    <div class="text-block">
                        <div class="subheadline">Длительность</div>
                        <ul class="kinds ">
                            <li class="sub" data-field="kind" data-value="tv_13"><input autocomplete="off"
                                                                                        type="checkbox">Короткие<span
                                    class="b-question b-tooltipped mobile" data-direction="top"
                                    original-title="~13 эпизодов"></span></li>
                            <li class="sub" data-field="kind" data-value="tv_24"><input autocomplete="off"
                                                                                        type="checkbox">Средние<span
                                    class="b-question b-tooltipped mobile" data-direction="top"
                                    original-title="~24 эпизодов"></span></li>
                            <li class="sub" data-field="kind" data-value="tv_48"><input autocomplete="off"
                                                                                        type="checkbox">Длинные<span
                                    class="b-question b-tooltipped mobile" data-direction="top"
                                    original-title=">30 эпизодов"></span></li>
                        </ul>
                    </div>
                    <div class="text-block -text-block mylist-text-block"><span
                            class="filter text-block-filter item-sign"></span>
                        <div class="subheadline">Список</div>
                        <ul>
                            <li>
                                <input autocomplete="off" type="checkbox">Запланировано
                            </li>
                            <li>
                                <input autocomplete="off" type="checkbox">Смотрю
                            </li>
                            <li>
                                <input autocomplete="off" type="checkbox">Просмотрено
                            </li>
                        </ul>
                    </div>
                    <div class="text-block">
                        <div class="subheadline">Год</div>
                        <ul class="filter-group">
                            <label class="year-filter">
                                <input class="year-input" placeholder="Год от" maxlength="4" type="text">
                            </label>
                            <label class="year-filter">
                                <input class="year-input" placeholder="до" maxlength="4" type="text">
                            </label>
                        </ul>
                    </div>
                    <div class="text-block">
                        <div class="subheadline">Оценка</div>
                        <div class="block-row">
                            <input type="range" value="" min="0" max="10" oninput="rangevalue.value=value"/>
                            <output id="rangevalue">-</output>
                        </div>
                    </div>
                    <div class="text-block">
                        <div class="subheadline">Жанры</div>
                        <div class="b-spoiler"><label style="display: none;">Показать список</label>
                            <ul>
                                ${genresHtml}
                            </ul>
                        </div>
                    </div>
                </div>
    `
    contentContainer.insertBefore(aside, contentContainer.firstChild);
})
