//components/product-card/index.js
export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
                <div class="products">
                    <div class="cards" h-100 shadow-sm id="click-card-${data.id}" data-id="${data.id}">
                        <img src="${data.src}" class="imgs" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-titles">${data.title}</h5>
                            <p class="card-texts">${data.text}</p>
                        </div>
                    </div>
                </div>
        `;
    }

    addListeners(data, listener) {
        document
            .getElementById(`click-card-${data.id}`)
            .addEventListener("click", () => listener(data.id)); // Передаем id продукта
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);
        this.addListeners(data, listener);
    }
}


