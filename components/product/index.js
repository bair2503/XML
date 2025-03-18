//components/product/index.js
export class ProductComponent {
    constructor(parent) {
        this.parent = parent
    }

    getHTML(data) {
        return (
            `
             <h5 class="card-title">${data.title}</h5>
                <p class="card-text">${data.text}</p>
                    <img src="${data.src}" class="img" alt="картинка">   
                
            `
        )
    }

    render(data) {
        const html = this.getHTML(data)
        this.parent.insertAdjacentHTML('beforeend', html)
    }
}