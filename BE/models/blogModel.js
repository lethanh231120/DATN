import mongoose from 'mongoose';
import mongooseDelete from 'mongoose-delete'

const blogSchema = new mongoose.Schema(
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
    image:{
      type: String
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    content: {
      type: String,
      required: true,
      default: 'New blog'
    },
    title: {
      type: String,
      required: true,
      default: 'Title blog'
    }
  },
  {
    timestamps: true,
  }
);

blogSchema.plugin(mongooseDelete, {
  overrideMethods : 'all',
  deleteAt : true,
});

const Blog =  mongoose.model('Blog', blogSchema);
export default Blog
