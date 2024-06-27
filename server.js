import express from 'express';
import colors from 'colors';
import dotenv from "dotenv";
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoute.js';
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";

// Configure env
dotenv.config()

// database config
connectDB();

// Rest object
const app = express()

// middlewares
// CORS middleware
app.use(cors({
  origin: 'https://greenify-2ohq.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json())
app.use(morgan('dev'))

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use("/api/v1/product", productRoutes);

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to green delight"
  })
})

// PORT
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server Running on PORT : ${PORT}`.bgCyan.white);
})