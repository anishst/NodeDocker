const express = require("express")

const postController = require("../controllers/postController")
const protect = require("../middleware/authMiddleware");


const router = express.Router()

// localhost:3000/
router
    .route("/")
    .get(postController.getAllPosts)
    // protect, requires login post methods
    .post(protect,postController.createPost)

router
    .route("/:id")
    .get(postController.getOnePost)
    // protect, requires login patch/delete methods
    .patch(protect, postController.updatePost)
    .delete(protect,postController.deletePost)

module.exports = router;