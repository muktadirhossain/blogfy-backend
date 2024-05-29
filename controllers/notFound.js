const notFound = (req, res) => {
 
    res.status(404).json({
        status: 404,
        message: "Not Found !"
    });
}

export default notFound;