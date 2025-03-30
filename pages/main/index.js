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

    getData(callback, page = 1, limit = 3) {
        fetch(`http://localhost:8000/stocks?page=${page}&limit=${limit}`)
            .then(response => response.json())
            .then(data => {
                if (data && Array.isArray(data)) {
                    this.totalItems = data.length;
                    callback(null, data);
                } else {
                    callback("Ошибка загрузки данных", null);
                }
            })
            .catch(error => {
                callback(`Ошибка при запросе данных: ${error.message}`, null);
            });
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

    render() {
        this.parent.innerHTML = '';

        this.getData((error, data) => {
            if (error) {
                console.error(error);
                return;
            }

            this.renderData(data);
        }, this.currentPage, this.limit);
    }
}
