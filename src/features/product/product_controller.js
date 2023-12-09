import productRepository from "./product_repository.js";
import { ApplicationError } from "./../../error_handler/applicationError.js";

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
  };

  addProduct = async (req, res, next) => {
    try {
      const { name, price, categories, description, inStock } = req.body;
      const newProduct = {
        name,
        price: parseFloat(price),
        categories,
        description,
        inStock,
      };
      const createdRecord = await this.productRepository.add(newProduct);
      res.status(201).send("createdRecord");
    } catch (error) {
      next(new ApplicationError(error.message, error.code || 500));
    }
  };

  rateProduct = async (req, res, next) => {
    try {
      const userID = req.userID;
      const productID = req.body.productID;
      const rating = req.body.rating;
      await this.productRepository.rate(userID, productID, rating);
      res.status(200).send("success");
    } catch (error) {
      next(new ApplicationError(error.message, error.code || 500));
    }
  };

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
