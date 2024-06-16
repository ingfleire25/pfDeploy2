const { Router } = require("express");
const recordRouter = Router()
const Record = require("../models/record")
const { check, validationResult } = require("express-validator")
const auth = require("../middleware/auth")

const {getRecord , putRecord , postRecord , deleteRecord} = require("../controllers/record") 
recordRouter.get("/", getRecord)
recordRouter.put("/:id", putRecord)
recordRouter.post("/", postRecord)
recordRouter.delete("/:id", deleteRecord)

module.exports = recordRouter




