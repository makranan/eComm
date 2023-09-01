import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import productsRoutes from './routes/productsRoutes.js';

const port = process.env.PORT;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
  res.send('API running');
});

app.use('/api/products', productsRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`));
