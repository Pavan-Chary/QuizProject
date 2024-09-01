const express = require("express");
const {connectToMongo} = require("./connection/quiz");
const {routers} = require("./routes/quizRoutes");

const app = express();
connectToMongo("mongodb://127.0.0.1:27017/quiz-app")
.then(()=>console.log("Connected to db.."))
.catch(()=>console.log("Error at connecting to db.."))
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Allow requests from any origin
    res.header('Access-Control-Allow-Headers',   
        'Origin, X-Requested-With, Content-Type, Accept');
        next();   
    });
app.use(express.json());
app.use(express.urlencoded());
app.use((req,res,next)=>{
        console.log(req.body);
        next();
    });
app.use("/",routers);

app.listen(8000,()=>{console.log("successfully connected...")})