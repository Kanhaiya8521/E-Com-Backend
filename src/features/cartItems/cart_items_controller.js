import CartItemModel from './cart_items_model.js';
export class CartItemsController {
    add(req, res) {
        const { productID, quantity } = req.query;
        const userID = req.userID;
        console.log(productID, userID, quantity);

        CartItemModel.add(productID, quantity, userID);
        res.status(201).send('cart is updated');
    }

    get(req, res) {
        const userID = req.userID;
        const items = CartItemModel.get(userID);
        return res.status(200).send(items);
    }

};