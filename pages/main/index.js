import { ProductCardComponent } from "../../components/product-card/index.js";
import { ProductPage } from "../../pages/product/index.js";

export class MainPage {
    constructor(parent) {
        this.parent = parent;
        this.currentPage = 1;
        this.limit = 10;
        this.totalItems = 0;
    }

    get pageRoot() {
        return document.getElementById('root'); // Изменено с 'main-page' на 'root'
    }

    async getData(page = 1, limit = 3) {
        try {
            const response = await fetch(`http://localhost:8000/stocks?page=${page}&limit=${limit}`);
            const data = await response.json();

            if (data && Array.isArray(data)) {
                this.totalItems = data.length;
                return data;
            } else {
                throw new Error('Ошибка загрузки данных');
            }
        } catch (error) {
            throw new Error(`Ошибка при запросе данных: ${error.message}`);
        }
    }

    clickCard(id) {
        // Изменяем URL и отображаем страницу товара
        history.pushState(null, "", `/stocks/${id}`);

        const productPage = new ProductPage(this.parent, id);
        productPage.render();
    }

    renderData(data) {
        const pageRoot = document.getElementById('root'); // Изменено с 'main-page' на 'root'
        pageRoot.innerHTML = '';

        // Рендерим карточки с обработчиком клика
        data.forEach((item) => {
            const productCard = new ProductCardComponent(pageRoot);
            productCard.render(item, this.clickCard.bind(this));
        });
    }

    async render() {
        this.parent.innerHTML = '';

        try {
            const data = await this.getData(this.currentPage, this.limit);
            this.renderData(data);
        } catch (error) {
            console.error(error);
        }
    }
}
