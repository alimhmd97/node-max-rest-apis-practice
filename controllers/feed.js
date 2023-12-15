exports.getPosts=(req,res,next)=>{
    res.status(200).json({
        posts:{title:"First Post",content:"This is tyhe first post!"}
    })
}

exports.createPost=(req,res,next)=>{
    const title=req?.body?.title;
    const content=req?.body?.content;
    console.log(title,content);
    res.status(201).json({
        message:'post created successfully',
        post:{id:new Date().toString(),title:'title',content:'content'}
    });
};