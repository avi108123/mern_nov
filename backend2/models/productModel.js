const mongoose = require("mongoose");

let productSchema = new mongoose.Schema({
    image:{
      url:{
        type:String,
        required:true,
      },
      publicId:{
        type:String,
        required:true,
      }
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        default:"nice product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
    }
 
},{
    timestamps:true,
})


let Products = mongoose.model("blogs",productSchema)

module.exports = Products;