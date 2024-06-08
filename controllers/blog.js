import Blog from "../model/blog.model.js";
import fs from 'fs';
import path from 'path';

export const postBlog = async (req, res) => {
    const { title, content, categoryId, tags } = req.body;
    
    const { _id } = req.user
    try {
        const imgArray = req.files.map((file) => `/upload/${file.filename}`)

        const response = await Blog.create({
            title,
            content,
            categoryId,
            tags,
            authorId: _id,
            images: imgArray
        })
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
    const { id } = req.params
    // console.log(id)
    try {
        const response = await Blog.findOne({ _id: id }).select('-createdAt -updatedAt -__v')
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
    const { id } = req.params
    console.log(id)
    console.log(path.resolve())
    
    try {

        // Delete the Images from the server:
        const blog = await Blog.findOne({ _id: id })
        console.log(blog)
        if(!blog){
            throw new Error("Blog not Found!")
        }

        blog.images.forEach(async (image) => {
            const imgPath = path.join(path.resolve(), `/public/${image}`)
            await fs.unlinkSync(imgPath)
        })

        const response = await Blog.findByIdAndDelete({ _id: id })
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