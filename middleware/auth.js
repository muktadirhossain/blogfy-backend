import { JWT_SECRET } from "../conf/config.js";
import jwt from 'jsonwebtoken'

const auth = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.replace("Bearer ", "") || "";
        if(!token) {
            throw new Error("No Authorization Token!")
        } 
        // console.log(token)
        const decoded = await jwt.verify(token, JWT_SECRET);
        if(!decoded){
            throw new Error("Invalid Token!")
        }
        // console.log(decoded)
        if (decoded && decoded._id) {
            req.user = decoded;
            next()
        }
    } catch (error) {
        console.log(error)
        return res.status(401).json({
            status: false,
            message: error.message
        })
    }


}

export default auth;