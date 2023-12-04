import { ApplicationError } from '../../error_handler/applicationError.js';
import UserModel from './user_schema.js';

class UserRepository {
    async signUp(user){
        try {
            //create instance of model
            const newUser = new UserModel(user);
            await newUser.save();
            console.log(newUser);
            return newUser;
            
        } catch (error) {
            console.log(error);
            throw new ApplicationError("Something went wrong with database", 500);
        }
    }

    async findByEmail(email) {
        try {
            return await UserModel.findOne({email});
        } catch (error) {
            console.log(error);
            throw new ApplicationError(
              "Sonething went wrong with database",
              500
            );
        }
    }
}

export default UserRepository;