
class ProductManager {
    constructor() {
        this.products = [];
    }

    getProducts() {
        return this.products;
    }


    addProduct(title, description, price, thumbnail, code, stock) {
        const id = this.generateId();
        const product = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        };

        const existingProduct = this.products.find(item => item.code === code);
        if (existingProduct) {
            throw new Error("Product with the same code already exists.");
        }

        this.products.push(product);
        return id;
    }

    getProductById(id) {
        const product = this.products.find(item => item.id === id);
        if (!product) {
            throw new Error("Product not found.");
        }
        return product;
    }

    generateId() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}

module.exports = ProductManager;
