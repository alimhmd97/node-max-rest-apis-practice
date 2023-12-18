const path=require('path')
const express = require('express');
const mongoose = require('mongoose');
const multer= require('multer');

const feedRoutes=require('./routes/feed');
const authRoutes=require('./routes/auth');

const app = express();

const fileStorage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'images');
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toString()+'-'+file.originalname); 
    }
})

const filterFile=(req,file,cb)=>{
    if(
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg'
        
    ){
        cb(null,true)
    }else{
        cb(null,false)
    }
}

var bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(multer({storage:fileStorage,filterFile:filterFile}).single('imageUrl'))
app.use('/images',express.static(path.join(__dirname,'images')))
app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'GET, POST, PUT, DELETE,PATCH');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type',"Authorization");
    next();
})

app.use('/feed',feedRoutes);
app.use('/auth',authRoutes);
app.use((error,req,res,next) => {
    console.log(error);
    const status=error.status;
    const message=error.message;
    res.status(status)
});


mongoose.connect('mongodb+srv://Ali:123456Aa@practice-node-max.bytdhvy.mongodb.net/feeds')
.then(()=>app.listen(8080))
.catch((e)=>{
console.log('connect mongoose error: ' + e.message);
})