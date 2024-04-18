
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

const fs = require('fs');

class FileProductManager extends ProductManager {
    constructor(filePath) {
        super();
        this.path = filePath;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
        } catch (error) {
            console.error('Error loading products:', error);
        }
    }

    saveProducts() {
        try {
            fs.writeFileSync(this.path, JSON.stringify(this.products, null, 2));
        } catch (error) {
            console.error('Error saving products:', error);
        }
    }

    addProduct(productData) {
        const id = this.generateId();
        const product = {
            id,
            ...productData
        };

        const existingProduct = this.products.find(item => item.code === productData.code);
        if (existingProduct) {
            throw new Error("Product with the same code already exists.");
        }

        this.products.push(product);
        this.saveProducts();
        return id;
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error("Product not found.");
        }

        this.products[index] = {
            ...this.products[index],
            ...updatedFields
        };

        this.saveProducts();
    }

    deleteProduct(id) {
        const index = this.products.findIndex(item => item.id === id);
        if (index === -1) {
            throw new Error("Product not found.");
        }

        this.products.splice(index, 1);
        this.saveProducts();
    }
}

module.exports = FileProductManager;
