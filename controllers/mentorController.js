const {catchAsyncError} = require("../middlewares/catchAsyncError")
const mentorModel = require("../models/mentorModel")
const passport = require("passport")


exports.home = catchAsyncError(async (req, res) => {
    res.json({ message: 'Secure homepage' });
})

exports.registermentee = catchAsyncError(async (req, res) => {
    res.render("mentors/register");
})

exports.register = catchAsyncError(async (req, res) => {
    var mentor = new mentorModel({
         username: req.body.username,
         password: req.body.password,
         email: req.body.email,
         contact: req.body.contact,
         skills: req.body.skills,

       })

   mentorModel.register(mentor,req.body.password)
  .then(function(mentor){
    passport.authenticate("local")(req,res,function(){
      res.send("okk")
    })
  })
})


exports.login = catchAsyncError(async (req, res) => {
    res.render("mentor/login");
    
})


exports.getmentor = catchAsyncError(async (req, res) => {
    res.render("mentor/register");

})


exports.updatementor = catchAsyncError(async (req, res) => {
    res.redirect("/");

})

exports.deletementor = catchAsyncError(async (req, res) => {
    res.redirect("/");

})