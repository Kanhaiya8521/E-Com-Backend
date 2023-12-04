import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
const url = process.env.MongoDB_url;
console.log(url);
const connectToMongoDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
  }
};

export default connectToMongoDB;
