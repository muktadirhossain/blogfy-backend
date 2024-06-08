import multer from "multer";

export default function defaultErrorHandler(err, req, res, next) {
    console.log(err,"TEST")

    res.status(500).json({
        status: 500,
        message: err
    })



    // if (err instanceof multer.MulterError) {
    //     // A Multer error occurred when uploading.
    //     res.status(500).json({
    //         status: 500,
    //         message: "This is a Multer Error"
    //     });
    //   } else {
    //     // An unknown error occurred when uploading.
    //     res.json({
    //         status: 500,
    //         message: err.message
    //     });
    //   }

   
}