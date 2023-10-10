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
  const filetypes = /jpg|jpeg|png|svg|webp/;
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
    const filetypes = /jpg|jpeg|png|svg|webp/;
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
  // console.log(req.body);
  const productId = req.body.productId;

  // console.log(productId);

  try {
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
      details: req.body.details,
      image: req.body.image,
      brand: req.body.brand,
      category: req.body.category,
      images: req.files.map((file) => ({
        original: `/${file.path}`,
        thumbnail: `/${file.path}`,
      })),
    };

    let savedProduct;

    if (productId) {
      // If productId is provided, update the existing product
      const existingProduct = await Product.findById(productId);

      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      // Merge existing product data with the new product data
      const updatedProductData = {
        ...existingProduct.toObject(),
        ...productData,
      };

      // Update the existing product with the merged data
      savedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedProductData,
        { new: true }
      );

      if (!savedProduct) {
        return res
          .status(404)
          .json({ message: 'Product not found or could not be updated' });
      }
    } else {
      // Handle the case where productId is not provided
      return res
        .status(400)
        .json({ message: 'productId is required for updating a product' });
    }

    res.send({
      message: 'Product Updated',
      product: savedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating product' });
  }
});

export default router;
