const {questions} = require("../models/quiz");

async function getQuestions(req,res){
    const qest = await questions.find({});
    console.log("request made");
    return res.json(qest);
} 

async function postQuestion(req,res){
    const ques = req.body;
    await questions.create({
        description:ques.description,
        options:[{id:1,value:ques.option1},{id:2,value:ques.option2},{id:3,value:ques.option3},{id:4,value:ques.option4}],
        answer:ques.value
    }).then((res)=>console.log("Successfully created..")).catch((res)=>console.log("error Ocuured"));
    return res.json({msg:"success"});
}

module.exports={
    getQuestions,
    postQuestion
};