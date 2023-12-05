import { page, asyncMultipleContents, createCardExample, ContentData } from './content-element-create.js';
import { proxyUrl, FILMS_API_KEY } from "../env.js"
import { presaved_json } from "./pre-saved-jsons/film_presaved.js"

export function init() {

    let itemsCount = 20;

    window.addEventListener("load", () => asyncMultipleContents(getFilms, itemsCount), false);

    async function getFilms(count) {
        let films_container = document.getElementById("film-cards-container")
        let films = await makeRequest(count);
        for (let i = 0; i < 20; i++) {
            let filmCard = createFilmCard(films.docs[i])
            films_container.appendChild(filmCard);
        }
    }

    function createFilmCard(filmResponse) {
        const image_src = filmResponse.poster.previewUrl;
        const category = filmResponse.genres[0].name;
        const title = filmResponse.name;
        const description = filmResponse.description;
        const extra_prop = filmResponse.year;
        return createCardExample(new ContentData(image_src, "", category, title, description, extra_prop))
    }

    async function makeRequest(count) {
        let films;
        /* eslint no-constant-condition: 0 */
        if (true) {
            films = presaved_json;
        } else {
            const apiUrl = `https://api.kinopoisk.dev/v1.3/movie?limit=${count}&page=${page}`;

            films = await fetch(proxyUrl + apiUrl, {
                headers: {
                    'X-API-KEY': `${FILMS_API_KEY}`
                }
            }).then(value => value.json())
        }
        return films;
    }
}