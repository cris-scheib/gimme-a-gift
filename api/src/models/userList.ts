import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IUserList extends mongoose.Document {
  listId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  permissions: Array<Object>;
  status: boolean;
  deletedAt: Date | null;
}

const UserListSchema = new mongoose.Schema({
  listId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  permissions: {
    type: Array,
    default: [],
  },
  status: {
    type: Boolean,
    default: true,
  },
  deletedAt: {
    type: Date
  },
});

UserListSchema.plugin(mongoosePaginate);

const UserList = mongoose.model<IUserList>('UserList', UserListSchema);
export default UserList;
