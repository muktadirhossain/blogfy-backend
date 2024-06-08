import multer from 'multer'
import path from 'path'

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {

    if (file.mimetype !== 'image/png' ||
      file.mimetype !== 'image/jpeg' ||
      file.mimetype !== 'image/jpg'

    ) {
      cb(null, 'public/upload')
    } else {
      cb("Only png,jpg or jpeg is allowed", 'public/upload')
    }

  },
  filename: (req, file, cb) => {
    // console.log(file)
    cb(null, `${file.originalname.replaceAll(/[^a-z0-9_-]/gi, '_')}_${Date.now()}${path.extname(file.originalname)}`)
  }
})


const upload = multer({ storage: diskStorage })


export default upload
