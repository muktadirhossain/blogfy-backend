import Comment from "../model/comment.model.js";


export const getCommentByPostId = async (req, res) => {
    try {
        const response = await Comment.find({ postId: req.params.postId})
        res.status(200).json({
            status: false,
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}

export const postComment = async (req, res) => {
    try {
        const { postId, content } = req.body;
        const { _id } = req.user;
        const response = await Comment.create({
            postId,
            content,
            authorId: _id
        })
        res.status(201).json({
            status: true,
            message: "Commented successfully!",
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}