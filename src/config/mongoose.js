import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import CategoryModel from "./../features/product/category_schema.js";
const url = process.env.MongoDB_url;
console.log(url);
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
    addCategories();
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

async function addCategories() {
  const categoryModel = await CategoryModel.find();
  if(categoryModel.length == 0){
    await CategoryModel.insertMany([{name: "Books"}, {name: "Clothing"}, {name: "Electronincs"}]);
  }
  console.log("Categories added");
}

export default connectToMongoDB;
