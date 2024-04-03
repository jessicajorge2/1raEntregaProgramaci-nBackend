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

  // Crear instancia de ProductManager
  const productManager = new ProductManager();

  // Llamar a getProducts
  console.log("Productos iniciales:", productManager.getProducts());

  // Añadir un producto
  try {
    const productId = productManager.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25);
    console.log("Producto añadido satisfactoriamente con id:", productId);
  } catch (error) {
    console.error("Error al añadir el producto:", error.message);
  }

  // Llamar a getProducts después de añadir un producto
  console.log("Productos después de añadir:", productManager.getProducts());

  // Intentar añadir un producto con el mismo código
  try {
    productManager.addProduct("producto repetido", "Este es un producto repetido", 300, "Sin imagen", "abc123", 30);
  } catch (error) {
    console.error("Error al añadir el producto repetido:", error.message);
  }

  // Probar getProductById
  try {
    const product = productManager.getProductById(productId);
    console.log("Producto encontrado por id:", product);
  } catch (error) {
    console.error("Error al buscar el producto por id:", error.message);
  }

  // Intentar getProductById con un id inexistente
  try {
    productManager.getProductById("nonexistentid");
  } catch (error) {
    console.error("Error al buscar el producto por id:", error.message);
  }
