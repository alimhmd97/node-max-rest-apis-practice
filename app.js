const express = require('express');
const app = express();

const feedRoutes=require('./routes/feed');
var bodyParser = require('body-parser')

app.use(bodyParser.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin",'*');
    res.setHeader("Access-Control-Allow-Methods",'GET, POST, PUT, DELETE,PATCH');
    res.setHeader("Access-Control-Allow-Headers",'Content-Type',"Authorization");
    next();
})

app.use('/feed',feedRoutes)

app.listen(8080);