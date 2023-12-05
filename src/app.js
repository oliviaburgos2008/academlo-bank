import express from 'express';
import { router } from './routes/index.js';

const app = express();

//middlewares to accept bodies in json and url-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use('/api/v1', router);

export default app;
