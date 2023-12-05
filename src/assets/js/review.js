window.createMessageElement = createMessageElement;

function createMessageElement() {
    let messagesContainer = document.getElementById("messages-container");
    let message = document.getElementById("review-field").value;
    let rateVal = document.getElementById("rate").value;
    let d = document.createElement("div");
    d.setAttribute("class", "review-container")
    d.innerHTML = `
                <div class="user-info">
                <img class="user-img" src="https://avtozaryad.ru/local/templates/main/assets/images/user.png">
                <div class="user-name-rate">
                    <div class="user-name">@RedRadish</div>
                    <div class="user-rate">Оценка: ${rateVal}/10</div>
                </div>
            </div>
            <span class="review-text">
                    ${message}
                </span>
    `
/* TODO: перенести в компонент */
    messagesContainer.appendChild(d);
}
