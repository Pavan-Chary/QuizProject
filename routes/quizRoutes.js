const express = require("express");
const {getQuestions,postQuestion,createUser,createQuiz,handleLogin,showUser,handleLogout,returnToHome} = require("../controller/quiz");
const routers = express.Router();
const loginRouter = express.Router();
const signupRouter = express.Router();
const quizRouter = express.Router();
const userRouter = express.Router();
const logoutRouter = express.Router();
const createQuestionRouter = express.Router();
const routerhome = express.Router();

routers.route("/playing").post((req,res)=>postQuestion(req,res));
routers.route("/playing/:id").get(getQuestions);
routerhome.route("/Login").get(returnToHome);
routerhome.route("/play").get(returnToHome);
routerhome.route("/signup").get(returnToHome);
userRouter.route("/user").get(showUser);
loginRouter.route("/").post(handleLogin);
signupRouter.route("/").post(createUser);
quizRouter.route("/").post(createQuiz);
logoutRouter.route("/").get(handleLogout);


module.exports={
    routers,
    signupRouter,
    quizRouter,
    loginRouter,
    userRouter,
    logoutRouter,
    routerhome
};

