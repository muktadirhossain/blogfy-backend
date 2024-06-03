import Blog from "../model/blog.model.js";

export const postBlog = async (req, res) => {
    const { title, content, categoryId, tags } = req.body;
    const { _id } = req.user
    try {
        const response = await Blog.create({ title, content, categoryId, tags, authorId: _id })
        res.status(201).json({
            status: true,
            message: "Blog posted successfully!",
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
export const getAllBlogs = async (req, res) => {

    try {
        const response = await Blog.find({}).select('-createdAt -updatedAt -__v')
        res.status(200).json({
            status: true,
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
export const getBlogById = async (req, res) => {
    // console.log(req.params)
    const {id} = req.params
    // console.log(id)
    try {
        const response = await Blog.findOne({_id: id}).select('-createdAt -updatedAt -__v')
        res.status(200).json({
            status: true,
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
export const deleteBlogById = async (req, res) => {
    // console.log(req.params)
    const {id} = req.params
    // console.log(id)
    try {
        const response = await Blog.findByIdAndDelete({_id: id})
        res.status(200).json({
            status: true,
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