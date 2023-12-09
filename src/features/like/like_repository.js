import { ObjectId } from "mongodb";
import LikeModel from "./like_schema.js";

export default class LikeRepository {
  async getLikes(id, type) {
    try {
      return await LikeModel.findOne({
        likeable: new ObjectId(id),
        on_model: type,
      }).populate("user")
      .populate({path: "likeable", model: type});
    } catch (error) {
      throw new Error(Error);
    }
  }

  async likeProduct(userId, productId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(productId),
        on_model: "Product",
      });
      await newLike.save();
    } catch (error) {
      throw new Error(Error);
    }
  }

  async likeCategory(userId, categoryId) {
    try {
      const newLike = new LikeModel({
        user: new ObjectId(userId),
        likeable: new ObjectId(categoryId),
        on_model: "Category",
      });
      await newLike.save();
    } catch (error) {
      throw new Error(Error);
    }
  }
}