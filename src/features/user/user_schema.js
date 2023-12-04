import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: String,
    email: {type: String, unique: true},
    password: String,
    type: {type: String, enum: ["Customer", "Seller"]},
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
