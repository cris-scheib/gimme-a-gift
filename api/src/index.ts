import express from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';

import routes from './routes/routes';

const app = express();
const allowedOrigins = [`http://localhost:8080`];
const options: cors.CorsOptions = {
  origin: allowedOrigins
};

app.use(cors());
app.use(json());

app.use(express.static('public'));
app.use('/api', routes);

mongoose.connect(
  `mongodb://127.0.0.1:27017/gimme`
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

