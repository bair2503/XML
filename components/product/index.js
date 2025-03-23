//components/product/index.js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
            <div class="row">
                <div class="product">
                    <div class="card" h-100 shadow-sm data-id="${data.id}">
                        <img src="${data.src}" class="img" alt="${data.title}">
                        <div class="card-body">
                            <h5 class="card-title">${data.title}</h5>
                            <p class="card-text">${data.text}</p>
                        </div>
                    </div>
                </div>
            </div>       
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}