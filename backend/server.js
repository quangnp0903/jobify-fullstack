import express from 'express';
import morgan from 'morgan';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import 'express-async-errors';
import { body, validationResult } from 'express-validator';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import cloudinary from 'cloudinary';

// public
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path';

// router
import jobRouter from './routers/jobRouter.js';
import authRouter from './routers/authRouter.js';
import userRouter from './routers/userRouter.js';

import errorHandlerMiddleware from './middleware/errorHandlerMiddleware.js';
import { authenticateUser } from './middleware/authMiddleware.js';
import { corsOptions } from './config/corsOptions.js';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

const app = express();

app.use(express.json());
// app.use(morgan('dev'));
app.use(cookieParser());
app.use(cors(corsOptions));

const __dirname = dirname(fileURLToPath(import.meta.url));
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.static(path.resolve(__dirname, './public')));

app.post(
  '/api/v1/test',
  [body('name').notEmpty().withMessage('name is required')],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const errorMessages = errors.array().map((error) => error.msg);
      return res.status(400).json({ errors: errorMessages });
    }
    next();
  },
  (req, res) => {
    const { name } = req.body;
    res.json({ msg: `hello ${name}` });
  }
);

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/v1/test', (req, res) => {
  res.json({ msg: 'test route' });
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobRouter);
app.use('/api/v1/users', authenticateUser, userRouter);

app.use('*', (req, res) => {
  res.status(404).json({ msg: 'not found' });
});

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5100;
// app.listen(port, () => {
//   console.log(`server running on PORT ${port}....`);
// });

try {
  await mongoose.connect(process.env.MONGO_URL);
  app.listen(port, () => {
    console.log(`server running on PORT ${port}....`);
  });
} catch (error) {
  console.log(error);
  process.exit(1);
}
