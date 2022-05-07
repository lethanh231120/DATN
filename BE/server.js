import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import blogRouter from './routes/blogRouter.js'
import cartRouter from './routes/cartRouter.js'
import wishlistRouter from './routes/wishlistRouter.js'
import cors from 'cors'
import { errorHandler } from './middleware/errorMiddleware.js'
import cloudinary from 'cloudinary'

dotenv.config();
connectDB()

const app = express();
const PORT = process.env.PORT || 5000;

//image upload cloudinary
cloudinary.config({
  cloud_name:process.env.CLOUDINARY_NAME,
  api_key:process.env.CLOUDINARY_API_KEY,
  api_secret:process.env.CLOUDINARY_API_SECRET,
})

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', userRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/products', productRouter)
app.use('/api/orders', orderRouter)
app.use('/api/blogs', blogRouter)
app.use('/api/carts', cartRouter)
app.use('/api/wishlists', wishlistRouter)

app.use('/uploads', express.static('uploads'));

// app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})