const express = require("express");
const cors = require('cors');
const {connectToMongo} = require("./connection/quiz");
const cookiesParser = require("cookie-parser");
const {routers,signupRouter,quizRouter,loginRouter,userRouter,logoutRouter,routerhome} = require("./routes/quizRoutes");
const {checkUsers} = require("./middleware/userVerification");

const app = express();
connectToMongo("mongodb://127.0.0.1:27017/quiz-app")
.then(()=>console.log("Connected to db.."))
.catch(()=>console.log("Error at connecting to db.."));
app.use(express.static("build"));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers',   
        'Origin, X-Requested-With, Content-Type, Accept');
        next();   
    });
app.use(cors({
        origin: '*', // Replace with your React app's origin
        credentials: true // Allow sending cookies
    }));
app.use(express.json());
app.use(express.urlencoded());
app.use(cookiesParser());
app.use("/",routerhome);
app.use("/api",checkUsers,userRouter);
app.use("/api/Signup",signupRouter);
app.use("/api/createQuiz",checkUsers,quizRouter);
app.use("/api/login",loginRouter);
app.use("/api/logout",logoutRouter);
app.use("/api/",routers);


app.listen(3000,()=>{console.log("successfully connected...")})