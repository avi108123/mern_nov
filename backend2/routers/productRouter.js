const express = require("express");
const { getAllproduct, createProduct, updateProduct, deleteProduct, getMyproducts, getProduct } = require("../controllers/productControllers");
const checkLogin = require("../middlewares/loginMiddleware");
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public')
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniquePrefix+file.originalname)
    }
  })


const upload = multer({ storage:storage })


const Router = express.Router();

Router.get('/',getAllproduct)
Router.get('/getblog',checkLogin,getProduct)

Router.get("/myblogs",checkLogin,getMyproducts)

Router.post("/create",upload.single("image"),checkLogin,createProduct)

Router.put('/update',upload.single("image"),checkLogin,updateProduct)

Router.delete('/delete',checkLogin,deleteProduct)

module.exports = Router;