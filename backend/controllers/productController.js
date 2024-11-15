import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const pageSizeFromQuery = (query) => {
    const pageSize = Number(query.pageSize) || '32'; // Default to 32 if pageSize is not provided
    return pageSize;
  };

  const pageSize = pageSizeFromQuery(req.query);
  const page = Number(req.query.pageNumber);

  const keyword = req.query.keyword
    ? { name: { $regex: req.query.keyword, $options: 'i' } }
    : {};

  // Define filters
  const filters = {};

  if (req.query.keyword) {
    filters.name = { $regex: req.query.keyword, $options: 'i' };
  }

  // Adjust category filtering to split categories
  if (req.query.category) {
    const categories = req.query.category.split('&'); // Split categories
    filters.category = {
      $in: categories.map((category) => new RegExp(category, 'i')),
    };
  }

  if (req.query.brand) {
    filters.brand = { $regex: req.query.brand, $options: 'i' };
  }

  // Add price filtering if req.query.minPrice and req.query.maxPrice are provided
  if (req.query.minPrice && req.query.maxPrice) {
    filters.price = {
      $gte: parseFloat(req.query.minPrice),
      $lte: parseFloat(req.query.maxPrice),
    };
  } else if (req.query.minPrice) {
    filters.price = {
      $gte: parseFloat(req.query.minPrice),
    };
  } else if (req.query.maxPrice) {
    filters.price = {
      $lte: parseFloat(req.query.maxPrice),
    };
  }

  console.log('Min price:', req.query.minPrice);
  console.log('Max price:', req.query.maxPrice);

  // ...

  console.log('Filters:', filters);

  // Perform filtering logic here

  const count = await Product.countDocuments({
    ...keyword,
    ...filters,
  });
  const products = await Product.find({
    ...keyword,
    ...filters,
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1));
  res.json({ products, page, pages: Math.ceil(count / pageSize) });
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Add a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    user: req.user._id,
    name: 'Product Name',
    // image: '/images/sample.webp',
    images: [
      {
        original: '/images/sample.webp',
        thumbnail: '/images/sample.webp',
      },
      // {
      //   original: '/images/sample2.webp',
      //   thumbnail: '/images/sample2.webp',
      // },
      // {
      //   original: '/images/sample3.webp',
      //   thumbnail: '/images/sample3.webp',
      // },
    ],
    brand: 'Brand',
    category: 'Category',
    description: 'Description of a Product',
    details: 'Details of a Product',
    countInStock: 0,
    numReviews: 0,
    discount: 0,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a Product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  // console.log('Request Body:', req.body);

  const {
    productId,
    user,
    name,
    price,
    description,
    details,
    image,
    images,
    brand,
    category,
    countInStock,
    discount,
  } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product._id = productId;
    product.user = user;
    product.name = name;
    product.price = price;
    product.description = description;
    product.details = details;
    product.image = image;
    product.images = images;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.discount = discount;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// @desc    Delete a Product
// @route   DEL /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({ _id: product._id });
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const userOrder = await Order.findOne({
      user: req.user._id,
      'orderItems.product': product._id,
      isPaid: true,
      isDelivered: true,
    });

    if (!userOrder) {
      res.status(400);
      throw new Error("You haven't ordered this product yet.");
    }

    const alreadyReviewed = product.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, review) => acc + review.rating, 0) /
      product.reviews.length;

    await product.save();

    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public
const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(15);

  res.status(200).json(products);
});

export {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
};
