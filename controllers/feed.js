const fs=require('fs')
const path=require('path')
const expressValidator = require("express-validator");
const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
    const currentPage = req.params.page||1;
    const perPage=2;
    let TotalItems;
    Post.find().countDocuments().then((count)=>{
        TotalItems=count;
      return  Post.find().skip((currentPage-1)*perPage).limit(perPage)
    }).then((posts=>{
        res.status(200).json({message:'posts fetched succcessfully',posts:posts,TotalItems:TotalItems})
   })).catch((e)=>{
       e.statusCode=500;
       next(e)
   })
    
    // res.status(200).json({
    //     posts: [{ title: "First Post", content: "This is tyhe first post!" }]
    // })
    
}
// ------------------------------------------------------------------------------------------------
exports.createPost = (req, res, next) => {
    const errors = expressValidator.validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        errors.data=errors.array()
        throw errors
    }
    if (!req.file) {
        const error = new Error('No image provided');
        error.statusCode = 422;
        throw errors
    }
    const title = req?.body?.title;
    const content = req?.body?.content;
    const imageUrl = req?.file?.path;
    const post = new Post({
        title, content, imageUrl, creator: { name: 'ali' }
    })
    post.save().then((result) => {
        res.status(201).json({
            message: 'post created successfully',
            post: result
        });
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    })

};
// ------------------------------------------------------------------------------------------------
 exports.getPost = (req, res, next) => {
  
    const postId = req.params.postId;
    Post.findById(postId).then(post => {
        if (!post) {
            const error = new Error('No post found');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({message:'post fetched',post:post})
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}
// ------------------------------------------------------------------------------------------------
exports.updatePost= (req, res, next) => {
    const errors = expressValidator.validationResult(req)
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed, entered data is incorrect');
        error.statusCode = 422;
        throw errors
    }
   
    const postId=req.params.postId;
    const title=req.body.title;
    const content=req.body.content;
    let imageUrl=req.body.imageUrl;
    if(req.file){
        imageUrl=req.file.path;
    }
    if(!imageUrl){
        const error=new Error(`No file Picked.`)
        error.status=422;
        throw error
    }
    
    Post.findById(postId).then(post=>{
        if (!post) {
            const error = new Error('No post found');
            error.statusCode = 404;
            throw error;
        }
        if(imageUrl!==post.imageUrl) {
            clearImage(imageUrl)
        }
        post.title=title;
        post.imageUrl=imageUrl;
        post.content=content;
        post.save().then(post=>{
            resule.status(200).json({message: 'post updated successfully',post :post})
        })
    }).catch(err => {
        if (!err.statusCode) {
            err.statusCode = 500;
        }
        next(err)
    })
}
// ------------------------------------------------------------------------------------------------
const clearImage=(filePath)=>{
    filePath=path.join(__dirname,'...',filePath);
    fs.unlink(filePath,err=>console.log(err))
}
// ------------------------------------------------------------------------------------------------
exports.deletePost= (req, res, next) => {
const postId=req.params.postId;
Post.findById(postId).then((post)=>{
    if (!post) {
        const error = new Error('No post found');
        error.statusCode = 404;
        throw error;
    }

        clearImage(post.imageUrl);
        return Post.findByIdAndDelete(postId)
    
}).then((post)=>{
res.status(200).json({
    message:'Post Deleted successfully'
})
}).catch(err => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    next(err)
})
}