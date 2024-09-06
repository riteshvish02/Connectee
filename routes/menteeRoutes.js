const express = require("express")

const route = express.Router()
const {register,login,updatementee,deletementee,getmentee,home, registermentee, loginmentee} = require("../controllers/menteeController")
route.get("/",home)
route.post("/register",register)
route.get("/register",registermentee)
route.post("/login",loginmentee)
route.get("/login",login)
route.get("/user/:id",getmentee)
route.patch("/user/:id",updatementee)


module.exports = route;