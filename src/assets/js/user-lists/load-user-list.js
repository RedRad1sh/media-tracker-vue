import {books} from "./books.js";
import {films} from "./films.js";
import {games} from "./games.js";

window.moveElement = function (selectElement) {
    let row = selectElement.closest("tr")
    let rowTypeId = selectElement.closest("tbody").getAttribute("id");
    let newTypeId;
    switch (selectElement.value) {
        case "Запланировано":
            newTypeId = rowTypeId.substr(0, rowTypeId.length-2) + "-0";
            break;
        case "Просмотрено":
            newTypeId = rowTypeId.substr(0, rowTypeId.length-2) + "-2";
            break;
        default:
            newTypeId = rowTypeId.substr(0, rowTypeId.length-2) + "-1";
    }
    console.log(newTypeId)
    document.getElementById(newTypeId)
        .appendChild(row);
}

let selectedStatus = [
    `
        <option selected>Запланировано</option>
        <option>Смотрю</option>
        <option>Просмотрено</option>
    `,
    `
        <option>Запланировано</option>
        <option selected>Смотрю</option>
        <option>Просмотрено</option>
    `,
    `
        <option>Запланировано</option>
        <option>Смотрю</option>
        <option selected>Просмотрено</option>
    `,
]

function getTableElement(content) {
    let tagId = `${content.type}-${content.statusType}`;
    console.log(tagId)
    return document.getElementById(tagId);
}

function loadContent(contentList) {
    for (let i = 0; i < contentList.length; i++) {
        let content = contentList[i];
        let parentTag = getTableElement(content);
        let trRow = document.createElement("tr");
        trRow.innerHTML = `
            <td class="cell-value number"></td>
            <td class="cell-value"><a href="film-page.html">${content.name}</a></td>
            <td class="cell-value">${content.author}</td>
            <td class="cell-value">${content.genre}</td>
            <td class="cell-value">${content.rating}</td>
                        <td class="cell-value">
                <label>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                        <option>7</option>
                        <option selected>8</option>
                        <option>9</option>
                        <option>10</option>
                    </select>
                </label>
            </td>
            <td class="cell-value">
                <label>
                    <select onChange="moveElement(this)">
                        ${selectedStatus[content.statusType]}
                    </select>
                </label>
            </td>
        `
        parentTag.appendChild(trRow);
    }
}

window.addEventListener("load", function () {
    loadContent(films);
    loadContent(books);
    loadContent(games);
})
