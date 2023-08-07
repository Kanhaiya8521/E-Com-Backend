import express from "express";
import bodyParser from "body-parser";
import productRouter from './src/features/product/product_router.js';
import userRouter from './src/features/user/user_routes.js';
import basicAuthorizer from "./src/middleware/basicAuth_middleware.js";

const server = express();

server.use(express.json());
server.use(bodyParser.json());
server.use("/api/products", basicAuthorizer, productRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the E-commerce website!");
});

server.listen(3000, () => {
  console.log("Server is listening on 3000");
});
