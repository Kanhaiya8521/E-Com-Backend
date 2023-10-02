import CartItemModel from "./cart_items_model.js";
export class CartItemsController {
  add(req, res) {
    const { productID, quantity } = req.query;
    const userID = req.userID;
    console.log("userID", userID);
    CartItemModel.add(productID, userID, quantity);
    res.status(201).send("Cart is updated");
  }

  get(req, res) {
    const userID = req.userID;
    console.log("userID", userID);
    const items = CartItemModel.get(userID);
    return res.status(200).send(items);
  }

    delete(req, res) {
      const cartItemID = req.params.id;
      const userID = req.userID;
    //   console.log(cartItemID, userID);
      const error = CartItemModel.delete(cartItemID, userID);
      if (error) {
        return res.status(400).send(error);
      }
      res.status(200).send("Item deleted");
    }
}
