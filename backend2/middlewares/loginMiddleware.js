const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

async function checkLogin(req,res,next){

    try {
        let header = req.headers.authorization;
    
        if (!header) {
          return res.status(400).send("no header provided");
        }
      
        let token = header.split(" ")[1];
      
        if (!token) {
          return res.status(400).send("no token provided");
        }
      
      let {userId} =  await jwt.verify(token, process.env.JWT_SECRET);
      let existingUser = await User.findById(userId);
      if(!existingUser){
        return res.status(401).send("you are not allowed to use this api")
      }
       
      req.userid = userId;

        next();
        
    } catch (error) {
        res.status(500).send(error)
    }
    
}

module.exports= checkLogin;