const Post = require("../models/postModel")

exports.getAllPosts = async (req, res, next) => {
    
    try {
        // get post
        const posts = await Post.find();
        console.log(`Getting all posts: ${posts}`)

        res.status(200).json({
            status: "success",
            results: posts.length,
            data: {
                posts,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        });
        
    }
};


exports.getOnePost = async (req, res, next) => {
    
    try {
        // get post // localhost:3000/posts/:id
        const post = await Post.findById(req.params.id);

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        });
        
    }
};

exports.createPost = async (req, res, next) => {
    
    try {
        // get post // localhost:3000/posts/:id
        const post = await Post.create(req.body);
        console.log(req.body)
        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            status: "fail",
        });
        
    }
};

exports.updatePost = async (req, res, next) => {
    
    try {
        // get post // localhost:3000/posts/:id
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators:true,
        });

        res.status(200).json({
            status: "success",
            data: {
                post,
            },
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        });
        
    }
};

exports.deletePost = async (req, res, next) => {
    
    try {
        // get post // localhost:3000/posts/:id
        const post = await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({
            status: "success",
         })
    } catch (error) {
        res.status(400).json({
            status: "fail",
        });
        
    }
};