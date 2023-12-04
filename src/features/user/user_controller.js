import UserModel from "./user_schema.js";
import jwt from "jsonwebtoken";
import UserRepository from "./user_repository.js";
import bcrypt from "bcrypt";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
    this.signUp = this.signUp.bind(this);
    this.signIn = this.signIn.bind(this);
  }

  async signUp(req, res) {
    try {
      const { name, email, password, type } = req.body;
      console.log("this is", req.body);

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
      console.log(error);
      res.status(500).send(error);
    }
  }

  async signIn(req, res, next) {
    try {
      // 1. Find user by email.
      const user = await this.userRepository.findByEmail(req.body.email);
      if (!user) {
        return res.status(400).send("Incorrect Credentials");
      } else {
        // 2. Compare password with hashed password.
        const result = await bcrypt.compare(req.body.password, user.password);
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
          return res.status(400).send("Incorrect Credentials");
        }
      }
    } catch (err) {
      console.log(err);
      return res.status(200).send("Something went wrong");
    }
  }
}
