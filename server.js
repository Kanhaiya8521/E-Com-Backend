import express from "express";
import bodyParser from "body-parser";
import swagger from "swagger-ui-express";
import cors from 'cors';
import productRouter from './src/features/product/product_router.js';
import cartRouter from './src/features/cartItems/cart_items_routes.js'
import userRouter from './src/features/user/user_routes.js';
import jwtAuth from "./src/middleware/jwt_middleware.js";
// import apiDocs from './swagger.json';
import apiDocs from "./swagger.json" assert { type: "json" };
import loggerMiddleware from './src/middleware/logger_middleware.js';


const server = express();

// CORS policy configuration
// cors using library
const corsOptions = {
  origin: 'http://localhost:5500'
}
server.use(cors(corsOptions));


// cors using headers
// server.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5500');
//   res.header('Access-Control-Allow-Headers', '*');
//   res.header('Access-Control-Allow-Methods', '*');
//   // return ok for preflight request.
//   if(req.method == "OPTIONS"){
//     return res.sendStatus(200);
//   }
//   next();
// })

server.use(express.json());
server.use(bodyParser.json());

server.use("/api-docs", swagger.serve, swagger.setup(apiDocs));

// logger
server.use(loggerMiddleware);

server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cartItems", jwtAuth, cartRouter);
server.use("/api/users", userRouter);

server.get("/", (req, res) => {
  res.send("Welcome to the E-commerce website!");
});

// moddleware for handling 404 requests
server.use((req, res) => {
  res.status(404).send('API not found, please check your path');
})

server.listen(3000, () => {
  console.log("Server is listening on 3000");
});
