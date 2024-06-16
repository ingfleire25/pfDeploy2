const { Router } = require("express");
const loginRouter = Router()
const {loginHandler, registerHandler } = require("../controllers/login")
//const { check } = require("express-validator")

loginRouter.post("/create", registerHandler)// crear usuario
loginRouter.post("/login", loginHandler)// accede al sistema


module.exports = loginRouter


