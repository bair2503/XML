// components/back-button/index.js
export class BackButtonComponent {
    constructor(parent) {
        this.parent = parent;
    }

    addListeners(listener) {
        const backButton = document.getElementById("back-button");
        if (backButton) {
            backButton.addEventListener("click", listener);
        } else {
            console.error("Кнопка 'Назад' не найдена в DOM.");
        }
    }

    getHTML() {
        return `
            <button id="back-button" class="btn" type="button">Главное</button>
        `;
    }

    render(listener) {
        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(listener); // Добавляем слушателя после вставки кнопки в DOM
    }
}
