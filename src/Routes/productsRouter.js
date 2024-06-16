const { Router } = require("express");
const productsRouter = Router()
const getProducts  = require("../controllers/products")


productsRouter.get("/" , getProducts )

module.exports = productsRouter