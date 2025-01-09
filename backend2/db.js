const { default: mongoose } = require("mongoose");

 async function connectDB(){
  await  mongoose
  .connect(process.env.DB_URI)
  .then(() => console.log("connected to db"))
  

}

module.exports = connectDB;