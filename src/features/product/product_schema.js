import mongoose from 'mongoose';

export const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  inStock: Number,
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
  ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;