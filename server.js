import express from 'express';
import colors from 'colors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors';

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// CORS middleware
const corsOptions = {
  origin: 'https://greenify-ashy.vercel.app',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
};

app.use(cors(corsOptions));


app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to green delight',
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Log the error stack trace
  res.status(500).json({ error: 'Internal Server Error' }); // Respond with an error message
});

// PORT
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`.bgCyan.white);
});
