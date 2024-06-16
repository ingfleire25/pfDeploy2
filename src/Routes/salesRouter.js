const { Router } = require("express");
const { getSale, getSales, createSales, updateSales, deleteSales } = require("../controllers/sales")

const salesRouter = Router()

const { ProductsController } = require("../controllers/ProductsController")

salesRouter.get("/", getSales)
salesRouter.get("/:id", getSale)
salesRouter.post("/", createSales)
salesRouter.put("/:id", updateSales)
salesRouter.delete("/:id" , deleteSales)

module.exports = salesRouter