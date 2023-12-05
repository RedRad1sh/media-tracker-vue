/* eslint no-unused-vars: 0 */
/* TODO: доделать запрос к беку, вынести во Vue компонент */

import { page, asyncMultipleContents, createCardExample, ContentData } from './content-element-create.js';
import { presaved, proxyUrl } from "../env.js"
import { presaved_json } from "./pre-saved-jsons/games_presaved.js"

export function init() {
    const itemsCount = 20;

    window.addEventListener("load", () => asyncMultipleContents(getGamesV2, itemsCount), false);

    function createFilmCard(gameResponse) {
        const image_src = `https://cdn.cloudflare.steamstatic.com/steam/apps/${gameResponse.steam_appid}/hero_capsule.jpg`;
        const alt_image = gameResponse.header_image;
        const category = gameResponse.genres[0].description;
        const title = gameResponse.name;
        const description = gameResponse.short_description || gameResponse.detailed_description;
        const extra_prop = gameResponse.developers[0];
        return createCardExample(new ContentData(image_src, alt_image, category, title, description, extra_prop))
    }

    /**
     * Only 100 top games
     * Fetch requests invoke parallel
     * @param count
     * @returns {Promise<void>}
     */

    async function getGames(count) {
        var films_container = document.getElementById("film-cards-container")

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/'
        const apiUrl = `https://api.steampowered.com/ISteamChartsService/GetMostPlayedGames/v1`;
        const gamesData = await fetch(proxyUrl + apiUrl).then(value => value.json())
        console.log(gamesData)
        let gameDescUrls = []
        let rankGames = gamesData.response.ranks;
        for (let i = 0; i < rankGames.length; i++) {
            console.log(rankGames[i + page * 20])
            gameDescUrls.push(fetch(proxyUrl + `https://store.steampowered.com/api/appdetails?appids=${rankGames[i].appid}&l=russian`).then(value => value.json()))
        }
        let games = await Promise.all(gameDescUrls);
        console.log(games)

        for (let i = 0; i < count && i < games.length; i++) {
            let gameResponse = games[i + page * 20][Object.keys(games[i + page * 20])[0]];
            if (checkBannedProps(gameResponse)) {
                continue;
            }
            let gameData = createFilmCard(gameResponse.data)
            films_container.appendChild(gameData)
        }

    }

    /**
     * Top games no limit
     * Fetch requests invoke parallel
     * @param count
     * @returns {Promise<void>}
     */
    async function getGamesV2(count) {
        var games_container = document.getElementById("film-cards-container")
        let games;
        if (presaved) {
            games = presaved_json;
            for (let i = 0; i < count && i < games.length; i++) {
                let gameResponse = games[i];
                let gameData = createFilmCard(gameResponse.data);
                games_container.appendChild(gameData)
            }
        } else {
            const api_url = `https://store.steampowered.com/search/results/?query&start=${page * 20}&count=20&dynamic_data=&sort_by=_ASC&supportedlang=russian&snr=1_7_7_7000_7&filter=topsellers&infinite=1`;
            const games_data = await fetch(proxyUrl + api_url).then(value => value.json())
            let top_games_appids = getAllAppIdsFromHtml(games_data.results_html);
            let steam_game_urls = []
            for (let i = 0; i < count && i < top_games_appids.length; i++) {
                steam_game_urls.push(fetch(proxyUrl + `https://store.steampowered.com/api/appdetails?appids=${top_games_appids[i]}&l=russian`).then(value => value.json()))
            }
            games = await Promise.all(steam_game_urls);
            for (let i = 0; i < count && i < games.length; i++) {
                let gameResponse = games[i][Object.keys(games[i])[0]];
                if (checkBannedProps(gameResponse)) {
                    console.error(JSON.stringify(gameResponse) + " - errorParse")
                    continue;
                }
                let gameData = createFilmCard(gameResponse.data);
                games_container.appendChild(gameData)
            }
        }
    }

    function getAllAppIdsFromHtml(html) {
        const regexp = '(data-ds-appid=")([0-9]+)(")'
        const array = [...html.matchAll(regexp)];
        let appIds = []
        array.map(m => {
            appIds.push(m[2])
            return m[2]
        });
        return appIds;
    }

    function checkBannedProps(gameResponse) {
        return typeof gameResponse == "undefined" || typeof gameResponse.data == "undefined" || typeof gameResponse.data.genres == "undefined" ||
            gameResponse.data.type === "hardware";
    }
}