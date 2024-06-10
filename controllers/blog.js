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
    const { id } = req.params
    try {
        // Delete the Images from the server:
        const blog = await Blog.findOne({ _id: id })
        if (!blog) {
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

export const updateBlogById = async (req, res) => {
    const { id } = req.params
    const { _id } = req.user
    const { title, content, categoryId, tags } = req.body;
    try {
        // Delete the Images from the server:
        const blog = await Blog.findOne({ _id: id })
        if (!blog) {
            throw new Error("Blog not Found!")
        }

        // todo: Compare the _id with mongoose objectId
        const canEdit = _id === blog.authorId.toString();
        if (!canEdit) {
            throw new Error("You can't Edit this Blog")
        }
        const imgArray = req.files.map((file) => `/upload/${file.filename}`)
        if (imgArray.length > 0) {
            blog.images.forEach(async (image) => {
                const imgPath = path.join(path.resolve(), `/public/${image}`)
                await fs.unlinkSync(imgPath)
            })
        }

        const response = await Blog.findByIdAndUpdate(
            blog?._id,
            {
                $set: {
                    title,
                    content,
                    categoryId,
                    tags,
                    images: imgArray.length > 0 ? imgArray : blog?.images
                }
            }, {
            new: true
        }
        )

        res.status(200).json({
            status: true,
            response
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}