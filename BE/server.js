import express from 'express';
import morgan from 'morgan';
import connectDB from './config/db.js'
import dotenv from 'dotenv';
import paypal from 'paypal-rest-sdk'
import userRouter from './routes/userRoutes.js'
import categoryRouter from './routes/categoryRoutes.js'
import productRouter from './routes/productRoutes.js'
import orderRouter from './routes/orderRoutes.js'
import blogRouter from './routes/blogRouter.js'
import cartRouter from './routes/cartRouter.js'
import wishlistRouter from './routes/wishlistRouter.js'
import cors from 'cors'
import { notFound,errorHandler } from './middleware/errorMiddleware.js'

dotenv.config();
connectDB()

// paypal.config({
//   'mode' : 'sandbox' ,
//   'client_id' : 'ASDoozIqmDMbNxySNJq4rYmb3rArq_umhr5eofzW1IW2D4SiKgdTZkLr-zhSyElrr2GcpN4j9iyD8pdu',
//   'client_secret' : 'EHkVEe3_MaNfpID-LmwMBY8WD2bwD3STVnB5ts8O_Y0GIqFJCjw-jiqBcRlTWlnSRD0L8MnEs7Riiplp'
// }) ;

const app = express();
const PORT = process.env.PORT || 5000;

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

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
})