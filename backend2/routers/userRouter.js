const express = require("express");
const User = require("../models/userModel");
const {
  getAllusers,
  registerUser,
  loginUser,
  updateUser,
  deleteUser,
  verifyToken,
  sendOtp,
} = require("../controllers/userControllers");

const validationMiddleware = require("../middlewares/validate");
const Router = express.Router();

// localhost:8000/user

Router.get("/", getAllusers);
Router.get("/verify",verifyToken)

Router.get('/sendOtp',sendOtp)

Router.post("/register",validationMiddleware, registerUser);

Router.post("/login", loginUser);

Router.put("/update", updateUser);

Router.delete("/delete", deleteUser);

module.exports = Router;














//1. show dbs  => to show all databases
//2. use <db_name> => to switch to an existing db or to create a new db
//3. db.dropDatabase() => to delete db
//4. db.createCollection(<colleciton_name>) => to create a collection
//5. show collections => to show all collecitons
//6. db.<collection_name>.drop()  => to delete given collection
//7.
