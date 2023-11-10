import ProductModel from "./product_model.js";
export default class ProductController {
  getAllProducts(req, res) {
    const products = ProductModel.GetAll();
    return res.status(200).send(products);
  }

  addProduct(req, res) {
    const { name, price, sizes } = req.body;
    console.log(req.file);
    const newProduct = {
      name,
      price: parseFloat(price),
      sizes: sizes.split(","),
      imageUrl: req.file.filename,
    };
    const createRecord = ProductModel.add(newProduct);
    res.status(201).send(createRecord);
  }

  rateProduct(req, res) {
    const userID = req.query.userID;
    const productID = req.query.productID;
    const rating = req.query.rating;
    // try {
      ProductModel.rateProduct(userID, productID, rating);
    // } catch (error) {
      // return res.status(400).send(error.message);
    // }
    return res.status(200).send("okay");
  }

  getOneProduct(req, res) {
    const id = req.params.id;
    // console.log(id);

    const product = ProductModel.GetOneProduct(id);
    if (product) {
      res.status(200).send(product);
    } else {
      res.status(404).send("product not found");
    }
  }

  filterProducts(req, res) {
    const minPrice = parseInt(req.query.minPrice);
    const maxPrice = parseInt(req.query.maxPrice);
    const category = req.query.category;

    const result = ProductModel.filter(minPrice, maxPrice, category);

    res.status(200).send(result);
  }
}
