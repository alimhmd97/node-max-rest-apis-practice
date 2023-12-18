const express = require('express');
const  expressValidator=require('express-validator');
const feedController=require('../controllers/feed');
const router=express.Router();

router.get('/posts',feedController.getPosts)
router.post('/post',[expressValidator.body('title').trim().isLength({min:5}),expressValidator.body('content').trim().isLength({min:5})],feedController.createPost)

router.get('/post/:postId',[expressValidator.body('title').trim().isLength({min:5}),expressValidator.body('content').trim().isLength({min:5})],feedController.getPost)

router.put('/post/:postId',feedController.updatePost);

router.delete('/post/:postId',feedController.deletePost)


module.exports = router;