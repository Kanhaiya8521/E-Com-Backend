import  express  from "express";
import ProductController from "./product_controller.js";
import {upload} from './../../middleware/fileupload_midleware.js'
const router = express.Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.get("/:id", productController.getOneProduct);

router.post('/', upload.single('imageUrl'), productController.addProduct);

export default router;

