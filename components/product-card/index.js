export class ProductCardComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
            <div class="products">
                <div class="cards h-100 shadow-sm" data-id="${data.id}">
                    <img src="${data.src}" class="imgs" alt="${data.title}">
                    <div class="card-body">
                        <h5 class="card-titles">${data.title}</h5>
                        <p class="card-texts">${data.text}</p>
                    </div>
                </div>  
            </div>
        `;
    }

    render(data, listener) {
        const html = this.getHTML(data);
        this.parent.insertAdjacentHTML('beforeend', html);

        // Добавляем обработчик клика на карточку
        const card = this.parent.querySelector(`.cards[data-id="${data.id}"]`);
        if (card) {
            card.addEventListener('click', (event) => {
                const cardId = event.currentTarget.dataset.id;
                console.log("Клик на карточку с ID:", cardId);
                listener(cardId); // Вызываем listener с ID товара
            });
        }
    }
}
