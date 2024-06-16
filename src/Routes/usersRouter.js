const { Router } = require("express");
const usersRouter = Router()
const { newUser } = require("../controllers/users")
//const { check } = require("express-validator")

usersRouter.post("/create", newUser)// crear usuario
// usersRouter.post("/login", loginHandler)// accede al sistema



 
// usersRouter.get ("/", getUsers) // listar usuarios
// usersRouter.put ("/:id" , updateUser) // modificar usuarios
// usersRouter.delete ("/:id" , deleteUser) // borrado logico

module.exports = usersRouter
