import ProductModel from './product_model.js';
export default class ProductController {
  
  getAllProducts(req, res) {
    const products = ProductModel.GetAll();
     return res.status(200).send(products);
  }

  addProduct(req, res) {
    const {name, price, sizes } = req.body;
    console.log(req.file)
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(','),
      imageUrl: req.file.filename,
    };
    const createRecord = ProductModel.add(newProduct);
    res.status(201).send(createRecord);
  }

  rateProduct(req, res) {}

  getOneProduct(req, res) {}
};
