const cloudinary = require("../config/cloudinary");
const Products = require("../models/productModel");
const fs = require("fs")
const jwt = require("jsonwebtoken");
async function getAllproduct(req, res) {
  let data = await Products.find();
  res.send(data);
}

async function getProduct(req,res){
  let id = req.query.id;
  let data = await Products.findOne({_id:id});
  res.status(200).send(data);
}

async function getMyproducts(req,res){
   let data = await Products.find({userId:req.userid})
   res.send(data);
}






async function createProduct(req, res) {
 try {

  console.log(req.file);


 let result = await cloudinary.uploader.upload(req.file.path)
  console.log(result);

  

   fs.unlinkSync(req.file.path)
   let userId = req.userid;
   let obj = {
    title:req.body.title,
    description:req.body.description,
    image:{url:result.url,publicId:result.public_id},
    userId:userId,
   }



     
    
    let newProduct = await Products.create(obj);
    res.status(200).send(newProduct);
    
 } catch (error) {
    res.status(500).send(error);
 } 
}


async function updateProduct(req, res) {
try {
  let data = req.body;

  let id = req.query.id;
  let result ;
  let updatedProduct
  if(data.flag!="false"){
    
    result = await cloudinary.uploader.upload(req.file.path);
    fs.unlinkSync(req.file.path)
   
    cloudinary.uploader.destroy(data.publicId, (error, result) => {
      if (error) {
        console.error('Error deleting file:', error);
      } else {
        console.log('File deleted successfully:', result);
      }
    });

    

    updatedProduct = await Products.findByIdAndUpdate(id,{...data,image:{url:result.url,publicId:result.public_id}}, {
      new: true,
    });
    res.send(updatedProduct);
  }
  else{
   
    updatedProduct = await Products.findByIdAndUpdate(id,data, {
      new: true,
    });
    res.send(updatedProduct);
  }


 
    
} catch (error) {
    res.status(500).send(error)
}
}

async function deleteProduct(req, res) {
   try {

  let id = req.query.id;
  console.log(req);
  let deletedProduct = await Products.findByIdAndDelete(id);

  if (!deletedProduct) {
    return res.send("no product found to delete");
  }

  res.send("product deleted");
    
   } catch (error) {
    res.send(error)
   }
}

module.exports = { getAllproduct, createProduct, updateProduct, deleteProduct,getMyproducts,getProduct };
