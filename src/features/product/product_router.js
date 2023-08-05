import  express  from "express";
import ProductController from "./product_controller.js";

const router = express.Router();

const productController = new ProductController();

router.get('/', productController.getAllProducts);
router.post('/', productController.addProduct);

export default router;

