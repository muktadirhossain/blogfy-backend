import express from 'express';
const apiRouter = express.Router();


apiRouter.get('/', (req, res) => {

    res.json({
        success: true,
        message: "API Route is working properly!"
    })
});

export default apiRouter