import { ProductComponent } from "../../components/product/index.js";
import { BackButtonComponent } from "../../components/back-button/index.js";
import { MainPage } from "../main/index.js";

export class ProductPage {
    constructor(parent, id) {
        this.parent = parent;
        this.id = id;  // Сохраняем ID товара
    }

    get pageRoot() {
        return document.getElementById('main-page');
    }

    async getData() {
        try {
            const response = await fetch(`http://localhost:8000/stocks/${this.id}`);
            if (!response.ok) {
                throw new Error("Ошибка загрузки данных");
            }
            return await response.json();
        } catch (error) {
            console.error(error);
            return null;
        }
    }

    getHTML() {
        return `
        <button id="backButton" class="btn-product btn-primary">Назад</button>
            <div id="main-page" class="row me-5 ms-5" ></div>
        `;
    }

    clickBack() {
        const mainPage = new MainPage(this.parent);
        mainPage.render();
        history.pushState(null, "", "/");
    }

    async render() {
        this.parent.innerHTML = '';  // Очищаем родительский контейнер перед вставкой нового контента

        const html = this.getHTML();
        this.parent.insertAdjacentHTML('beforeend', html);

        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', this.clickBack.bind(this));
        }

        try {
            // Получаем данные товара и отображаем их
            const data = await this.getData();
            const productContent = document.getElementById('main-page');
            if (data && productContent) {
                // Передаем данные в компонент ProductComponent для рендеринга
                const productComponent = new ProductComponent(productContent);
                productComponent.render(data);  // Передаем данные в компонент для рендеринга
            } else {
                console.error("Ошибка загрузки данных или ошибка отображения.");
                productContent.innerHTML = "<p>Ошибка при загрузке данных товара.</p>";
            }
        } catch (error) {
            console.error("Ошибка при получении данных товара:", error);
        }
    }
}
