const {getUser,setUser} = require("../service/Auth");
async function checkUsers(req,res,next){
    if(req.cookies){
        if(req.cookies.uid){
            let user = getUser(req.cookies.uid);
            if(user){
                res.user=getUser(req.cookies.uid);
                console.log(res.user);
            }   
        }
    }
    next();
}

module.exports={
    checkUsers
}