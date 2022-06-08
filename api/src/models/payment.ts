import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IPayment extends mongoose.Document {
  userId: string;
  listId: string;
  productId: string;
  value: number;
  createdAt: Date;
  deletedAt: Date | null;
}

const PaymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  listId: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  productId: {
    type: mongoose.Types.ObjectId,
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
    type: Date,
  },
});

PaymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
