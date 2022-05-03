import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete'

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
)

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    listImage: [String],
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true
    },
    description: {
      type: String,
      required: true,
      default: 'New Product'
    },
    weight: {
      type: String,
      required: true
    },
    dimensions: {
      type: String,
      required: true,
      default: '0,0,0'
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 4,
    },
    numberOfReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

productSchema.plugin(mongooseDelete, {
  overrideMethods : 'all',
  deleteAt : true,
});

const Product =  mongoose.model('Product', productSchema);
export default Product
