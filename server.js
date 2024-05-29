import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import cookieParser from "cookie-parser";
import connectDb from './lib/connectDb.js';
import apiRouter from './routes/api.js';
import {MAX_JSON_SIZE,REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME, URL_ENCODED, WEB_CACHE,PORT} from "./configs/config.js";
import notFound from './controllers/notFound.js';


const app = express();

// middlewares
app.use(cors());
app.use(helmet());
app.use(hpp());
app.use(cookieParser())
app.use(express.json({ limit: MAX_JSON_SIZE }));
app.use(express.urlencoded({extended: URL_ENCODED}));
const limiter = rateLimit({ windowMs: REQUEST_LIMIT_TIME, max: REQUEST_LIMIT_NUMBER });
app.use(limiter);




// *Web cache validation and conditional requests in Http
app.set('etag', WEB_CACHE);



// Connect to DB:
connectDb()


// API routes
app.use("/api", apiRouter);


//* Serve static assets for React front end
app.use(express.static('public'));

// * Not Found handlers
app.get('*', notFound);


// ! Default Error Handler::
// app.use(defaultErrorHandler);



app.listen(PORT,()=>{
    console.log(`Server Running on http://localhost:${PORT}`)
});