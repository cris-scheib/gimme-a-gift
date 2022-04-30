import { boolean } from "joi";
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IUserList extends mongoose.Document {
  listId: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  permission: string;
  deletedAt: Date | null;
}

const UserListSchema = new mongoose.Schema({
  listId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
    default: Date.now(),
  },
  permission: {
    type: String,
    default: [],
  },
  deletedAt: {
    type: Date
  },
});

UserListSchema.plugin(mongoosePaginate);

const UserList = mongoose.model<IUserList>('UserList', UserListSchema);
export default UserList;
