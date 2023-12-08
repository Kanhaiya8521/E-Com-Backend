import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {type: String, maxLength: [5, "Name can't be greater than 5 characters"]},
    email: {type: String, required: true, unique: true, match: [/.+\@.+\./, "please enter a valid email"]},
    password: {type: String, required: true},
    type: {type: String, enum: ["Customer", "Seller"]},
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
