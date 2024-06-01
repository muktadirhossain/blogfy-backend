import { Router } from 'express'
import { createUser, deleteUser, login } from '../controllers/user.js';
import { userValidator } from '../validation/userValidationSchema.js';



const apiRouter = Router();

// path - /api/users/create
apiRouter.post('/users/create',userValidator , createUser)
// Login - /api/users/login
apiRouter.post('/users/login', login);
apiRouter.delete('/users/delete', deleteUser)




export default apiRouter; 