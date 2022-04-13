import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate";

interface IList extends mongoose.Document {
  name: string;
  description: string;
  createdAt: Date;
  listProduct: Array<Object>;
}

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  listProduct: {
    type: Array,
    default: [],
  },
  deletedAt: {
    type: Date
  },
});

ListSchema.plugin(mongoosePaginate);

const List = mongoose.model<IList>('List', ListSchema);
export default List;
