import { ApplicationError } from "../../error_handler/applicationError.js";
import LikeRepository from "./like_repository.js";

 
 export class LikeController {
    constructor() {
        this.likeRepository = new LikeRepository();
    }

    getLikes = async(req, res, next) => {
        try {
            const {id, type} = req.body;
            const getLikes = await this.likeRepository.getLikes(id, type);
            res.status(200).send(getLikes);
        } catch (error) {
            next(new ApplicationError(error.message, error.code || error.status || 500))   
        }
    }

    likeItem = async(req, res, next) => {
        try {
            const {id, type} = req.body;
            const userID = req.userID;
            if(type != 'Product' && type != 'Category') {
                next(new ApplicationError("Type shoule be Product or Category", 404));
            }
            if(type == 'Product') {
                await this.likeRepository.likeProduct(userID, id);
            } else {
                await this.likeRepository.likeCategory(userID, id);
            }
            
        } catch (error) {
            console.log(error);
            throw new Error(error);
        }
        res.status(200).send("ok");
    }
 }