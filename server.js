import express from "express";
const server = express();

server.get("/", (req, res) => {
  res.send("Welcome to the E-commerce website!");
});

server.listen(3000, () => {
  console.log("Server is listening on 3000");
});
