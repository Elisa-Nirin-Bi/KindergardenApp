// config/cloudinary.config.js
const multer = require('multer');
const cloudinary = require('cloudinary');
const multerStorageCloudinary = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

const storage = new multerStorageCloudinary.CloudinaryStorage({
  cloudinary: cloudinary.v2,
  params: {
    allowed_formats: ['jpg', 'png'],
    public_id: (req, file) => {
      const parts = file.originalname.split('.');
      const extension = parts[parts.length - 1];
      const randomName = `${String(Math.random()).replace(
        '.',
        ''
      )}.${extension}`;
      return randomName;
    }
  }
});

module.exports = multer({ storage });
