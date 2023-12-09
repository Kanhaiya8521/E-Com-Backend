import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: String,
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ]
})
const Category = mongoose.model("Category", categorySchema);
export default Category;