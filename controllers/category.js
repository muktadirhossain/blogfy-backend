import Category from "../model/category.model.js";

export const createCategory = async (req, res) => {
    const { categoryName } = req.body;
    try {

        const response = await Category.create({ categoryName })

        res.status(201).json({
            status: true,
            message: "Category Created",
            data: response
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const getAllCategories = async (req, res) => {
    try {
        const response = await Category.find({})
        res.status(200).json({
            status: true,
            data: response
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const getCategoryById = async (req, res) => {
    const id = req?.params?.id
    try {
        const response = await Category.findOne({ _id: id })
        res.status(200).json({
            status: true,
            id,
            data: response
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const deleteCategoryById = async (req, res) => {
    const id = req?.params?.id
    try {
        const response = await Category.findByIdAndDelete({ _id: id })
        res.status(200).json({
            status: true,
            // id,
            data: response
        })
    } catch (error) {
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}
export const updateCategoryById = async (req, res) => {
    const id = req?.params?.id
    const { categoryName } = req.body;

    try {
        if (!categoryName) {
            throw new Error("Please provide a category name!")
        }
        // TODO: check if category exists: if no category exists throw an error that no category found status will be 404
        const response = await Category.findByIdAndUpdate(id, { categoryName: categoryName })
        // console.log(response)

        res.status(200).json({
            status: true,
            // id,
            data: response
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            status: false,
            message: error.message
        })
    }
}