import ProductModel from './product_model.js';
export default class ProductController {
  
  getAllProducts(req, res) {
    const products = ProductModel.GetAll();
     return res.status(200).send(products);
  }

  addProduct(req, res) {}

  rateProduct(req, res) {}

  getOneProduct(req, res) {}
};
