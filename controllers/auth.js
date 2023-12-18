const User=require('../models/user');
const expressValidator = require("express-validator");

exports.signUp=(req,res,next)=>{
    const errors = expressValidator.validationResult(req)

    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw errors
    }
    const email=req.body.email;
    const password=req.body.password;
    const name=req.body.name;
}


