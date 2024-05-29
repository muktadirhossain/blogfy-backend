import {Router} from 'express';
const apiRouter = Router();


apiRouter.get('/', (req, res) => {

    res.json({
        success: true,
        message: "API Route is working properly!",
        logo: '/logo.png'
    })
});

export default apiRouter