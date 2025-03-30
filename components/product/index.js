// components/product/index.js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent;
    }

    getHTML(data) {
        return `
                <div class="product">
                    <div class="card" data-id="${data.id}">
                        <h5 class="card-title">${data.title}</h5>
                        <p class="card-text">${data.text}</p>
                        <img src="${data.src}" class="img" alt="${data.title} ">        
                    </div>
                </div>     
        `;
    }

    render(data) {
        return new Promise((resolve, reject) => {
            try {
                const html = this.getHTML(data);
                this.parent.insertAdjacentHTML('beforeend', html);

                // После успешного рендеринга вызываем resolve
                resolve('Карточка продукта успешно отрендерена');
            } catch (error) {
                // В случае ошибки отклоняем промис
                reject('Ошибка при рендеринге карточки продукта');
            }
        });
    }
}
