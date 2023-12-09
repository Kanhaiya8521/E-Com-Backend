import  express  from "express";
import ProductController from "./product_controller.js";
import {upload} from './../../middleware/fileupload_midleware.js';
import jwtAut from "./../../middleware/jwt_middleware.js"
const router = express.Router();

const productController = new ProductController();

// router.post("/rate", productController.rateProduct)
router.get('/getAllProduct', productController.getAllProducts);
router.post("/add", productController.addProduct);

// router.get("/:id", productController.getOneProduct);
// router.post('/filter', productController.filterProducts);


export default router;

