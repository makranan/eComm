import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

import Product from '../models/productModel.js';

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|svg/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('Images only!');
  }
}

const upload = multer({
  storage,
  fileFilter(req, file, cb) {
    const filetypes = /jpg|jpeg|png|svg/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb('Images only!');
    }
  },
});

router.post('/', upload.single('image'), (req, res) => {
  res.send({
    message: 'Image Uploaded',
    image: `/${req.file.path}`,
  });
});

// Error handling middleware for multer
router.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    // Handle multer-related errors here
    console.error(err);
    res.status(400).json({ message: 'Multer error' });
  } else {
    next(err);
  }
});

router.post('/images', upload.array('images', 10), async (req, res) => {
  try {
    const imagePaths = req.files.map(file => ({
      original: `/${file.path}`,
      thumbnail: `/${file.path}`,
    }));

    const product = new Product({
      images: imagePaths,
    });

    const savedProduct = await product.save();

    res.json({
      message: 'Images Uploaded and Saved to Database',
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading images' });
  }
});

export default router;
