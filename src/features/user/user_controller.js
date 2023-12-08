import UserModel from "./user_schema.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user_repository.js";
import bcrypt from "bcrypt";
import { ApplicationError } from "../../error_handler/applicationError.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  resetPassword = async (req, res, next) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword) {
        return next(new ApplicationError("newPassword is required", 404));
      }
      const hashedPassword = await bcrypt.hash(newPassword, 12);
      await this.userRepository.resetPassword(req.userID, hashedPassword);
      res.status(200).send("updated password successfully");
    } catch (error) {
      next(
        new ApplicationError(
          error.message || "Internal Server Error",
          error.code || 500
        )
      );
    }
  };

  async signUp(req, res, next) {
    try {
      const { name, email, password, type } = req.body;
      if (!name || !email || !password) {
        // return res.status(404).send('all field required');
        return next(
          new ApplicationError("name, email and password are required", 404)
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
        type: type,
      });
      await this.userRepository.signUp(user);
      res.status(201).send(user);
    } catch (error) {
      next(new ApplicationError(error.message || "Internal Server Error", error.code || 500))
    }
  }

  async signIn(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(
          new ApplicationError("email and password are required", 404)
        );
      }
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(email);
      if (!user) {
        return next(new ApplicationError("Incorrect Credentials", 400));
      } else {
        // 2. Compare password with hashed password.
        const result = await bcrypt.compare(password, user.password);
        if (result) {
          // 3. Create token.
          const token = jwt.sign(
            {
              userID: user._id,
              email: user.email,
            },
            "AIb6d35fvJM4O9pXqXQNla2jBCH9kuLz",
            {
              expiresIn: "1h",
            }
          );
          // 4. Send token.
          return res.status(200).send(token);
        } else {
          return next(new ApplicationError("Incorrect Credentials", 400));
        }
      }
    } catch (error) {
      next(
        new ApplicationError(
          error.message || "Internal Server Error",
          error.code || 500
        )
      );
    }
  }
}
