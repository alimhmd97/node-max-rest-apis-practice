var jwt = require('jsonwebtoken');
module.exports =(req,res,next)=>{
    const authHeader=req.get('Authrization');
    if(!authHeader){
        const error=new Error('not authenticated')
        error.statusCode=401;
        throw error
    }

    const token=req.get('Authrization').split(' ')[1];
    let decodedToken;
    try{
        jwt.verify(token,'secretword')
    }catch(err){
err.statusCode=500;
throw err;
    }
    if(!decodedToken){
      const error=new Error('not authenticated') 
    error.statusCode=401;
    throw error
    }
    req.userId=decodedToken.userId
}