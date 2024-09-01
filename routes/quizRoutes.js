const express = require("express");
const {getQuestions,postQuestion} = require("../controller/quiz");
const routers = express.Router();

routers.route("/").get((req,res)=>getQuestions(req,res)).post((req,res)=>postQuestion(req,res));

module.exports={
    routers
};

