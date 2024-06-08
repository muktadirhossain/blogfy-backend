import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    authorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
    tags: {
        type: String
    },
    images: {
        type: Array,
        default: ["/post-cover.png"]
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment',
        // 
    }],
}, {
    timestamps: true
});

const Blog = mongoose.model('blog', blogSchema);

export default Blog;