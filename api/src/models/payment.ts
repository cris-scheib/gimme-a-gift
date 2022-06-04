import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IPayment extends mongoose.Document {
  userId: string;
  valeu: number;
  createdAt: Date;
  deletedAt: Date | null;
}

const PaymentSchema = new mongoose.Schema({
  userId: {
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
    type: Date,
  },
});

PaymentSchema.plugin(mongoosePaginate);

const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
export default Payment;
