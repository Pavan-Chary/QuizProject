const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})
const quizSchema = new mongoose.Schema({
    
})
const questionSchema = new mongoose.Schema({
    quiz_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:""
    },
    description:{
        type:String,
        required:true,
        unique:true,
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

module.exports={questions};