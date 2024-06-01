import { body } from 'express-validator';

export const userValidator = [[
    body('email')
        .isEmail()
        .withMessage("Email is Required!"),
    body('fullName')
        .isString()
        .isLength({ min: 2, max: 15 })
        .withMessage("Name must be between 2 to 15 character!"),

    body('password')
        // .isStrongPassword().withMessage("Please choose a strong password")
        .isLength({ min: 6, max: 15 })
        .withMessage("Password must be between 6 to 15 character!")


]] 