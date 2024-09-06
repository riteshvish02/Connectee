const  express = require("express");
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const expressSession = require("express-session");
const passport = require('passport');
const app = express();
const path = require('path')


const passportConfig = require("./utils/passport")
//DB
const {connectionDB} = require("./models/database")
connectionDB()


app.use(logger('dev'));

app.use(cookieParser());




app.use('/static', express.static(path.join(__dirname, 'public')))


app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:"rvrvrvrvrvr"
}))

app.use(passport.initialize());
app.use(passport.session());

// set the view engine to ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use("/api/v1/mentee",require("./routes/menteeRoutes"))
app.use("/api/v1/mentors",require("./routes/mentorRoutes"))

const ErrorHandler = require("./utils/ErrorHandler")
const {generatedError} = require("./middlewares/error")

app.use(generatedError)
app.all("*",(res,req,next)=>{
    next(new ErrorHandler(`Requested URL NOT Found  ${req.url}`,404))
})


app.listen(3000,()=>{
    console.log("server listening on 3000");
    
})