import express from "express";
import { PORT, REQUEST_LIMIT_NUMBER, REQUEST_LIMIT_TIME } from "./conf/config.js";
import connectDB from "./lib/connectDb.js";
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import apiRouter from "./routes/api.js";
import defaultErrorHandler from "./middleware/defaultErrorHandler.js";

const app = express();

// Middleware

app.use(hpp())
app.use(helmet({
    crossOriginResourcePolicy: false,
  }))
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cookieParser())
const limiter = rateLimit({
    windowMs: REQUEST_LIMIT_TIME,
    limit: REQUEST_LIMIT_NUMBER,
})

app.use(limiter)



// connect DB:
connectDB()



app.use("/api",apiRouter)

app.get('*', (req, res)=>{
    res.status(404).json({
        success: false,
        message: "Page Not Found❗"
    })
})


// Default Error Handel
app.use(defaultErrorHandler)



app.listen(PORT, () => {
    console.log(`Server Running on http://localhost:${PORT}`)
})