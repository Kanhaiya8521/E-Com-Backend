import express from "express";
import bodyParser from "body-parser";
import router from './src/features/product/product_router.js';

const server = express();

server.use(bodyParser.json());
server.use("/api/products", router);

server.get("/", (req, res) => {
  res.send("Welcome to the E-commerce website!");
});

server.listen(3000, () => {
  console.log("Server is listening on 3000");
});
