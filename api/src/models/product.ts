import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IProduct extends mongoose.Document {
  name: string;
  description: string;
  photos: Array<Object>;
  link: string;
  value: number;
  shop: string;
  createdAt: Date;
  deletedAt: Date | null;
}

const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  photos: {
    type: Array,
    default: [],
  },
  link: {
    type: String,
    required: true,
  },
  shop: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date
  },
});

ProductSchema.plugin(mongoosePaginate);

const Product = mongoose.model<IProduct>('Product', ProductSchema);
export default Product;
