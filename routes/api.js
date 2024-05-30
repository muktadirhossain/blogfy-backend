import { Router } from 'express'
import { createUser } from '../controllers/user.js';

const apiRouter = Router();

// path - /api/users/create
apiRouter.post('/users/create', createUser)



export default apiRouter; 