const express = require("express")

const route = express.Router()
const {login,updatementor,deletementor,registermentee,register,getmentor} = require("../controllers/mentorController")
route.post("/register",register)
route.get("/register",registermentee)
route.post("/login",login)
route.get("/user/:id",getmentor)
route.patch("/user/:id",updatementor)


module.exports = route;