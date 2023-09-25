import path from 'path';
import express from 'express';
import multer from 'multer';

const router = express.Router();

import Product from '../models/productModel.js';
import User from '../models/userModel.js';

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

// router.post('/', upload.single('image'), (req, res) => {
//   res.send({
//     message: 'Image Uploaded',
//     image: `/${req.file.path}`,
//   });
// });

router.post('/', upload.array('images', 10), async (req, res) => {
  // const userName = req.body.name;
  // console.log('User Name:', userName);

  try {
    // Check if all required fields are present in the request body
    const requiredFields = [
      'name',
      'image',
      'brand',
      'category',
      'description',
    ];
    const missingFields = requiredFields.filter(field => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(', ')}`,
      });
    }

    // Move the userEmail variable definition outside of the try-catch block
    const userEmail = 'admin@mail.com'; // Replace with the actual email
    const user = await User.findOne({ email: userEmail }).exec();

    if (!user) {
      // Handle the case where the user is not found
    }

    const userId = user._id; // userId is now accessible in the entire function scope

    // Construct the product data
    const productData = {
      user: userId,
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      images: req.files.map(file => ({
        original: `/${file.path}`,
        thumbnail: `/${file.path}`,
      })),
    };

    const product = new Product(productData);

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
