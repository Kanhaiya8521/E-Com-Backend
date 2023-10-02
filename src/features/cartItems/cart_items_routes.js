import express from 'express';
import { CartItemsController } from './cart_items_controller.js';
const router = express.Router();

const cartController = new CartItemsController();

router.post('/', cartController.add)
router.get("/", cartController.get);
router.delete("/:id", cartController.delete);



export default router;