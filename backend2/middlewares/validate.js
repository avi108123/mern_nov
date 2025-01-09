
const { body } = require("express-validator");


let validationMiddleware = [
    body("name")
.notEmpty()
.withMessage("user name must not be empty")
.isLength({ min: 3, max: 12 })
.withMessage("name must be 3 to 12 char long")
,
body("email")
.notEmpty()
.withMessage("email must not be empty")
.isEmail()
.withMessage("email shoud be a valid email")
,
body("password")
.notEmpty()
.withMessage("password must not be empty")
.isStrongPassword()
.withMessage("password should be a strong password")
]

module.exports = validationMiddleware;



        
