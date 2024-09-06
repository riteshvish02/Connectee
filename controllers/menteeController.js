const {catchAsyncError} = require("../middlewares/catchAsyncError")
const menteeModel = require("../models/menteeModel")
const passport = require("passport")
exports.home = catchAsyncError(async (req, res) => {
    res.send("working");
})

exports.register = catchAsyncError(async (req, res) => {
   
    var mentor = new menteeModel({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        contact: req.body.contact,
        skillsInterestedIn: req.body.skillsInterestedIn,

      })

  menteeModel.register(mentor,req.body.password)
 .then(function(mentor){
   passport.authenticate("local")(req,res,function(){
     res.send("okk")
   })
 })
})


exports.login = catchAsyncError(async (req, res) => {
   res.render("mentees/login");
})


exports.registermentee = catchAsyncError(async (req, res) => {
    res.render("mentees/register");
})


exports.loginmentee = catchAsyncError(async (req, res) => {
   res.send("mentees/login");
})

exports.getmentee = catchAsyncError(async (req, res) => {
    res.json({ message: 'Secure homepage' });
})


exports.updatementee = catchAsyncError(async (req, res) => {
    res.json({ message: 'Secure homepage' });
})

exports.deletementee = catchAsyncError(async (req, res) => {
    res.json({ message: 'Secure homepage' });
})