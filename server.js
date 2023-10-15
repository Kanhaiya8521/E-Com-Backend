import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import productRouter from './src/features/product/product_router.js';
import cartRouter from './src/features/cartItems/cart_items_routes.js'
import userRouter from './src/features/user/user_routes.js';
import jwtAuth from "./src/middleware/jwt_middleware.js";
// import apiDocs from './swagger.json';
import apiDocs from "./swagger.json" assert { type: "json" };


const server = express();

server.use(express.json());
server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the E-commerce website!");
});

server.listen(3000, () => {
  console.log("Server is listening on 3000");
});
