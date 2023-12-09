import { ObjectId } from "mongodb";
import ProductModel from "./product_schema.js";
import ReviewModel from "./review_schema.js";
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
  }
  async rate(userID, productID, rating) {
    try {
      // 1. check if product exists
      const productToUpdate = await ProductModel.findById(productID);
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
