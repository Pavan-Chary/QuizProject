const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const quizSchema = new mongoose.Schema({
    quiz_name :{
        type:String,
        required:true,
    },
    createdby:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    }
})
const questionSchema = new mongoose.Schema({
    quiz_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"quizs"
    },
    description:{
        type:String,
        required:true,
    },
    options:{
        type:[{
            id:Number,
            value:String
        }],
        required:true
    },
    answer:{
        type:Number,
        required:true,
    }
});

const questions = mongoose.model("quizQuestion",questionSchema);
const users = mongoose.model("users",userSchema);
const quiz = mongoose.model("quiz",quizSchema);

module.exports={questions,users,quiz};