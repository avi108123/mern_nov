const User = require("../models/userModel");
const {validationResult} = require("express-validator")
var bcrypt = require("bcryptjs")
var jwt = require("jsonwebtoken")
let getAllusers = async (req, res) => {
  let data = await User.find();
  res.status(200).json({
    success:true,
    data:data,
  });
};

let verifyToken = async(req,res)=>{
  try {
    let token = req.headers.token;

    if (!token) {
      return res.status(400).send("no token provided");
    }
  
  let {userId} =  await jwt.verify(token, process.env.JWT_SECRET);
  let existingUser = await User.findById(userId);
  
  res.send(existingUser);
    
} catch (error) {
    res.status(500).send(error)
}

}

let registerUser = async (req, res) => {

let result = validationResult(req);

let err = result.errors.map((obj)=>obj.msg);

if(err.length){
  return res.status(400).json({
    success:false,
    errmsg:err[0],
  })
}

  let data = req.body;

  let existingUser = await User.findOne({ email: data.email });

  if (existingUser) {
    return res.status(400).json({
      success:false,
      errmsg:"you are already registered please login"
    });
  }


  let hashpassword = bcrypt.hashSync(data.password,10);


  let newUser = await User.create({...data,password:hashpassword});
  res.send(newUser);
};



let loginUser = async (req, res) => {
  let data = req.body;

  let existingUser = await User.findOne({ email: data.email });

  if (!existingUser) {
    return res.status(400).json({
      success:false,
      errmsg:"no user found please register first"
    });
  }

   if(! bcrypt.compareSync(data.password,existingUser.password)){
    return res.status(400).json({
      success:false,
      errmsg:"wrong password"
    });
   }

   let token = await jwt.sign({userId:existingUser._id},process.env.JWT_SECRET,{expiresIn:"2d"});

  res.status(200).json({
    success:true,
    data:existingUser,
    token:token,
  })
};

let updateUser = async(req,res)=>{

    let id = req.query.id;
    let data = req.body;


    let updatedUser = await User.findByIdAndUpdate(id,data,{new:true});
    res.send(updatedUser);
}

let deleteUser = async(req,res)=>{
   let id = req.headers.id;

   let deletedUser = await User.findByIdAndDelete(id);
   if(!deletedUser){
    return res.send("no user found for delete")
   }
   res.send("user deleted")
}




module.exports = {getAllusers,registerUser,loginUser,updateUser,deleteUser,verifyToken}
