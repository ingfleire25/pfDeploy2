const { Router } = require("express");
const categoriesRouter = Router()
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categories")

categoriesRouter.get("/", getCategories)
categoriesRouter.post("/create", createCategory)
//categoriesRouter.put("/update" , updateCategory)
categoriesRouter.delete("/delete", deleteCategory)

module.exports = categoriesRouter