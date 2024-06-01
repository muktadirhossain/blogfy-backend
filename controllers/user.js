import User from "./../model/user.model.js";
import { validationResult } from 'express-validator';
import bcrypt from 'bcrypt'
import { JWT_SECRET, SALT_HASH } from "../conf/config.js";
import jwt from 'jsonwebtoken'


export const createUser = async (req, res) => {

    const { fullName, email, password, bio } = req.body;

    try {

        const { errors } = validationResult(req)

        if (errors.length > 0) {
            return res.status(400).json({
                status: 400,
                message: "Validation Error",
                errors: errors
            })
        }

        // * Hash the password::
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            bio
        });


        res.status(201).json({
            status: true,
            data: user,
            message: "User Created Successfully!",

        })

    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Error Creating User!",
            error: error.message
        })
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // TODO: Check if any user exists::
        const user = await User.findOne({ email: email })
        // if no user exists, send this message::
        if (!user && !user?._id) {
            return res.status(401).json({
                status: false,
                message: "Not user exist!, please sign up."
            })
        }
        // TODO: Check if the password is correct::

        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) throw new Error("Unauthorized!")

        // TODO: Generate a token::
        const token = await jwt.sign({ _id: user?._id, fullName: user?.fullName, email: user?.email }, JWT_SECRET,);


        // TODO: Send the token back to the client::
        res.status(200).json({
            status: true,
            message: "Logged in Successfully!",
            data: { _id: user?._id, fullName: user?.fullName, email: user?.email },
            token

        })
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: "Unauthorized !",

        })
    }
}

export const deleteUser = async (req, res) => {
    const token = req.headers.authorization.replace("Bearer ","")
    console.log(token)
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded)

        const user = await User.findByIdAndDelete(decoded._id)

        res.status(200).json({
            status: true,
 
            message: "User Deleted Successfully!",

        })
    } catch (error) {
        console.log(error);
        res.json({
            status: false,
            message: "Error Deleting User!",
            error: error.message
        })
    }
}