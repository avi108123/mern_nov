const express = require("express");
const userRouter = require("./routers/userRouter");
const productRouter = require("./routers/productRouter");
const mongoose = require("mongoose");
const connectDB = require("./db");

require("dotenv").config();

const cors = require("cors")

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is running");
});

app.use("/user", userRouter);
app.use("/blog", productRouter);

connectDB().then(()=>{
    app.listen(process.env.PORT, () =>
        console.log("server is listening on port " + process.env.PORT)
      );
})
.catch((err)=>console.log("err connecting"))


