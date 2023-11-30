import UserModel from './user_model.js';
import jwt from 'jsonwebtoken';
export default class UserController {
    async signUp(req, res) {
        const {name, email, password, type} = req.body;
        const user = await UserModel.signUp(name, email, password, type);
        console.log("user", user);
        // res.status(201).send(user);
    }

    signIn(req, res) {
        const result = UserModel.signIn(req.body.email, req.body.password);

        if(!result) {
            return res.status(400).send('Incorrect Credentials');
        } else {
            // 1. Create token.
            const token = jwt.sign(
              { userID: result.id, email: result.email },
              "pwuB6Ynnry"
            , { expiresIn: '1h'});
            // 2. Send token
            return res.status(200).json({
                status: 'success', 
                token: token
            });
        }
    }
}