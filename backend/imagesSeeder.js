import mongoose from 'mongoose';
import Product from './models/productModel.js';

const connectDB = process.env.DB;

// Configure Mongoose to use a specific connection string and set a timeout
mongoose.connect('', {
  serverSelectionTimeoutMS: 30000, // 30-second timeout
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Your updateProductWithImages function remains the same
async function updateProductWithImages(productId, imageUrls) {
  try {
    const product = await Product.findById(productId);

    if (!product) {
      console.error('Product not found');
      return;
    }

    // Add image URLs to the product's `images` field
    product.images = imageUrls;

    await product.save();
    console.log('Product updated with images:', product);
  } catch (error) {
    console.error('Error updating product with images:', error);
  }
}

// Example usage:
updateProductWithImages('64f0d3b75ad91bb93a90b56c', [
  {
    original:
      'https://image.ceneostatic.pl/data/products/141328631/i-google-pixel-7-pro-12-128gb-bialy.jpg',
    thumbnail:
      'https://image.ceneostatic.pl/data/products/141328631/i-google-pixel-7-pro-12-128gb-bialy.jpg',
  },
  {
    original:
      'https://image.ceneostatic.pl/data/products/141328631/31fd6525-b5c7-4dca-b30f-63dc9e17b887_i-google-pixel-7-pro-12-128gb-bialy.jpg?=b73c9',
    thumbnail:
      'https://image.ceneostatic.pl/data/products/141328631/31fd6525-b5c7-4dca-b30f-63dc9e17b887_i-google-pixel-7-pro-12-128gb-bialy.jpg?=b73c9',
  },
  {
    original:
      'https://image.ceneostatic.pl/data/products/141328631/5c28638c-c240-4ed7-bf94-6a88b1d99aa1_i-google-pixel-7-pro-12-128gb-bialy.jpg?=90a97',
    thumbnail:
      'https://image.ceneostatic.pl/data/products/141328631/5c28638c-c240-4ed7-bf94-6a88b1d99aa1_i-google-pixel-7-pro-12-128gb-bialy.jpg?=90a97',
  },
  {
    original:
      'https://image.ceneostatic.pl/data/products/141328631/f3ef68a5-0c06-491c-85ef-55579c4f2ea6_i-google-pixel-7-pro-12-128gb-bialy.jpg?=f76e0',
    thumbnail:
      'https://image.ceneostatic.pl/data/products/141328631/f3ef68a5-0c06-491c-85ef-55579c4f2ea6_i-google-pixel-7-pro-12-128gb-bialy.jpg?=f76e0',
  },
]);
