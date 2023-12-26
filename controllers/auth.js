const User=require('../models/user');
const expressValidator = require("express-validator");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


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
bcrypt.hash(password,12).then(hashedpasswors=>{
    const user=new User({
        email:email,
        password:hashedpasswors,
        name:name
    })
    user.save().then(result=>{
return res.status(201).json({message:'user created',result:res.id})
    })
})
.catch(error =>{ 
    if (!error.statusCode) {
        error.statusCode = 500
}
next(error)})}
// ----------------------------------------------------------------
exports.login=(req,res,next)=>{
    
const email=req.body.email;
const passsword=req.body.password;
User.findOne({email:email}).then(user=>{
    let loadedUser;
    if(!user){

       const error = new Error('User with this mail not found');
       user.statusCode(404);
       throw error;

    }
    loadedUser=user;

    return bcrypt.compare(passsword,user.password).then(isEqual=>{

         if(!isEqual){
            const error=new Error('Wrong Password');
            error.statusCode=(401);
            throw error;
         }

         const token=jwt.sign({
            email:email,
            userId:loadedUser._id
         },'secretword',{expiresIn:'1h'})
 res.status(200).json({token:token,id:loadedUser._id.toString()})
    }).catch(error =>{ 
        if (!error.statusCode) {
            error.statusCode = 500;

            next(error)
    }

})
}
)}
