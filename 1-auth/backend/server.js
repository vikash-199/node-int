import express from 'express';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import mongoDBConnect from './config/db.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// mongoDb connected
mongoDBConnect();

//middleware
app.use(express.json()); // convert JSON DATA into js object
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
); //it tell the browser this backend allow req for other origins

app.use('/api/users', userRouter);

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
