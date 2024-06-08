import { Router } from 'express'
import { createUser, deleteUser, login } from '../controllers/user.js';
import { userValidator } from '../validation/userValidationSchema.js';
import { getAllCategories, createCategory, getCategoryById, deleteCategoryById, updateCategoryById } from '../controllers/category.js';
import auth from '../middleware/auth.js';
import { deleteBlogById, getAllBlogs, getBlogById, postBlog } from '../controllers/blog.js';
import upload from '../middleware/multer/upload.js';



const apiRouter = Router();

// path - /api/users/create
apiRouter.post('/users/create', userValidator, createUser)
apiRouter.post('/users/login', login);
apiRouter.delete('/users/delete', deleteUser)

// Category::
apiRouter.post('/category', auth, createCategory)
apiRouter.get('/category/all', getAllCategories)
apiRouter.get('/category/all/:id', getCategoryById)
apiRouter.delete('/category/delete/:id', auth, deleteCategoryById)
apiRouter.post('/category/update/:id', auth, updateCategoryById)

// Blog or Post::
apiRouter.post('/blog', upload.array('img', 5) ,auth, postBlog)
apiRouter.get('/blog', getAllBlogs)
apiRouter.get('/blog/:id', getBlogById)
apiRouter.delete('/blog/:id', deleteBlogById)





export default apiRouter; 