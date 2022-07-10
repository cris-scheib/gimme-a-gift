import mongoose from 'mongoose';

class Database {
  connect = () => {
    mongoose.connect(
      `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
    );
    mongoose.connection.on('error', error => {
      console.log(error);
    });
    mongoose.connection.on('connected', () => {
      console.log('Connected to Database!');
    });
  };

  disconnect = () => {
    mongoose.disconnect();
  };
}

export default Database;
