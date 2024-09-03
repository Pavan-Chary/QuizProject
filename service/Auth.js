const jwt = require("jsonwebtoken");

//secret key

const secret = "pavan@45$#";

//to set new id with user object

function setUser(user){
    const payload={
        id:user._id,
        name:user.name,
        email:user.email
    }
    return jwt.sign(payload,secret)
}
function getUser(token){
    if(!token)return null;
    return jwt.verify(token,secret);
    //return true;
}

module.exports={
    setUser,
    getUser
};