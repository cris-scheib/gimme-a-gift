import express from 'express';
import { json } from 'body-parser';
import cors from 'cors';

import routes from './routes/routes';
import Database from './database/database';

const app = express();

const options: cors.CorsOptions = {
  origin: '*'
};

app.use(cors(options));
app.use(json());

app.use(express.static('public'));
app.use('/api', routes);

const database = new Database();
database.connect();

const server = app.listen(process.env.APPLICATION_PORT, () => {
  console.log(`Server is listening on port 3000 on mode ${process.env.NODE_ENV}`);
});

export { app, server };
