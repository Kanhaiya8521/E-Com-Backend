import { ObjectId } from "mongodb";
import ProductModel from "./product_schema.js";
import ReviewModel from "./review_schema.js";
import CategoryModel from "./category_schema.js";
export default class productRepository {
  async add(newProduct) {
    try {
        newProduct.categories = newProduct.categories.split(",");
        console.log(newProduct);
      const product = await ProductModel(newProduct);
      const savedProduct = await product.save();

      // 2. Update categories.
      await CategoryModel.updateMany(
        {_id: {$in: newProduct.categories}},
        {$push: {products: new ObjectId(savedProduct._id)}}
      )
    } catch (error) {
      throw new Error(error);
    }
  }
  async GetAll() {
    try {
      const products = await ProductModel.find();
      return products;
    } catch (error) {
      new Error(error);
    }
  }
  async rate(userID, productID, rating) {
    try {
      // 1. check if product exists
      console.log(productID);
      const productToUpdate = await ProductModel.findOne({_id: productID});
      if (!productToUpdate) {
        throw new Error("Product not fount");
      }
      // find the existing review
      const userReview = await ReviewModel.findOne({
        product: new ObjectId(productID),
        user: new ObjectId(userID),
      });

      if (userReview) {
        userReview.rating = rating;
        await userReview.save();
      } else {
        const newReview = new ReviewModel({
          product: new ObjectId(productID),
          user: new ObjectId(userID),
          rating: rating,
        });
        await newReview.save();
      }
      return true;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }
}
