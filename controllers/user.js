import User from "./../model/user.model.js";


export const createUser = async (req, res) => {

    const { name, email, password } = req.body;

    try {

        const user = await User.create(req.body);


        res.status(201).json({
            status: true,
            data: user,
            message: "User Created Successfully!",

        })
    } catch (error) {
        res.json({
            status: false,
            message: "Error Creating User!",
            error: error.message
        })
    }
}