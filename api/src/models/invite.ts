import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IInvite extends mongoose.Document {
  listId: string;
  email: string;
  createdAt: Date;
  deletedAt: Date | null;
}

const InviteSchema = new mongoose.Schema({
  listId: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  deletedAt: {
    type: Date,
  },
});

InviteSchema.plugin(mongoosePaginate);

const Invite = mongoose.model<IInvite>("Invite", InviteSchema);
export default Invite;
