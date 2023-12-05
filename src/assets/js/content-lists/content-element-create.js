export let page = 0;

export async function asyncMultipleContents(getContents, itemsCount) {
    getPageIfExist()
    if (page != null) {
        var page_number = document.getElementById("page-number")
        page_number.innerText = `${page === 0 ? 1 : page} страница`
    }
    document.querySelector("#loader").style.display = "block";
    try {
        await getContents(itemsCount);
    } catch (error) {
        console.log(error)
    }
    document.querySelector("#loader").style.display = "none";
}

export function createCardExample(contentData) {
    var d = document.createElement("div");
    d.setAttribute("class", "card-container")
    console.log(contentData)
    d.innerHTML = `<a href="film-page.html" style="width: 100%">
                    <div class="card-top">
                        <img
                                src="${contentData.img_src}"
                                alt="thumbnail2410"
                                class="card-film-icon"
                                onerror="this.src='${contentData.alt_image}';"
                        />
                        <div class="card-tag">
                            <span class="card-genre Caption"><span>${contentData.category}</span></span>
                        </div>
                    </div>
                </a>

                <div class="card-bottom">
                    <div class="card-bottom-header">
                  <div class="card-name">
                    <span>${contentData.title}</span>
                    <div class="tooltip">${contentData.title}</div>
                  </div>
                        <span class="card-description">
                    <span style="overflow: hidden">
                      ${contentData.description}
                    </span>
                  </span>
                        <span class="card-extra-property">
                    <span>${contentData.extra_prop}</span>
                  </span>
                    </div>
                    <div class="card-bottom-actions">
                        <label class="label-select">Оценить
                            <select class="card-select rate-set">
                                <option selected>-</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                                <option>8</option>
                                <option>9</option>
                                <option>10</option>
                            </select>
                        </label>
                        <label class="label-select">Списки
                            <select class="card-select list-add">
                                <option selected>-</optionselected>
                                <option>Запланировано</option>
                                <option>Просмотрено</option>
                                <option>Брошено</option>
                            </select>
                        </label>
                    </div>
                </div>`
    return d;
}

function getPageIfExist() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    if (urlParams.get("page") !== null) {
        page = urlParams.get("page");
    }
}


export class ContentData {
    constructor(img_src, alt_image, category, title, description, extra_prop) {
        this.img_src = img_src;
        this.category = category;
        this.alt_image = alt_image;
        this.title = title;
        this.description = description;
        this.extra_prop = extra_prop;
    }
}
