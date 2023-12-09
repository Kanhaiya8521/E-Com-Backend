import ProductModel from "./product_schema.js";

export default class productRepository {
  async add(newProduct) {
    try {
      const product = await ProductModel.create(newProduct);
      return product;
    } catch (error) {
      new Error(error);
    }
  }
  async GetAll() {
    try {
        const products = await ProductModel.find();
        return products;
    } catch (error) {
        new Error(error);
    }
  };
};