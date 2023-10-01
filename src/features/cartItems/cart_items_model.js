
// 
export default class CartItemModel {
    constructor(productID, userID, quantity, id){
        this.productID = productID;
        this.userID = userID;
        this.quantity = quantity;
        this.id = id;
    }

    static add(productID, userID, quantity, id){
        const cartItem = new CartItemModel(productID, userID, quantity);
        cartItems.push(cartItem);
        cartItem.id = cartItems.length + 1;
        return cartItem;
    }

    static get(userID) {
        return cartItems.filter((i) => i.userID == userID);
    }
};

var cartItems = [
    new CartItemModel(1, 2, 1, 1), 
    new CartItemModel(1, 1, 2, 2)
];