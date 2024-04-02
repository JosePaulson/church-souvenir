import multer from "multer";
// import path from 'path';
import sharp from "sharp";
// import SharpMulter from "sharp-multer";
import {
  cloudinaryConfig,
  uploader
} from "../config/cloudinaryConfig.js";


// const storage =  
//  SharpMulter ({
//               destination:(req, file, callback) =>callback(null, "server/images"),
//               imageOptions:{
//                fileFormat: "webp",
//                quality: 80,
//                resize: { height: 500, fit: 'fill' },
//                  }
//            });
// const upload  =  multer({ storage });

// for thirdpary storage like mongodb-blob or cloudinary
const storage = multer.memoryStorage()

export default async function getImageUrl(req) {
  const convertedBuffer = await sharp(req.file.buffer)
    .resize({
      height: 500,
      fit: 'contain',
    })
    .webp({
      quality: 80
    })
    .toBuffer()
  const b64 = Buffer.from(convertedBuffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const data = await uploader.upload(dataURI)
  const url = data.url.split('://')[1]
  return `https://${url}`
}

export const uploadFile = multer({
  storage
}).single('file')