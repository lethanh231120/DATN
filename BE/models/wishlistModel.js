import mongoose from 'mongoose';

const wishlistSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    products: [
      {
        name: { type: String, required: true },
        image: { type: String },
        price: { type: Number, required: true },
        discount: { type: Number, required: true },
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ]
  },
  {
    timestamps: true,
  }
);

const WishList =  mongoose.model('WishList', wishlistSchema);
export default WishList
