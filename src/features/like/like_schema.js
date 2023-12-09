import mongoose from "mongoose";

const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    likeable: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'on_model',
    },
    on_model: {
        type: String,
        enum: ['Product', 'Category'],
    }
})

const Like = mongoose.model("like", likeSchema);
export default Like;
