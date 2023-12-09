import productRepository from "./product_repository.js";
import {ApplicationError} from "./../../error_handler/applicationError.js";

export default class ProductController {

  constructor() {
    this.productRepository = new productRepository();
  }
  getAllProducts = async (req, res) => {
    try {
      const products = await this.productRepository.GetAll();
      return res.status(200).send(products);
    } catch (error) {
      next(new ApplicationError(error.message, error.code));
    }
  }

  addProduct = async (req, res) => {
    try {
      const { name, price, category, description, inStock } = req.body;
      const newProduct = {
        name,
        price: parseFloat(price),
        category,
        description,
        inStock,
      };
      const createRecord = await this.productRepository.add(newProduct);
      res.status(201).send(createRecord);
    } catch (error) {
      next(new ApplicationError(error.message, error.code));
    }
  }

  // rateProduct(req, res) {
  //   const userID = req.query.userID;
  //   const productID = req.query.productID;
  //   const rating = req.query.rating;
  //   // try {
  //     ProductModel.rateProduct(userID, productID, rating);
  //   // } catch (error) {
  //     // return res.status(400).send(error.message);
  //   // }
  //   return res.status(200).send("okay");
  // }

  // getOneProduct(req, res) {
  //   const id = req.params.id;
  //   // console.log(id);

  //   const product = ProductModel.GetOneProduct(id);
  //   if (product) {
  //     res.status(200).send(product);
  //   } else {
  //     res.status(404).send("product not found");
  //   }
  // }

  // filterProducts(req, res) {
  //   const minPrice = parseInt(req.query.minPrice);
  //   const maxPrice = parseInt(req.query.maxPrice);
  //   const category = req.query.category;

  //   const result = ProductModel.filter(minPrice, maxPrice, category);

  //   res.status(200).send(result);
  // }
}
