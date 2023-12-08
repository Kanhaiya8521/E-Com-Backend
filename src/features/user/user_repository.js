import { ApplicationError } from "../../error_handler/applicationError.js";
import UserModel from "./user_schema.js";

class UserRepository {
  async resetPassword(userID, hashPassword) {
    try {
      const user = await UserModel.findById({ _id: userID });
      user.password = hashPassword;
      user.save();
      return user;
    } catch (error) {
      throw new Error(error);
    }
  }
  async signUp(user) {
    try {
      const findEmail = await UserModel.findOne({ email: user.email });
      if (findEmail) {
        throw new Error("email already exists");
      }
      //create instance of model
      const newUser = new UserModel(user);
      await newUser.save();
      // console.log(newUser);
      return newUser;
    } catch (error) {
      console.log("error:", error);
      throw new Error(error.message);
    }
  }

  async findByEmail(email) {
    try {
      return await UserModel.findOne({ email });
    } catch (error) {
      console.log(error);
      throw new Error("Sonething went wrong with database");
    }
  }
}

export default UserRepository;
