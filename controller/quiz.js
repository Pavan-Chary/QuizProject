const {questions,users,quiz} = require("../models/quiz");
const {setUser,getUser} = require("../service/Auth");

async function getQuestions(req,res){
    const quiz_id = req.params.id;
    console.log(quiz_id);
    const qest = await questions.find({quiz_id});
    return res.json(qest);
} 

async function returnToHome(req,res){
    return res.redirect("/");
}

async function postQuestion(req,res){
    const ques = req.body;
    await questions.create({
        quiz_id:req.cookies.quId,
        description:ques.description,
        options:[{id:1,value:ques.option1},{id:2,value:ques.option2},{id:3,value:ques.option3},{id:4,value:ques.option4}],
        answer:ques.value
    }).then((res)=>console.log("Successfully created..")).catch((res)=>console.log("error Ocuured"));
    return res.json({msg:"success"});
}

async function createUser(req,res){
    let flag=0;
    const person = req.body;
    await users.create({
        name:person.name,
        email:person.email,
        password:person.password
    }).then(()=>{console.log("User created");flag=1}).catch(()=>{flag=2;console.log("error in creating user")});
    if(flag===1)return res.json({msg:"sucess"});
    else if(flag===2)return res.json({msg:"user exists"});
}
async function createQuiz(req,res){
    const person = req.body;
try{
    let flag=0;
    console.log(req);
    await quiz.create({
        createdby:res.user.id,
        quiz_name:person.quizName
    }).then(()=>{flag=1;console.log("quiz created")}).catch(()=>{flag=2;console.log("error in creating quiz")});
    if(flag==1){
    const quiz_name = person.quizName;
    const quId = await quiz.findOne({quiz_name});
    res.cookie("quId",quId.id);
    return res.json({msg:"Success",quId:quId.id});
    }else if(flag==2){
        return res.json({msg:"name already exists",quId:""})
    }
}catch{
    
    return res.json({msg:"Please login"});
}
}

async function handleLogin(req,res){
    let email = req.body.email;
    let password = req.body.password
    let user =  await users.findOne({email,password});
    if(user){
        res.cookie("uid",setUser(user));
        return res.json({msg:"Login Successfull"});
    }
    return res.json({msg:"Not a valid"})
}

async function showUser(req,res){
    try
    {
        const createdby = res.user.id;
        const ques = await quiz.find({createdby});
        const name = res.user.name;
        return res.json({msg:"sucess",name:name,questions:ques});
    }
    catch
    {
        return res.json({msg:"please login"});
    }
}

async function handleLogout(req,res){
    res.clearCookie("uid");
    console.log("Logged out");
    return res.json({msg:"user log out"});
}



module.exports={
    getQuestions,
    postQuestion,
    createUser,
    createQuiz,
    handleLogin,
    showUser,
    handleLogout,
    returnToHome
};