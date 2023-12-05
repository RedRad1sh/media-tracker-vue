/* eslint no-unused-vars: 0 */
/* TODO: доделать запрос к беку, вынести во Vue компонент */
import { page, asyncMultipleContents, createCardExample, ContentData } from './content-element-create.js';
import { presaved, proxyUrl } from "../env.js"
import { presaved_json } from "./pre-saved-jsons/books_presaved.js"
export function init() {
    let enable_auto_content = true

    window.asyncMultipleContents = asyncMultipleContents
    window.getBooks = getBooks

    let itemsCount = 20;
    window.itemsCount = itemsCount

    let listener = () => enable_auto_content ? asyncMultipleContents(getBooks, itemsCount) : false;

    window.addEventListener("load", listener, false);

    async function getBooks(count) {
        let booksData;
        var books_container = document.getElementById("books-cards-container")
        books_container.innerText = "";
        booksData = await makeRequest(count);

        for (let i = 0; i < booksData.items.length; i++) {
            let bookResponse = booksData.items[i];
            let bookCard = createBookCard(bookResponse);
            books_container.appendChild(bookCard)
        }
    }

    async function makeRequest(count) {
        let booksData;
        if (presaved) {
            booksData = presaved_json;
        } else {
            const bookApi = `https://www.googleapis.com/books/v1/volumes?q=subject:fiction&langRestrict=ru&orderBy=relevance&maxResults=${count}&printType=books&startIndex=${(page === 0 ? 0 : page - 1) * 20}`;
            console.log(bookApi)
            booksData = await fetch(proxyUrl + bookApi).then(value => value.json())
        }
        return booksData;
    }

    function createBookCard(bookResponse) {
        const image_src = bookResponse.volumeInfo.imageLinks.large
            || bookResponse.volumeInfo.imageLinks.medium
            || bookResponse.volumeInfo.imageLinks.small ||
            bookResponse.volumeInfo.imageLinks.thumbnail;
        const category = bookResponse.volumeInfo.categories[0];
        const title = bookResponse.volumeInfo.title;
        const description = bookResponse.volumeInfo.description;
        const extra_prop = bookResponse.volumeInfo.authors[0];
        return createCardExample(new ContentData(image_src, "", category, title, description, extra_prop))
    }
}