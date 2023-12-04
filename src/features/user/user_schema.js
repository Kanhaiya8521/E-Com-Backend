import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    type: {type: String, enum: ["Customer", "Seller"]},
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
