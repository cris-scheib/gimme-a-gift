import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

import routes from './routes/routes';

const app = express();

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));
app.use(json());

app.use(express.static('public'));
app.use('/api', routes);

mongoose.connect(
  `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}/${process.env.MONGODB_DATABASE}`
);
mongoose.connection.on('error', error => {
  console.log(error);
});
mongoose.connection.on('connected', () => {
  console.log('Connected to Database!');
});

app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Server is listening on port 3000 on mode ${process.env.NODE_ENV}`);
});

