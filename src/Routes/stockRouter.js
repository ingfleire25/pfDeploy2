const { Router } = require("express");
const stockRouter = Router()
const { getStocks, getStock, createStock, updateStock, deleteStock } = require ("../controllers/stock")

stockRouter.post("/create", createStock)
stockRouter.get("/:id" , getStock)
stockRouter.put("/id" , updateStock)
stockRouter.delete("/:id" , deleteStock)

module.exports = stockRouter