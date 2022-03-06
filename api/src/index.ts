import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';

import routes from './routes/routes';

const app = express();
app.use(json());

app.use('/api', routes);

mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.6ukgc.mongodb.net/geolocationDB?retryWrites=true&w=majority`
);
mongoose.connection.on('error', error => {
  console.log(error);
});
mongoose.connection.on('connected', () => {
  console.log('Connected to Database Geolocation!');
});

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Server is listening on port 3000 on mode ${process.env.NODE_ENV}`);
});

