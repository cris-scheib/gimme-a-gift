import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate';
import bcrypt from 'bcrypt';

interface IUser extends mongoose.Document {
  name: string;
  username: string;
  email: string;
  password: string;
  createdAt: Date;
  deletedAt: Date | null;
}

interface IUserModel extends IUser, mongoose.Document {
  comparePassword(candidatePassword: string, callback: (error: Error, isMatch: boolean) => void): void;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/
  },
  password: {
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
  deletedAt: {
    type: Date
  },
});

UserSchema.pre<IUser>('save', function(this: IUser, next: (err?: Error | undefined) => void) {
  const salt = bcrypt.genSaltSync(Number(process.env.BCRYPT_SALT));

  if (!this.isModified('password')) {
    return next();
  }

  bcrypt.hash(this.password, salt).then((hash) => {
    this.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function (
  candidatePassword: string,
  callback: (err: Error | null, same: boolean | null) => void
): void {
  bcrypt.compare(candidatePassword, this.password, function(error, isMatch) {
    if (error) {
      return callback(error, null);
    }
    callback(null, isMatch);
  });
};

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model<IUserModel>('User', UserSchema);
export default User;
