/* Относится к компоненту заголока, надо переписывать под компонент */
import {server} from "../env.js";

window.server = server;

function setScale() {
    let clientWidth = document.body.clientWidth;
    let scale = 1 - ((1519 - clientWidth) / 1519 / 1)
    document.documentElement.style.cssText = `--screen-width: ${scale}`;
}

window.addEventListener("resize", function () {
    setScale();
}, true)
